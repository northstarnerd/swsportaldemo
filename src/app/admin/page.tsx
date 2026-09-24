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
  AlertCircle,
  Copy,
  ExternalLink,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Phone,
  User,
  DollarSign,
  TrendingUp,
  FileSpreadsheet,
  Check,
  RefreshCw,
  Search,
  Zap,
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
  isDemoTarget?: boolean;
}

const DEFAULT_SAMPLE_ACCOUNTS: RecoveryAccount[] = [
  {
    accountNumber: "SWS-89545",
    customerName: "Patrick Badley",
    phoneNumber: "(612) 555-0192",
    amountDue: 94.5,
    service: "Quarterly Trash & Organics",
    address: "6484 Promontory Drive, Eden Prairie, MN",
    smsStatus: "Draft",
    isDemoTarget: true,
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
  const [accounts, setAccounts] = useState<RecoveryAccount[]>(DEFAULT_SAMPLE_ACCOUNTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBatchSending, setIsBatchSending] = useState(false);
  const [batchProgress, setBatchProgress] = useState<{ sent: number; total: number } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [myCellPhone, setMyCellPhone] = useState("");
  const [isEditingCell, setIsEditingCell] = useState(false);

  // Call-In Instant Dispatch State
  const [callInPhone, setCallInPhone] = useState("(612) 555-0192");
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

  // Sync / Polling State
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [knownPaidAccounts, setKnownPaidAccounts] = useState<Set<string>>(new Set());

  // Load saved Patrick Cell from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sws_demo_cell");
      if (saved) {
        setMyCellPhone(saved);
        setCallInPhone(saved);
        setAccounts((prev) =>
          prev.map((acc) => (acc.isDemoTarget ? { ...acc, phoneNumber: saved } : acc))
        );
      }
    }
  }, []);

  // Save Patrick cell helper
  const handleSaveMyCell = (newNumber: string) => {
    setMyCellPhone(newNumber);
    if (typeof window !== "undefined") {
      localStorage.setItem("sws_demo_cell", newNumber);
    }
    setAccounts((prev) =>
      prev.map((acc) => (acc.isDemoTarget ? { ...acc, phoneNumber: newNumber } : acc))
    );
    setIsEditingCell(false);
  };

  // Live Polling for Payment Status Sync
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch("/api/admin/payments/status", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.payments)) {
          setLastSyncTime(new Date());

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

          // Also check instant call-in result if currently awaiting payment
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
              particleCount: 75,
              spread: 60,
              origin: { y: 0.5 },
              colors: ["#10B981", "#7A1900", "#3B82F6", "#F59E0B"],
            });
          }
        }
      } catch (err) {
        // Silent fail on network poll jitter
      }
    }, 2500);

    return () => clearInterval(pollInterval);
  }, [instantSentResult, knownPaidAccounts]);

  // Derived Summary Metrics
  // Base batch of 50 accounts: total cohort is $4,725.00
  const baselineCohortDelinquent = 4725.0;
  const currentBatchTotal = accounts.reduce((acc, curr) => acc + curr.amountDue, 0);
  const paidAccounts = accounts.filter((a) => a.smsStatus === "Paid");
  const totalCollected = paidAccounts.reduce((acc, curr) => acc + curr.amountDue, 0);
  const totalSent = accounts.filter((a) => a.smsStatus === "Sent" || a.smsStatus === "Paid").length;
  const recoveryRate =
    currentBatchTotal > 0 ? ((totalCollected / currentBatchTotal) * 100).toFixed(1) : "0.0";

  // CSV Drag and Drop Handler
  const handleCsvText = (csvContent: string) => {
    try {
      const lines = csvContent.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length < 2) {
        setUploadNotice("CSV is empty or missing data rows.");
        return;
      }
      const headerLine = lines[0].toLowerCase();
      if (!headerLine.includes("account") && !headerLine.includes("name")) {
        setUploadNotice("Invalid CSV headers. Required: AccountNumber,CustomerName,PhoneNumber,AmountDue,Service");
        return;
      }

      const parsed: RecoveryAccount[] = [];
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(",").map((p) => p.trim().replace(/^"|"$/g, ""));
        if (parts.length >= 4) {
          const [accNum, name, phone, amtStr, srv] = parts;
          const parsedAmt = parseFloat(amtStr.replace(/[^0-9.]/g, "")) || 94.5;
          parsed.push({
            accountNumber: accNum.startsWith("SWS-") ? accNum : `SWS-${accNum}`,
            customerName: name || "Resident",
            phoneNumber: phone || "(612) 555-0100",
            amountDue: parsedAmt,
            service: srv || "Quarterly Trash & Organics",
            smsStatus: "Draft",
          });
        }
      }

      if (parsed.length > 0) {
        setAccounts(parsed);
        setUploadNotice(`✓ Successfully imported ${parsed.length} delinquent accounts from CSV.`);
      } else {
        setUploadNotice("Could not parse valid accounts from file.");
      }
    } catch (e: any) {
      setUploadNotice("Error parsing CSV: " + (e.message || "Unknown error"));
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

  // Batch Launch 1-Click Text Alerts
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
        // Realistic visual pacing delay between SMS dispatches
        await new Promise((r) => setTimeout(r, 450));
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
        dispatchedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      });
    } catch (err: any) {
      alert("Failed to send link: " + (err.message || "Network error"));
    } finally {
      setIsDispatchingInstant(false);
    }
  };

  // Simulate Instant Payment for Call-In or Table Row
  const handleSimulatePayment = async (accNum: string, name: string, amt: number) => {
    try {
      const code = `SWS-${Math.floor(100000 + Math.random() * 900000)}`;
      await fetch("/api/admin/payments/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountNumber: accNum,
          customerName: name,
          amount: amt,
          paymentMethod: "Apple Pay (1-Tap)",
          confirmationCode: code,
        }),
      });

      // Update local state immediately
      setAccounts((prev) =>
        prev.map((a) =>
          a.accountNumber === accNum
            ? {
                ...a,
                smsStatus: "Paid",
                paymentMethod: "Apple Pay (1-Tap)",
                authCode: code,
                paidAt: new Date().toISOString(),
              }
            : a
        )
      );

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10B981", "#7A1900", "#3B82F6"],
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Download Navusoft Cash Posting CSV
  const handleDownloadNavusoftCsv = () => {
    const rowsToExport = accounts.filter((a) => a.smsStatus === "Paid");
    
    // If no accounts paid yet, create a clean sample export with demonstration rows
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

  // Reset Demo State
  const handleResetDemo = async () => {
    await fetch("/api/admin/payments/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reset" }),
    }).catch(() => {});

    setAccounts(
      DEFAULT_SAMPLE_ACCOUNTS.map((a) => ({
        ...a,
        phoneNumber: a.isDemoTarget && myCellPhone ? myCellPhone : a.phoneNumber,
        smsStatus: "Draft",
        paymentMethod: undefined,
        authCode: undefined,
        paidAt: undefined,
        paymentUrl: undefined,
      }))
    );
    setInstantSentResult(null);
    setKnownPaidAccounts(new Set());
  };

  // Copy URL to Clipboard helper
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered accounts for search
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Operations Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* SWS Branding */}
          <div className="flex items-center gap-3.5">
            <div className="p-2 bg-white rounded-xl shadow-md border border-slate-200 flex-shrink-0">
              <img
                src="/sws-logo.png"
                alt="Suburban Waste Services"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight text-white">
                  Suburban Waste Services
                </span>
                <span className="text-xs bg-[#7A1900] text-red-100 font-bold px-2 py-0.5 rounded-full border border-red-800 uppercase tracking-wider">
                  Front-Office Admin
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Savage & Eden Prairie Dispatch Operations • Susie Scott Console
              </p>
            </div>
          </div>

          {/* Controls: Mode Badges & Resident Portal Flip */}
          <div className="flex items-center gap-3 text-xs">
            {/* Live Carrier Status */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold">Twilio SMS Ready</span>
            </div>

            {/* Live Polling Sync Status */}
            <div
              className="flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-800/60 text-emerald-400 rounded-xl px-3 py-1.5 font-medium"
              title={`Last checked ${lastSyncTime.toLocaleTimeString()}`}
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
              <span>Live Phone Sync Active</span>
            </div>

            {/* Reset Demo */}
            <button
              onClick={handleResetDemo}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-xl px-3 py-1.5 font-semibold transition-colors flex items-center gap-1.5"
              title="Reset sample accounts and payment status"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset State</span>
            </button>

            {/* Flip back to Resident Portal */}
            <Link
              href="/"
              className="bg-[#7A1900] hover:bg-[#5f1300] text-white rounded-xl px-3.5 py-1.5 font-bold shadow-md transition-all flex items-center gap-1.5 hover:scale-[1.02]"
            >
              <span>📱 Resident Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 flex items-center justify-between">
          <nav className="flex space-x-1 sm:space-x-4 py-2" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("batch")}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === "batch"
                  ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-[#C9381A]" />
              <span>Past-Due SMS Recovery Batch</span>
              <span className="ml-1 text-xs bg-red-950 text-red-300 border border-red-900 px-2 py-0.5 rounded-full font-bold">
                {accounts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("instant")}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === "instant"
                  ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Send Instant Payment Link</span>
              <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-900 px-2 py-0.5 rounded-full font-bold">
                Front-Desk Call-In
              </span>
            </button>
          </nav>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero Raw PAN Storage • PCI-DSS Boundary Enforced</span>
          </div>
        </div>
      </header>

      {/* Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* VIEW 1: TAB 1 — PAST-DUE SMS RECOVERY BATCH */}
        {activeTab === "batch" && (
          <div className="space-y-6 animate-fade-in">
            {/* 1. Top Metric Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Delinquent */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Total Delinquent
                    </p>
                    <p className="text-2xl sm:text-3xl font-black text-white mt-1">
                      ${baselineCohortDelinquent.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      50 accounts on Route 4 (Eden Prairie)
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-900/40 text-red-400 flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Messages Sent */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Messages Sent
                    </p>
                    <p className="text-2xl sm:text-3xl font-black text-blue-400 mt-1">
                      {totalSent} <span className="text-sm font-semibold text-slate-400">/ {accounts.length}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      1-click recovery alerts dispatched
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-900/40 text-blue-400 flex items-center justify-center">
                    <Send className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Collected to Date */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Collected to Date
                    </p>
                    <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                      ${totalCollected.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-emerald-500 mt-1 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{paidAccounts.length} accounts settled</span>
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-900/40 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Recovery Rate */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Recovery Rate
                    </p>
                    <p className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {recoveryRate}%
                    </p>
                    <div className="w-32 bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(parseFloat(recoveryRate), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-900/40 text-purple-400 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. File Upload / Quick Demo Loader Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#C9381A]" />
                    <span>Quarterly Delinquent Batch Ingestion</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Drag & drop Navusoft delinquent aging export or load the verified Eden Prairie test cohort.
                  </p>
                </div>

                {/* MANDATORY 1-Click Demo Button */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setAccounts(
                        DEFAULT_SAMPLE_ACCOUNTS.map((a) => ({
                          ...a,
                          phoneNumber: a.isDemoTarget && myCellPhone ? myCellPhone : a.phoneNumber,
                          smsStatus: "Draft",
                        }))
                      );
                      setUploadNotice("⚡ Loaded 5 Eden Prairie delinquent accounts for Route 4.");
                    }}
                    className="bg-gradient-to-r from-[#7A1900] to-[#A02409] hover:from-[#911e00] hover:to-[#b82b0b] text-white px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all transform active:scale-98"
                  >
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>⚡ Load SWS Sample Batch (5 Accounts)</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-400" />
                    <span>Import Custom CSV</span>
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

              {/* Drag & Drop Dropzone */}
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
                className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors ${
                  isDragging
                    ? "border-emerald-500 bg-emerald-950/20 text-emerald-200"
                    : "border-slate-800 hover:border-slate-700 bg-slate-950/50 text-slate-400"
                }`}
              >
                <p className="text-xs">
                  Drop Navusoft CSV here or click Import. Accepted columns:{" "}
                  <code className="bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded font-mono">
                    AccountNumber,CustomerName,PhoneNumber,AmountDue,Service
                  </code>
                </p>
                {uploadNotice && (
                  <p className="text-xs font-semibold text-emerald-400 mt-2">{uploadNotice}</p>
                )}
              </div>

              {/* Demo Account Mobile Phone Quick Edit Bar */}
              <div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-amber-200">
                  <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>Live Demo Cell Config:</strong> Account <strong>SWS-89545</strong> (Patrick Badley) will receive texts at:{" "}
                    <span className="font-mono font-bold text-white bg-amber-900/60 px-2 py-0.5 rounded">
                      {accounts.find((a) => a.isDemoTarget)?.phoneNumber || "(612) 555-0192"}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {!isEditingCell ? (
                    <button
                      onClick={() => setIsEditingCell(true)}
                      className="bg-amber-800 hover:bg-amber-700 text-amber-100 font-bold px-2.5 py-1 rounded-lg transition-colors text-xs"
                    >
                      ✏️ Change Cell Number
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        placeholder="e.g. 6125550192"
                        defaultValue={accounts.find((a) => a.isDemoTarget)?.phoneNumber || ""}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSaveMyCell((e.target as HTMLInputElement).value);
                          }
                        }}
                        id="demo-cell-input"
                        className="bg-slate-950 border border-amber-600 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 w-36 font-mono focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          const input = document.getElementById("demo-cell-input") as HTMLInputElement;
                          if (input) handleSaveMyCell(input.value);
                        }}
                        className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg text-xs"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Action Toolbar & Accounts Campaign Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden space-y-0">
              {/* Table Action Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80">
                <div className="flex items-center gap-3">
                  {/* Primary Batch Action Button */}
                  <button
                    onClick={handleLaunchBatch}
                    disabled={isBatchSending || accounts.every((a) => a.smsStatus !== "Draft")}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black text-sm px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition-all active:scale-98"
                  >
                    {isBatchSending ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>
                          Dispatching ({batchProgress?.sent} / {batchProgress?.total})...
                        </span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>
                          🚀 Launch 1-Click Text Alerts (
                          {accounts.filter((a) => a.smsStatus === "Draft").length} Accounts)
                        </span>
                      </>
                    )}
                  </button>

                  {/* ERP Export Reconciliation Button */}
                  <button
                    onClick={handleDownloadNavusoftCsv}
                    className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-colors"
                    title="Export settled payments into standard Navusoft cash posting batch CSV"
                  >
                    <Download className="w-4 h-4" />
                    <span>📥 Download Navusoft Cash Posting File</span>
                    {paidAccounts.length > 0 && (
                      <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        {paidAccounts.length} Ready
                      </span>
                    )}
                  </button>
                </div>

                {/* Search / Filter */}
                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search account or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-600"
                  />
                </div>
              </div>

              {/* Progress Bar when Sending */}
              {isBatchSending && batchProgress && (
                <div className="bg-slate-950 px-5 py-2 border-b border-slate-800">
                  <div className="flex justify-between text-xs text-blue-300 font-semibold mb-1">
                    <span>Dispatching Twilio SMS alerts to Eden Prairie Route 4...</span>
                    <span>
                      {Math.round((batchProgress.sent / batchProgress.total) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${(batchProgress.sent / batchProgress.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Accounts Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300 divide-y divide-slate-800">
                  <thead className="bg-slate-950/70 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Account #</th>
                      <th className="py-3.5 px-4">Customer Name & Address</th>
                      <th className="py-3.5 px-4">Phone Number</th>
                      <th className="py-3.5 px-4">Balance Due</th>
                      <th className="py-3.5 px-4">SMS Recovery Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredAccounts.map((acc) => (
                      <tr
                        key={acc.accountNumber}
                        className={`hover:bg-slate-800/40 transition-colors ${
                          acc.isDemoTarget ? "bg-amber-950/10" : ""
                        }`}
                      >
                        {/* Account # */}
                        <td className="py-3.5 px-4 font-mono font-bold text-white whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span>{acc.accountNumber}</span>
                            {acc.isDemoTarget && (
                              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-1.5 py-0.5 rounded">
                                DEMO TARGET
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-sans">Eden Prairie • R-04</div>
                        </td>

                        {/* Customer Name & Address */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-100">{acc.customerName}</div>
                          <div className="text-xs text-slate-400 truncate max-w-xs">{acc.service}</div>
                          {acc.address && (
                            <div className="text-[11px] text-slate-500 truncate max-w-xs">{acc.address}</div>
                          )}
                        </td>

                        {/* Phone Number */}
                        <td className="py-3.5 px-4 font-mono whitespace-nowrap text-slate-300">
                          {acc.phoneNumber}
                        </td>

                        {/* Balance Due */}
                        <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                          ${acc.amountDue.toFixed(2)}
                        </td>

                        {/* SMS Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {acc.smsStatus === "Draft" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                              <Clock className="w-3 h-3" />
                              <span>Draft</span>
                            </span>
                          )}
                          {acc.smsStatus === "Sending" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800 animate-pulse">
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              <span>Sending...</span>
                            </span>
                          )}
                          {acc.smsStatus === "Sent" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-950/80 text-blue-300 border border-blue-800">
                              <Smartphone className="w-3 h-3 text-blue-400" />
                              <span>Sent (Delivered)</span>
                            </span>
                          )}
                          {acc.smsStatus === "Paid" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-950 text-emerald-300 border border-emerald-700 shadow-sm animate-fade-in">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>PAID - ${acc.amountDue.toFixed(2)}</span>
                            </span>
                          )}
                          {acc.paidAt && (
                            <div className="text-[10px] text-emerald-400 mt-0.5 font-medium">
                              via {acc.paymentMethod || "Apple Pay"}
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Send Single Alert */}
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
                                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors"
                              >
                                Send Text
                              </button>
                            )}

                            {/* Copy Link fallback */}
                            {acc.paymentUrl && (
                              <button
                                onClick={() => copyToClipboard(acc.paymentUrl!, acc.accountNumber)}
                                className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-lg text-xs transition-colors"
                                title="Copy 1-tap payment link"
                              >
                                {copiedId === acc.accountNumber ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}

                            {/* View / Open Pay Link */}
                            <a
                              href={acc.paymentUrl || `/pay/${Buffer.from(JSON.stringify({ acc: acc.accountNumber, amt: acc.amountDue, name: acc.customerName })).toString("base64url")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-lg text-xs transition-colors"
                              title="Open resident pay view"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            {/* Instant Demo Pay Simulation */}
                            {acc.smsStatus !== "Paid" && (
                              <button
                                onClick={() => handleSimulatePayment(acc.accountNumber, acc.customerName, acc.amountDue)}
                                className="bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-lg text-xs font-bold transition-all"
                                title="Simulate 1-tap customer authorization"
                              >
                                ⚡ Simulate Pay
                              </button>
                            )}
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

        {/* VIEW 2: TAB 2 — SEND INSTANT PAYMENT LINK (FRONT-DESK CALL-IN TOOL) */}
        {activeTab === "instant" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            {/* Left Column: Form */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold mb-2">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Front-Desk Inbound Call Tool</span>
                  </div>
                  <h2 className="text-xl font-black text-white">
                    Dispatch Instant Mobile Payment Link
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Customer on the line with an expired card? Text them a secure 1-tap Apple Pay / Google Pay link in 5 seconds while keeping them on the phone.
                  </p>
                </div>

                <form onSubmit={handleDispatchCallIn} className="space-y-4">
                  {/* Phone Input with Presets */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Customer Mobile Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(952) 937-8900"
                      value={callInPhone}
                      onChange={(e) => setCallInPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-500"
                    />

                    {/* Quick Fill Presets */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (myCellPhone) {
                            setCallInPhone(myCellPhone);
                          } else {
                            const num = prompt("Enter your mobile number for live demo testing:");
                            if (num) {
                              handleSaveMyCell(num);
                              setCallInPhone(num);
                            }
                          }
                        }}
                        className="bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-800/80 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <Smartphone className="w-3 h-3" />
                        <span>📱 Fill My Cell (Patrick)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCallInPhone("(952) 937-8900")}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors"
                      >
                        🏢 SWS Office (952-937-8900)
                      </button>

                      <button
                        type="button"
                        onClick={() => setCallInPhone("(612) 555-0192")}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors"
                      >
                        🧑 Resident Demo (612-555-0192)
                      </button>
                    </div>
                  </div>

                  {/* Customer Name & Account */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        required
                        value={callInName}
                        onChange={(e) => setCallInName(e.target.value)}
                        placeholder="Patrick Badley"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Account Number
                      </label>
                      <input
                        type="text"
                        required
                        value={callInAccount}
                        onChange={(e) => setCallInAccount(e.target.value)}
                        placeholder="SWS-89545"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Amount Due & Quick Chips */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Amount Due ($)
                      </label>
                      <span className="text-xs text-slate-400">Standard residential service rates</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={callInAmount}
                        onChange={(e) => setCallInAmount(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-base font-bold text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Quick Amount Chips */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setCallInAmount(94.5)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-colors ${
                          callInAmount === 94.5
                            ? "bg-[#7A1900] text-white border-red-700"
                            : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750"
                        }`}
                      >
                        $94.50 Quarterly Base
                      </button>
                      <button
                        type="button"
                        onClick={() => setCallInAmount(126.93)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-colors ${
                          callInAmount === 126.93
                            ? "bg-[#7A1900] text-white border-red-700"
                            : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750"
                        }`}
                      >
                        $126.93 With Extra Can
                      </button>
                      <button
                        type="button"
                        onClick={() => setCallInAmount(45.0)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-colors ${
                          callInAmount === 45.0
                            ? "bg-[#7A1900] text-white border-red-700"
                            : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750"
                        }`}
                      >
                        $45.00 Bulky Item
                      </button>
                    </div>
                  </div>

                  {/* Service / Memo */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Service Description / Memo
                    </label>
                    <select
                      value={callInService}
                      onChange={(e) => setCallInService(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Past-Due Recovery - Card Expired">Past-Due Recovery - Card Expired</option>
                      <option value="Quarterly Trash & Organics (Route 4)">Quarterly Trash & Organics (Route 4)</option>
                      <option value="Bulky Item Mattress Collection">Bulky Item Mattress Collection</option>
                      <option value="Extra Yard Waste Bin Subscription">Extra Yard Waste Bin Subscription</option>
                    </select>
                  </div>

                  {/* Primary Dispatch Button */}
                  <button
                    type="submit"
                    disabled={isDispatchingInstant}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-5 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50 mt-4"
                  >
                    {isDispatchingInstant ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending Text to {callInPhone}...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>💬 Dispatch Instant Payment Link via Text</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Live Transaction Feed & Confirmation */}
            <div className="lg:col-span-6 space-y-6">
              {!instantSentResult ? (
                /* Empty state prompt */
                <div className="bg-slate-900 border border-dashed border-slate-800 rounded-3xl p-8 text-center space-y-4 h-full flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <div className="max-w-sm space-y-1">
                    <h3 className="font-bold text-white text-base">Ready to Dispatch</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Fill in the customer details on the left and tap Dispatch. The live transaction card will appear here and sync in real time as the resident pays on their mobile device.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                      handleDispatchCallIn(fakeEvent);
                    }}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-bold underline"
                  >
                    ⚡ Test Dispatch Sample Link
                  </button>
                </div>
              ) : (
                /* Live Transaction Card */
                <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 animate-fade-in relative overflow-hidden">
                  {/* Status Banner */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400">
                        {instantSentResult.accountNumber}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">
                        Sent at {instantSentResult.dispatchedAt}
                      </span>
                    </div>

                    {instantSentResult.simulated && (
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                        Simulated SMS Carrier
                      </span>
                    )}
                  </div>

                  {/* Dynamic Status Chip */}
                  <div
                    className={`p-4 rounded-2xl border transition-all ${
                      isCallInPaid
                        ? "bg-emerald-950/50 border-emerald-500 text-emerald-300"
                        : "bg-amber-950/40 border-amber-600/50 text-amber-300"
                    }`}
                  >
                    {isCallInPaid ? (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-base shrink-0 shadow-lg">
                          ✓
                        </div>
                        <div className="space-y-0.5">
                          <div className="font-black text-white text-base flex items-center gap-1.5">
                            <span>✓ PAID — ${instantSentResult.amount.toFixed(2)}</span>
                            <span className="text-xs font-normal text-emerald-400">via Apple Pay</span>
                          </div>
                          <p className="text-xs text-emerald-200/90">
                            Payment verified via live webhook/poll. Ready to post directly into Navusoft batch cash receipts.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500 flex items-center justify-center shrink-0">
                          <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="font-bold text-amber-200 text-sm flex items-center gap-2">
                            <span>⏳ Awaiting Customer Payment...</span>
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                          </div>
                          <p className="text-xs text-amber-300/80">
                            Live sync active. When resident authorizes Apple Pay or enters card on their phone, this badge will automatically flip to green.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Resident SMS Message Preview Box */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Resident Message Preview
                    </span>
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 font-sans space-y-2 leading-relaxed">
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] pb-1 border-b border-slate-800">
                        <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                        <span>Delivered to {instantSentResult.recipient}</span>
                      </div>
                      <p className="text-slate-200">{instantSentResult.messageBody}</p>
                    </div>
                  </div>

                  {/* Payment Link & Fallback Copy */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Universal 1-Tap Payment Link
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={instantSentResult.paymentUrl}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono w-full truncate"
                      />
                      <button
                        onClick={() => copyToClipboard(instantSentResult.paymentUrl, "instant-link")}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
                      >
                        {copiedId === "instant-link" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>

                      <a
                        href={instantSentResult.paymentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-xl text-xs transition-colors shrink-0"
                        title="Open resident pay view"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Manual Test Flip Button */}
                  {!isCallInPaid && (
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Testing without a phone?</span>
                      <button
                        onClick={() =>
                          handleSimulatePayment(
                            instantSentResult.accountNumber,
                            instantSentResult.customerName,
                            instantSentResult.amount
                          )
                        }
                        className="bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Simulate Customer Payment Now</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Operations Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-4 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>
            © {new Date().getFullYear()} Suburban Waste Services • Front-Office Operations Management Console
          </span>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Connected to Navusoft Batch Interface</span>
            <span>•</span>
            <Link href="/" className="hover:text-slate-300 underline">
              Resident Account View
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
