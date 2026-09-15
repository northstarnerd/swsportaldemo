"use client";

import React, { useState } from "react";
import {
  X,
  Smartphone,
  Send,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  Loader2,
  Info,
} from "lucide-react";

interface SmsTriggerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SmsTriggerModal({ isOpen, onClose }: SmsTriggerModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("Patrick Badley");
  const [accountNumber, setAccountNumber] = useState("SWS-89545");
  const [amount, setAmount] = useState("94.50");
  const [service, setService] = useState("Quarterly Trash & Organics");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    simulated?: boolean;
    liveAttemptFailed?: boolean;
    twilioError?: string;
    recipient?: string;
    paymentUrl?: string;
    messageBody?: string;
    error?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/sms/send-recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber,
          customerName,
          accountNumber,
          amount: parseFloat(amount) || 94.5,
          service,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({
        success: false,
        error: err.message || "Failed to reach server.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (result?.paymentUrl) {
      navigator.clipboard.writeText(result.paymentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-white relative space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-[#7A1900]/40 text-red-300 border border-[#7A1900] px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              <span>SMS Recovery Pipeline</span>
            </div>
            <h2 className="text-xl font-black text-white">Send 1-Click Recovery SMS</h2>
            <p className="text-xs text-slate-400">
              Trigger a past-due alert text directly to your phone or SWS leadership.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex justify-between">
              <span>Destination Mobile Number</span>
              <span className="text-[11px] text-slate-500 font-normal">Cell phone for SMS</span>
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. 952-555-0199 or +19525550199"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            {/* Quick Helper Presets */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setPhoneNumber("952-937-8900")}
                className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg transition-colors"
              >
                🏢 SWS Office (952) 937-8900
              </button>
              <button
                type="button"
                onClick={() => setPhoneNumber("+16125550123")}
                className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg transition-colors"
              >
                📱 Demo Cell (+1612...)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Past-Due Amount</label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => setAmount("94.50")}
                className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl text-slate-300"
              >
                $94.50
              </button>
              <button
                type="button"
                onClick={() => setAmount("126.93")}
                className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl text-slate-300"
              >
                $126.93
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !phoneNumber}
            className="w-full bg-[#7A1900] hover:bg-[#5f1300] active:scale-[0.99] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Dispatching SMS...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send 1-Click Recovery SMS Alert</span>
              </>
            )}
          </button>
        </form>

        {/* Result Feedback */}
        {result && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 animate-fade-in">
            {result.success ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-300">
                      {result.simulated
                        ? "SMS Generated (Simulation Mode)"
                        : "✓ Live SMS Delivered via Twilio!"}
                    </span>
                  </div>
                  {result.recipient && (
                    <span className="text-[11px] font-mono text-slate-400">
                      {result.recipient}
                    </span>
                  )}
                </div>

                {result.liveAttemptFailed && (
                  <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-2.5 text-[11px] text-amber-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <span>
                      Carrier note: {result.twilioError} (fell back to simulated link below).
                    </span>
                  </div>
                )}

                {/* SMS Bubble Preview */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Message Preview Sent to Device:
                  </div>
                  <p className="font-mono text-slate-200 text-[11px] break-words">
                    {result.messageBody}
                  </p>
                </div>

                {/* Direct Action Links */}
                <div className="flex gap-2 pt-1">
                  {result.paymentUrl && (
                    <>
                      <a
                        href={result.paymentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors"
                      >
                        <span>Open Payment Page</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={handleCopyLink}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Error: {result.error || "Failed to dispatch message."}</span>
              </div>
            )}
          </div>
        )}

        {/* Twilio Setup Tip */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3 text-[11px] text-slate-400 space-y-1">
          <div className="font-bold text-slate-300 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span>Twilio Cellular Integration</span>
          </div>
          <p className="leading-relaxed">
            To send live text messages over cellular networks, add{" "}
            <code className="text-slate-200 bg-slate-800 px-1 py-0.5 rounded">
              TWILIO_ACCOUNT_SID
            </code>
            ,{" "}
            <code className="text-slate-200 bg-slate-800 px-1 py-0.5 rounded">
              TWILIO_AUTH_TOKEN
            </code>
            , and{" "}
            <code className="text-slate-200 bg-slate-800 px-1 py-0.5 rounded">
              TWILIO_PHONE_NUMBER
            </code>{" "}
            to your <code className="text-slate-200 bg-slate-800 px-1 py-0.5 rounded">.env.local</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
