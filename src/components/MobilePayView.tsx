"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Smartphone,
  ChevronRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import { StripeLivePayment } from "./StripeLivePayment";

export interface MobilePayDetails {
  accountNumber: string;
  customerName: string;
  amount: number;
  service: string;
  address: string;
}

interface MobilePayViewProps {
  initialDetails?: Partial<MobilePayDetails>;
}

export function MobilePayView({ initialDetails }: MobilePayViewProps) {
  const details: MobilePayDetails = {
    accountNumber: initialDetails?.accountNumber || "SWS-89545",
    customerName: initialDetails?.customerName || "Patrick Badley",
    amount: typeof initialDetails?.amount === "number" ? initialDetails.amount : 94.5,
    service: initialDetails?.service || "Quarterly Trash & Organics Service",
    address: initialDetails?.address || "Eden Prairie, MN (Route 4)",
  };

  const [platform, setPlatform] = useState<"apple" | "google">("apple");
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState(details.customerName);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  // Stripe Sandbox State
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof getStripe> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isStripeConfigured, setIsStripeConfigured] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent || "";
      const isApple = /Macintosh|Mac OS X|iPhone|iPad|iPod/i.test(ua) && !/Android/i.test(ua);
      setPlatform(isApple ? "apple" : "google");
    }

    // Initialize Stripe PaymentIntent
    const sp = getStripe();
    setStripePromise(sp);

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: details.amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.configured && data.clientSecret) {
          setClientSecret(data.clientSecret);
          setIsStripeConfigured(true);
        } else {
          setIsStripeConfigured(false);
        }
      })
      .catch(() => {
        setIsStripeConfigured(false);
      });
  }, [details.amount]);

  const handleSuccessfulPayment = () => {
    setIsProcessing(false);
    setIsPaid(true);
    const code = "SWS-" + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(code);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleSimulated1Tap = () => {
    setIsProcessing(true);
    setTimeout(() => {
      handleSuccessfulPayment();
    }, 1400);
  };

  const handleFillTestCard = () => {
    setCardNumber("4242 •••• •••• 4242");
    setCardExp("12/28");
    setCardCvv("123");
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      handleSuccessfulPayment();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full mx-auto space-y-6 pt-4">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-2 bg-white rounded-2xl shadow-lg border border-slate-200">
            <img
              src="/sws-logo.png"
              alt="Suburban Waste Services"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white">
              Suburban Waste Services
            </h1>
            <p className="text-xs font-semibold text-slate-400">
              Savage & Eden Prairie, MN • Dispatch (952) 937-8900
            </p>
          </div>
        </div>

        {/* Payment Main Card */}
        {!isPaid ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">
            {/* Urgent Past-Due Banner */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-amber-300">Quarterly Past-Due Settlement</div>
                <div className="text-amber-200/80 leading-relaxed">
                  Pay now to avoid Thursday curbside service interruption on Route 4.
                </div>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-baseline border-b border-slate-800/80 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Balance Due
                </span>
                <span className="text-3xl font-black text-white tracking-tight">
                  ${details.amount.toFixed(2)}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Account:</span>
                  <span className="font-mono font-bold text-slate-200">
                    {details.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Customer:</span>
                  <span className="font-medium text-slate-200">{details.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-medium text-slate-200">{details.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service Address:</span>
                  <span className="font-medium text-slate-200">{details.address}</span>
                </div>
              </div>
            </div>

            {/* Payment Actions */}
            <div className="space-y-3 pt-1">
              {/* Live Stripe Native Wallet (if configured) */}
              {isStripeConfigured && stripePromise && clientSecret ? (
                <div className="space-y-2">
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: { theme: "night" },
                    }}
                  >
                    <StripeLivePayment
                      amount={details.amount}
                      clientSecret={clientSecret}
                      onSuccess={handleSuccessfulPayment}
                      setIsProcessing={setIsProcessing}
                    />
                  </Elements>
                  <p className="text-[11px] text-center text-slate-400">
                    ⚡ Live Stripe Payment Intent Initialized
                  </p>
                </div>
              ) : (
                /* Simulated 1-Tap Wallet */
                <button
                  onClick={handleSimulated1Tap}
                  disabled={isProcessing}
                  className="w-full bg-white hover:bg-slate-100 active:scale-[0.98] text-black py-4 px-5 rounded-2xl font-black text-base shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying Biometrics...</span>
                    </div>
                  ) : platform === "apple" ? (
                    <>
                      <span className="text-xl"></span>
                      <span>Pay ${details.amount.toFixed(2)} with Apple Pay</span>
                    </>
                  ) : (
                    <>
                      <span className="font-bold text-blue-600">G</span>
                      <span className="font-bold text-red-600">o</span>
                      <span className="font-bold text-amber-500">o</span>
                      <span className="font-bold text-blue-600">g</span>
                      <span className="font-bold text-emerald-600">l</span>
                      <span className="font-bold text-red-600">e</span>
                      <span className="ml-1">Pay ${details.amount.toFixed(2)}</span>
                    </>
                  )}
                </button>
              )}

              {/* Card Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-slate-800"></div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  or pay by card
                </span>
                <div className="flex-1 h-px bg-slate-800"></div>
              </div>

              {!showCardForm ? (
                <button
                  onClick={() => setShowCardForm(true)}
                  className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <span>Debit / Credit Card</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 ml-auto" />
                </button>
              ) : (
                <form onSubmit={handleCardSubmit} className="space-y-3 animate-fade-in pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Card Information</span>
                    <button
                      type="button"
                      onClick={handleFillTestCard}
                      className="text-emerald-400 hover:text-emerald-300 font-bold underline"
                    >
                      ⚡ Fill 4242 Test Card
                    </button>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="CVC"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Cardholder Name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Payment...</span>
                      </div>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Authorize ${details.amount.toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Security Badge */}
            <div className="pt-2 border-t border-slate-800 text-center flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>PCI-DSS Level 1 Secure • 256-bit Bank Encryption</span>
            </div>
          </div>
        ) : (
          /* Payment Success Confirmation */
          <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 shadow-2xl space-y-6 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto text-2xl font-black shadow-lg shadow-emerald-500/30">
              ✓
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl font-black text-white">Payment Received!</h2>
              <p className="text-sm text-emerald-400 font-semibold">
                Your past-due balance of ${details.amount.toFixed(2)} has been cleared.
              </p>
            </div>

            <div className="bg-slate-950 rounded-2xl p-4 text-left text-xs space-y-2 border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Confirmation Code:</span>
                <span className="font-mono font-bold text-white">{confirmationCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Account:</span>
                <span className="font-mono font-bold text-white">{details.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pickup Status:</span>
                <span className="font-bold text-emerald-400">Active (Thursday Route 4)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Receipt:</span>
                <span className="text-slate-300">Sent to SMS & Account File</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3.5 px-4 rounded-xl font-bold text-sm transition-colors"
              >
                <span>View Full Account Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => {
                  setIsPaid(false);
                  setIsProcessing(false);
                  setShowCardForm(false);
                }}
                className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1 mx-auto"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Test Payment Again</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-slate-500">
        © {new Date().getFullYear()} Suburban Waste Services • Modern Billing Overlay
      </footer>
    </div>
  );
}
