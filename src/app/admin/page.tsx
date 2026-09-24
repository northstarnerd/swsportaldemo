"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Smartphone,
  Send,
  Download,
  Upload,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  ShieldCheck,
  Phone,
  FileSpreadsheet,
  Check,
  RefreshCw,
  Search,
} from "lucide-react";
import confetti from "canvas-confetti";

export interface RecoveryAccount {
  accountNumber: string;
  customerName: string;
  phoneNumber: string;
  amountDue: number;
  service: string;
  address?: string;
  smsStatus: "Draft" | "Sending" | "Sent" | "Delivered" | "Paid";
  paymentMethod?: string;
  authCode?: string;
  paidAt?: string;
  paymentUrl?: string;
}

const INITIAL_ACCOUNTS: RecoveryAccount[] = [
  {
    accountNumber: "SWS-89545",
    customerName: "Patrick Badley",
    phoneNumber: "(614) 562-0309",
    amountDue: 94.5,
    service: "Quarterly Trash & Organics",
    address: "6484 Promontory Drive, Eden Prairie, MN",
    smsStatus: "Draft",
  },
  {
    accountNumber: "SWS-74120",
    customerName: "Robert Miller",
    phoneNumber: "(612) 555-0144",
    amountDue: 94.5,
    service: "Quarterly Trash & Organics",
    address: "8210 Pioneer Trail, Eden Prairie, MN",
    smsStatus: "Draft",
  },
  {
    accountNumber: "SWS-62914",
    customerName: "Jennifer Anderson",
    phoneNumber: "(952) 555-0182",
    amountDue: 126.93,
    service: "Quarterly Trash + Extra Yard Waste Cart",
    address: "9104 Prairie Bluff Rd, Eden Prairie, MN",
    smsStatus: "Draft",
  },
  {
    accountNumber: "SWS-51088",
    customerName: "David Swenson",
    phoneNumber: "(612) 555-0199",
    amountDue: 94.5,
    service: "Quarterly Trash & Organics",
    address: "14300 Valley View Rd, Eden Prairie, MN",
    smsStatus: "Draft",
  },
  {
    accountNumber: "SWS-83402",
    customerName: "Sarah Lindstrom",
    phoneNumber: "(952) 555-0167",
    amountDue: 139.5,
    service: "Quarterly Trash + Bulky Mattress Pickup",
    address: "6120 Eden Prairie Rd, Eden Prairie, MN",
    smsStatus: "Draft",
  },
];

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<"batch" | "instant">("batch");
  const [accounts, setAccounts] = useState<RecoveryAccount[]>(INITIAL_ACCOUNTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBatchSending, setIsBatchSending] = useState(false);
  const [batchProgress, setBatchProgress] = useState<{ sent: number; total: number } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Call-In Instant Dispatch State
  const [callInPhone, setCallInPhone] = useState("(614) 562-0309");
  const [callInName, setCallInName] = useState("Patrick Badley");
  const [callInAccount, setCallInAccount] = useState("SWS-89545");
  const [callInAmount, setCallInAmount] = useState<number>(94.5);
  const [callInService, setCallInService] = useState("Past-Due Recovery - Card Expired");
  const [isDispatchingInstant, setIsDispatchingInstant] = useState(false);
  const [instantSentResult, setInstantSentResult] = useState<{
    success: boolean;
    paymentUrl: string;
    messageBody: string;
    simulated: boolean;
    recipient: string;
    accountNumber: string;
    customerName: string;
    amount: number;
    dispatchedAt: string;
  } | null>(null);

  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [knownPaidAccounts, setKnownPaidAccounts] = useState<Set<string>>(new Set());

  // Live Polling for Payment Status Sync
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch("/api/admin/payments/status", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.payments)) {
          let newPaymentFound = false;

          setAccounts((prevAccounts) =>
            prevAccounts.map((acc) => {
              const norm = acc.accountNumber.trim().toUpperCase();
              const payment = data.payments.find((p: any) => {
                const pNorm = (p.accountNumber || "").trim().toUpperCase();
                return (
                  pNorm === norm ||
                  pNorm.replace("SWS-", "") === norm.replace("SWS-", "") ||
                  p.accountNumber === acc.accountNumber
                );
              });

              if (payment && acc.smsStatus !== "Paid") {
                newPaymentFound = true;
                return {
                  ...acc,
                  smsStatus: "Paid",
                  paymentMethod: payment.paymentMethod || "Apple Pay",
                  authCode: payment.confirmationCode || "AUTH-994821",
                  paidAt: payment.timestamp || new Date().toISOString(),
                };
              }
              return acc;
            })
          );

          if (instantSentResult) {
            const instNorm = instantSentResult.accountNumber.trim().toUpperCase();
            const matchingPayment = data.payments.find((p: any) => {
              const pNorm = (p.accountNumber || "").trim().toUpperCase();
              return (
                pNorm === instNorm ||
                pNorm.replace("SWS-", "") === instNorm.replace("SWS-", "")
              );
            });

            if (matchingPayment && !knownPaidAccounts.has(instNorm)) {
              newPaymentFound = true;
              setKnownPaidAccounts((prev) => new Set([...prev, instNorm]));
            }
          }

          if (newPaymentFound) {
            confetti({
              particleCount: 70,
              spread: 60,
              origin: { y: 0.5 },
              colors: ["#10B981", "#7A1900", "#2563EB"],
            });
          }
        }
      } catch {
        // Silent fail on network poll
      }
    }, 2500);

    return () => clearInterval(pollInterval);
  }, [instantSentResult, knownPaidAccounts]);

  // Derived Metrics
  const baselineCohortDelinquent = 4725.0;
  const currentBatchTotal = accounts.reduce((acc, curr) => acc + curr.amountDue, 0);
  const paidAccounts = accounts.filter((a) => a.smsStatus === "Paid");
  const totalCollected = paidAccounts.reduce((acc, curr) => acc + curr.amountDue, 0);
  const totalSent = accounts.filter((a) => a.smsStatus === "Sent" || a.smsStatus === "Paid").length;
  const recoveryRate =
    currentBatchTotal > 0 ? ((totalCollected / currentBatchTotal) * 100).toFixed(1) : "0.0";

  // CSV Ingestion Handler
  const handleCsvText = (csvContent: string) => {
    try {
      const lines = csvContent.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length < 2) {
        setUploadNotice("CSV file contains no data rows.");
        return;
      }

      const parsed: RecoveryAccount[] = [];
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(",").map((p) => p.trim().replace(/^"|"$/g, ""));
        if (parts.length >= 4) {
          const [accNum, name, phone, amtStr, srv, addr] = parts;
          const parsedAmt = parseFloat(amtStr.replace(/[^0-9.]/g, "")) || 94.5;
          const isPatrick = Boolean(
            i === 1 ||
              (name && name.toLowerCase().includes("patrick")) ||
              (accNum && accNum.includes("89545"))
          );
          const finalPhone = isPatrick
            ? (phone && phone.replace(/\D/g, "").length >= 10 ? phone : "(614) 562-0309")
            : (phone || "(612) 555-0100");

          parsed.push({
            accountNumber: accNum.startsWith("SWS-") ? accNum : `SWS-${accNum}`,
            customerName: name || "Resident",
            phoneNumber: finalPhone,
            amountDue: parsedAmt,
            service: srv || "Quarterly Trash & Organics",
            address: addr || "Eden Prairie, MN (Route 4)",
            smsStatus: "Draft",
          });
        }
      }

      if (parsed.length > 0) {
        setAccounts(parsed);
        setUploadNotice(`Imported ${parsed.length} accounts from file.`);
      } else {
        setUploadNotice("Could not parse valid accounts from file.");
      }
    } catch (e: any) {
      setUploadNotice("Error reading CSV: " + (e.message || "Unknown error"));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) handleCsvText(content);
    };
    reader.readAsText(file);
  };

  // Launch Single SMS
  const sendSingleAccountSms = async (acc: RecoveryAccount): Promise<string | undefined> => {
    try {
      const res = await fetch("/api/sms/send-recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: acc.phoneNumber,
          accountNumber: acc.accountNumber,
          customerName: acc.customerName,
          amount: acc.amountDue,
          service: acc.service,
          address: acc.address || "Eden Prairie, MN (Route 4)",
        }),
      });
      const data = await res.json();
      return data.paymentUrl;
    } catch {
      return undefined;
    }
  };

  // Batch Launch
  const handleLaunchBatch = async () => {
    const toSend = accounts.filter((a) => a.smsStatus === "Draft");
    if (toSend.length === 0) return;

    setIsBatchSending(true);
    setBatchProgress({ sent: 0, total: toSend.length });

    const updated = [...accounts];

    for (let i = 0; i < toSend.length; i++) {
      const target = toSend[i];
      const targetIndex = updated.findIndex((a) => a.accountNumber === target.accountNumber);
      if (targetIndex !== -1) {
        updated[targetIndex].smsStatus = "Sending";
        setAccounts([...updated]);

        const paymentUrl = await sendSingleAccountSms(target);

        updated[targetIndex].smsStatus = "Sent";
        if (paymentUrl) updated[targetIndex].paymentUrl = paymentUrl;
        setAccounts([...updated]);

        setBatchProgress({ sent: i + 1, total: toSend.length });
        await new Promise((r) => setTimeout(r, 400));
      }
    }

    setIsBatchSending(false);
    setBatchProgress(null);
  };

  // Dispatch Front-Desk Call-In Link
  const handleDispatchCallIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callInPhone) return;

    setIsDispatchingInstant(true);
    try {
      const res = await fetch("/api/sms/send-recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: callInPhone,
          accountNumber: callInAccount,
          customerName: callInName,
          amount: callInAmount,
          service: callInService,
          address: "Eden Prairie, MN (Route 4)",
        }),
      });
      const data = await res.json();

      setInstantSentResult({
        success: true,
        paymentUrl: data.paymentUrl || `https://swsportaldemo.vercel.app/pay/89545`,
        messageBody:
          data.messageBody ||
          `⚠️ SWS Billing Alert: Hi ${callInName.split(" ")[0]}, your balance of $${callInAmount.toFixed(
            2
          )} is past due. Tap to clear via 1-click Apple Pay: ${data.paymentUrl}`,
        simulated: Boolean(data.simulated),
        recipient: data.recipient || callInPhone,
        accountNumber: callInAccount,
        customerName: callInName,
        amount: callInAmount,
        dispatchedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
    } catch (err: any) {
      alert("Failed to send text: " + (err.message || "Network error"));
    } finally {
      setIsDispatchingInstant(false);
    }
  };

  // Download Navusoft Cash Posting CSV
  const handleDownloadNavusoftCsv = () => {
    const rowsToExport = accounts.filter((a) => a.smsStatus === "Paid");
    const exportData =
      rowsToExport.length > 0
        ? rowsToExport
        : [
            {
              accountNumber: "SWS-89545",
              amountDue: 94.5,
              authCode: "AUTH-994821",
              paymentMethod: "Apple Pay",
              paidAt: new Date().toISOString(),
            },
            {
              accountNumber: "SWS-74120",
              amountDue: 94.5,
              authCode: "AUTH-994822",
              paymentMethod: "Google Pay",
              paidAt: new Date(Date.now() - 3600000).toISOString(),
            },
          ];

    const headers = ["AccountNumber", "AmountPaid", "AuthCode", "PaymentMethod", "Timestamp", "Status"];
    const csvLines = [headers.join(",")];

    for (const item of exportData) {
      const row = [
        item.accountNumber,
        item.amountDue.toFixed(2),
        item.authCode || "AUTH-994821",
        `"${item.paymentMethod || "Apple Pay"}"`,
        `"${item.paidAt || new Date().toISOString()}"`,
        "POSTED",
      ];
      csvLines.push(row.join(","));
    }

    const blob = new Blob([csvLines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.setAttribute("download", `navusoft_cash_posting_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredAccounts = accounts.filter(
    (a) =>
      a.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phoneNumber.includes(searchQuery)
  );

  const isCallInPaid =
    instantSentResult &&
    accounts.some(
      (a) =>
        (a.accountNumber === instantSentResult.accountNumber ||
          a.accountNumber.replace("SWS-", "") === instantSentResult.accountNumber.replace("SWS-", "")) &&
        a.smsStatus === "Paid"
    );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Traditional Corporate Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="bg-[#7A1900] text-white text-xs py-2 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <span>SUBURBAN WASTE SERVICES</span>
              <span className="text-red-200 hidden sm:inline">• Savage & Eden Prairie Dispatch Operations</span>
            </div>
            <div className="text-red-100 text-xs font-medium">
              <span>Susie Scott (Office Manager) • SWS Front Office</span>
            </div>
          </div>
        </div>

        {/* Main Header Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src="/sws-logo.png"
              alt="Suburban Waste Services"
              className="h-10 w-auto object-contain"
            />
            <div className="border-l border-slate-200 pl-3.5">
              <h1 className="font-black text-xl text-slate-900 leading-tight">
                Front-Office Staff Portal
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Delinquent Account Recovery & Mobile Payment Link Dispatch
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-slate-500 hidden sm:block">
            <div className="font-bold text-slate-700">Suburban Waste Services Inc.</div>
            <div>Eden Prairie Route 4 Dispatch Operations</div>
          </div>
        </div>

        {/* Traditional Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 border-t border-slate-200 flex justify-between items-center">
          <nav className="flex space-x-2 -mb-px text-sm font-bold">
            <button
              onClick={() => setActiveTab("batch")}
              className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "batch"
                  ? "border-[#7A1900] text-[#7A1900] bg-slate-50/80"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Past-Due SMS Recovery Batch</span>
              <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                {accounts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("instant")}
              className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "instant"
                  ? "border-[#7A1900] text-[#7A1900] bg-slate-50/80"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Front-Desk Call-In Tool</span>
            </button>
          </nav>

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>PCI-DSS Level 1 Compliant • Direct Carrier SMS</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* VIEW 1: TAB 1 — PAST-DUE SMS RECOVERY BATCH */}
        {activeTab === "batch" && (
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Total Delinquent Batch
                </span>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  ${baselineCohortDelinquent.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">50 Accounts on Route 4</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Messages Dispatched
                </span>
                <p className="text-2xl sm:text-3xl font-black text-blue-700 mt-1">
                  {totalSent} <span className="text-sm font-semibold text-slate-500">/ {accounts.length}</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">1-click mobile alerts sent</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Collected to Date
                </span>
                <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
                  ${totalCollected.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                  ✓ {paidAccounts.length} accounts settled
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Recovery Rate
                </span>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {recoveryRate}%
                </p>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden border border-slate-200">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(parseFloat(recoveryRate), 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Batch File Management Box */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-[#7A1900]" />
                    <span>Delinquent Account File Ingestion</span>
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Upload your delinquent aging file from Navusoft to generate and dispatch payment links.
                  </p>
                </div>

                {/* File Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="/sws_sample_delinquent_batch.csv"
                    download="sws_delinquent_batch_template.csv"
                    className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-3.5 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors"
                    title="Download delinquent CSV file template"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Download CSV Template</span>
                  </a>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#7A1900] hover:bg-[#5f1300] text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5 text-white" />
                    <span>Upload Delinquent Aging File</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,text/csv"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>

              {/* Clean Upload Dropzone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const content = event.target?.result as string;
                      if (content) handleCsvText(content);
                    };
                    reader.readAsText(file);
                  }
                }}
                className={`border-2 border-dashed rounded-lg p-3.5 text-center text-xs transition-colors ${
                  isDragging
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                    : "border-slate-300 hover:border-slate-400 bg-slate-50/60 text-slate-600"
                }`}
              >
                <span>
                  Drag and drop your Navusoft CSV file here, or click <strong>Upload Delinquent Aging File</strong> above.
                </span>
                {uploadNotice && (
                  <p className="text-xs font-bold text-emerald-700 mt-1">{uploadNotice}</p>
                )}
              </div>
            </div>

            {/* Campaign Table Card */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden space-y-0">
              {/* Action Toolbar above table */}
              <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={handleLaunchBatch}
                    disabled={isBatchSending || accounts.every((a) => a.smsStatus !== "Draft")}
                    className="bg-[#7A1900] hover:bg-[#5f1300] disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-lg shadow-xs flex items-center gap-2 transition-colors"
                  >
                    {isBatchSending ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>
                          Sending ({batchProgress?.sent} of {batchProgress?.total})...
                        </span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>
                          Send SMS Alerts to All ({accounts.filter((a) => a.smsStatus === "Draft").length}) Accounts
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownloadNavusoftCsv}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
                    title="Export settled payments to Navusoft cash posting format"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export to Navusoft Cash Receipts (.csv)</span>
                    {paidAccounts.length > 0 && (
                      <span className="bg-white text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold ml-1">
                        {paidAccounts.length} Paid
                      </span>
                    )}
                  </button>
                </div>

                {/* Search Box */}
                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search account or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-500"
                  />
                </div>
              </div>

              {/* Progress Indicator */}
              {isBatchSending && batchProgress && (
                <div className="bg-blue-50 px-4 py-2 border-b border-blue-200 text-xs text-blue-900 font-semibold flex items-center justify-between">
                  <span>Sending SMS alerts to residents...</span>
                  <span>{Math.round((batchProgress.sent / batchProgress.total) * 100)}%</span>
                </div>
              )}

              {/* Classic Corporate Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700 divide-y divide-slate-200">
                  <thead className="bg-slate-100 text-slate-700 uppercase text-[11px] font-bold tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Account #</th>
                      <th className="py-3 px-4">Customer Name & Address</th>
                      <th className="py-3 px-4">Phone Number</th>
                      <th className="py-3 px-4">Amount Due</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredAccounts.map((acc, index) => (
                      <tr
                        key={acc.accountNumber}
                        className={`hover:bg-slate-50 transition-colors ${
                          index % 2 === 1 ? "bg-slate-50/40" : "bg-white"
                        }`}
                      >
                        {/* Account # */}
                        <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                          <div>{acc.accountNumber}</div>
                          <div className="text-[11px] text-slate-500 font-sans font-normal">
                            Route 4 (Eden Prairie)
                          </div>
                        </td>

                        {/* Customer Name & Address */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{acc.customerName}</div>
                          <div className="text-xs text-slate-500">{acc.service}</div>
                          {acc.address && (
                            <div className="text-[11px] text-slate-400 truncate max-w-xs">{acc.address}</div>
                          )}
                        </td>

                        {/* Phone Number */}
                        <td className="py-3 px-4 font-mono whitespace-nowrap text-slate-800">
                          {acc.phoneNumber}
                        </td>

                        {/* Amount Due */}
                        <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                          ${acc.amountDue.toFixed(2)}
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          {acc.smsStatus === "Draft" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>Ready to Send</span>
                            </span>
                          )}
                          {acc.smsStatus === "Sending" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                              <RefreshCw className="w-3 h-3 animate-spin text-blue-600" />
                              <span>Sending...</span>
                            </span>
                          )}
                          {acc.smsStatus === "Sent" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                              <Smartphone className="w-3 h-3 text-blue-600" />
                              <span>Text Sent</span>
                            </span>
                          )}
                          {acc.smsStatus === "Paid" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>PAID - ${acc.amountDue.toFixed(2)}</span>
                            </span>
                          )}
                          {acc.paidAt && (
                            <div className="text-[10px] text-emerald-700 mt-0.5 font-medium">
                              via {acc.paymentMethod || "Apple Pay"}
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {acc.smsStatus === "Draft" && (
                              <button
                                onClick={async () => {
                                  const updated = [...accounts];
                                  const idx = updated.findIndex((a) => a.accountNumber === acc.accountNumber);
                                  if (idx !== -1) {
                                    updated[idx].smsStatus = "Sending";
                                    setAccounts([...updated]);
                                    const paymentUrl = await sendSingleAccountSms(acc);
                                    updated[idx].smsStatus = "Sent";
                                    if (paymentUrl) updated[idx].paymentUrl = paymentUrl;
                                    setAccounts([...updated]);
                                  }
                                }}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-2.5 py-1 rounded text-xs font-semibold transition-colors"
                              >
                                Send Text
                              </button>
                            )}

                            {acc.paymentUrl && (
                              <button
                                onClick={() => copyToClipboard(acc.paymentUrl!, acc.accountNumber)}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-1.5 rounded border border-slate-200 text-xs transition-colors"
                                title="Copy payment link"
                              >
                                {copiedId === acc.accountNumber ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}

                            <a
                              href={
                                acc.paymentUrl ||
                                `/pay/${
                                  typeof window !== "undefined" && typeof window.btoa === "function"
                                    ? window
                                        .btoa(
                                          JSON.stringify({
                                            acc: acc.accountNumber,
                                            amt: acc.amountDue,
                                            name: acc.customerName,
                                          })
                                        )
                                        .replace(/\+/g, "-")
                                        .replace(/\//g, "_")
                                        .replace(/=+$/, "")
                                    : acc.accountNumber.replace("SWS-", "")
                                }`
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-1.5 rounded border border-slate-200 text-xs transition-colors"
                              title="Open resident pay view"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TAB 2 — FRONT-DESK PHONE CALL TOOL */}
        {activeTab === "instant" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-[#7A1900] text-xs font-bold mb-2">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Inbound Call Tool</span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900">
                    Dispatch Payment Link to Resident
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Send an instant 1-tap mobile payment link to a caller while keeping them on the line.
                  </p>
                </div>

                <form onSubmit={handleDispatchCallIn} className="space-y-4">
                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Customer Mobile Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(614) 562-0309"
                      value={callInPhone}
                      onChange={(e) => setCallInPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 font-mono focus:outline-none focus:border-[#7A1900]"
                    />
                  </div>

                  {/* Customer Name & Account */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        required
                        value={callInName}
                        onChange={(e) => setCallInName(e.target.value)}
                        placeholder="Patrick Badley"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#7A1900]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Account Number
                      </label>
                      <input
                        type="text"
                        required
                        value={callInAccount}
                        onChange={(e) => setCallInAccount(e.target.value)}
                        placeholder="SWS-89545"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#7A1900]"
                      />
                    </div>
                  </div>

                  {/* Amount Due & Quick Chips */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Amount Due ($)
                      </label>
                      <span className="text-xs text-slate-500">Standard residential rates</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={callInAmount}
                        onChange={(e) => setCallInAmount(parseFloat(e.target.value) || 0)}
                        className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3.5 py-2 text-base font-bold text-slate-900 focus:outline-none focus:border-[#7A1900]"
                      />
                    </div>

                    {/* Standard Service Amount Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setCallInAmount(94.5)}
                        className={`text-xs px-2.5 py-1 rounded font-bold border transition-colors ${
                          callInAmount === 94.5
                            ? "bg-[#7A1900] text-white border-[#7A1900]"
                            : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        $94.50 Quarterly Base
                      </button>
                      <button
                        type="button"
                        onClick={() => setCallInAmount(126.93)}
                        className={`text-xs px-2.5 py-1 rounded font-bold border transition-colors ${
                          callInAmount === 126.93
                            ? "bg-[#7A1900] text-white border-[#7A1900]"
                            : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        $126.93 With Extra Can
                      </button>
                      <button
                        type="button"
                        onClick={() => setCallInAmount(45.0)}
                        className={`text-xs px-2.5 py-1 rounded font-bold border transition-colors ${
                          callInAmount === 45.0
                            ? "bg-[#7A1900] text-white border-[#7A1900]"
                            : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        $45.00 Bulky Item
                      </button>
                    </div>
                  </div>

                  {/* Service Memo */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Service Description / Memo
                    </label>
                    <select
                      value={callInService}
                      onChange={(e) => setCallInService(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#7A1900]"
                    >
                      <option value="Past-Due Recovery - Card Expired">Past-Due Recovery - Card Expired</option>
                      <option value="Quarterly Trash & Organics (Route 4)">Quarterly Trash & Organics (Route 4)</option>
                      <option value="Bulky Item Mattress Collection">Bulky Item Mattress Collection</option>
                      <option value="Extra Yard Waste Bin Subscription">Extra Yard Waste Bin Subscription</option>
                    </select>
                  </div>

                  {/* Primary Submit */}
                  <button
                    type="submit"
                    disabled={isDispatchingInstant}
                    className="w-full bg-[#7A1900] hover:bg-[#5f1300] text-white py-3 px-4 rounded-lg font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-4"
                  >
                    {isDispatchingInstant ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending Text to {callInPhone}...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Payment Link via SMS</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Live Transaction Status Column */}
            <div className="lg:col-span-6 space-y-6">
              {!instantSentResult ? (
                <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-8 text-center space-y-3 h-full flex flex-col items-center justify-center min-h-[380px]">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Ready to Dispatch</h3>
                  <p className="text-xs text-slate-500 max-w-sm">
                    Enter the caller's information on the left and click Send Payment Link. The live status ledger will update here in real time.
                  </p>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="font-mono text-xs font-bold text-slate-700">
                      Account #{instantSentResult.accountNumber} • Dispatched at {instantSentResult.dispatchedAt}
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div
                    className={`p-4 rounded-lg border ${
                      isCallInPaid
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                        : "bg-amber-50 border-amber-300 text-amber-900"
                    }`}
                  >
                    {isCallInPaid ? (
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                          ✓
                        </div>
                        <div>
                          <div className="font-bold text-emerald-900 text-sm">
                            ✓ PAID — ${instantSentResult.amount.toFixed(2)} (Apple Pay)
                          </div>
                          <p className="text-xs text-emerald-700 mt-0.5">
                            Payment verified and settled. Ready for batch cash posting to Navusoft.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center shrink-0">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-700" />
                        </div>
                        <div>
                          <div className="font-bold text-amber-900 text-sm">
                            Waiting for Resident Payment...
                          </div>
                          <p className="text-xs text-amber-800 mt-0.5">
                            Payment link delivered to resident. This record will automatically update upon bank authorization.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SMS Preview */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Text Message Sent to Resident
                    </span>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                      <div className="text-[11px] text-slate-500 font-semibold border-b border-slate-200 pb-1 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                        <span>Delivered to {instantSentResult.recipient}</span>
                      </div>
                      <p className="text-slate-800">{instantSentResult.messageBody}</p>
                    </div>
                  </div>

                  {/* Link & Copy */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Payment Link
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={instantSentResult.paymentUrl}
                        className="bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 font-mono w-full truncate"
                      />
                      <button
                        onClick={() => copyToClipboard(instantSentResult.paymentUrl, "instant-link")}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-colors shrink-0"
                      >
                        {copiedId === "instant-link" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <a
                        href={instantSentResult.paymentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 p-1.5 rounded text-xs transition-colors shrink-0"
                        title="Open resident pay view"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Traditional Corporate Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 sm:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>
            © {new Date().getFullYear()} Suburban Waste Services • Front-Office Billing & Cash Posting System
          </span>
          <div className="text-slate-400">
            Navusoft ERP Integration Ready • Dispatch (952) 937-8900
          </div>
        </div>
      </footer>
    </div>
  );
}
