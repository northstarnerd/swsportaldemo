export interface RecordedPayment {
  accountNumber: string;
  customerName: string;
  amount: number;
  paymentMethod: string;
  confirmationCode: string;
  timestamp: string; // ISO string
  status: "PAID";
}

export interface PaymentLinkData {
  accountNumber: string;
  customerName: string;
  amount: number;
  service: string;
  address: string;
}

// In-memory global store to survive HMR and function invocations in Node runtime
const globalForPayments = globalThis as unknown as {
  _swsPaymentStore?: Map<string, RecordedPayment>;
  _swsLinkStore?: Map<string, PaymentLinkData>;
};

if (!globalForPayments._swsPaymentStore) {
  globalForPayments._swsPaymentStore = new Map<string, RecordedPayment>();
}

if (!globalForPayments._swsLinkStore) {
  globalForPayments._swsLinkStore = new Map<string, PaymentLinkData>();
}

export const paymentStore = globalForPayments._swsPaymentStore;
export const linkStore = globalForPayments._swsLinkStore;

export function recordPayment(payment: Omit<RecordedPayment, "timestamp" | "status"> & { timestamp?: string; status?: "PAID" }): RecordedPayment {
  const normalizedAcc = payment.accountNumber.trim().toUpperCase();
  const entry: RecordedPayment = {
    accountNumber: normalizedAcc,
    customerName: payment.customerName,
    amount: payment.amount,
    paymentMethod: payment.paymentMethod || "Apple Pay",
    confirmationCode: payment.confirmationCode || `SWS-${Math.floor(100000 + Math.random() * 900000)}`,
    timestamp: payment.timestamp || new Date().toISOString(),
    status: "PAID",
  };
  paymentStore.set(normalizedAcc, entry);
  // Also store without 'SWS-' prefix or with it if applicable for resilient lookup
  if (normalizedAcc.startsWith("SWS-")) {
    paymentStore.set(normalizedAcc.replace("SWS-", ""), entry);
  } else {
    paymentStore.set(`SWS-${normalizedAcc}`, entry);
  }
  return entry;
}

export function getRecordedPayments(): RecordedPayment[] {
  const seenCodes = new Set<string>();
  const results: RecordedPayment[] = [];
  for (const item of paymentStore.values()) {
    if (!seenCodes.has(item.confirmationCode)) {
      seenCodes.add(item.confirmationCode);
      results.push(item);
    }
  }
  return results;
}

export function getPaymentForAccount(accountNumber: string): RecordedPayment | undefined {
  const norm = accountNumber.trim().toUpperCase();
  return paymentStore.get(norm) || paymentStore.get(norm.startsWith("SWS-") ? norm.replace("SWS-", "") : `SWS-${norm}`);
}

export function resetPaymentStore(): void {
  paymentStore.clear();
}

export function savePaymentLink(shortCode: string, data: PaymentLinkData): void {
  const code = shortCode.trim().toLowerCase();
  linkStore.set(code, data);
  if (code.startsWith("sws-")) {
    linkStore.set(code.replace("sws-", ""), data);
  } else {
    linkStore.set(`sws-${code}`, data);
  }
}

export function getPaymentLink(shortCode: string): PaymentLinkData | undefined {
  const code = shortCode.trim().toLowerCase();
  return linkStore.get(code) || linkStore.get(code.startsWith("sws-") ? code.replace("sws-", "") : `sws-${code}`);
}
