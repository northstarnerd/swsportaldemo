"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  CreditCard,
  Lock,
  ShieldCheck,
  Smartphone,
  Loader2,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import { StripeLivePayment } from "./StripeLivePayment";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: () => void;
}

export function PaymentModal({ isOpen, onClose, amount, onSuccess }: PaymentModalProps) {
  const [platform, setPlatform] = useState<"apple" | "google">("apple");
  const [paymentMethod, setPaymentMethod] = useState<"apple" | "google" | "card">("apple");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("Patrick Badley");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Stripe State
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof getStripe> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isStripeConfigured, setIsStripeConfigured] = useState<boolean>(false);

  // Detect user's device/browser ecosystem
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent || "";
      const isApple = /Macintosh|Mac OS X|iPhone|iPad|iPod/i.test(ua) && !/Android/i.test(ua);
      if (isApple) {
        setPlatform("apple");
        setPaymentMethod("apple");
      } else {
        setPlatform("google");
        setPaymentMethod("google");
      }
    }
  }, [isOpen]);

  // Query API to initialize Stripe PaymentIntent or confirm demo mode
  useEffect(() => {
    if (isOpen) {
      const sp = getStripe();
      setStripePromise(sp);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
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
    }
  }, [isOpen, amount]);

  if (!isOpen) return null;

  const handlePaymentSuccess = () => {
    setIsProcessing(false);
    setIsCompleted(true);

    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#7A1900", "#10B981", "#3B82F6", "#F59E0B"],
    });

    setTimeout(() => {
      onSuccess();
      onClose();
      setIsCompleted(false);
    }, 1600);
  };

  const handleSimulatedPay = async (methodName: string) => {
    setIsProcessing(true);
    // Simulate payment API delay
    await new Promise((resolve) => setTimeout(resolve, 1100));
    handlePaymentSuccess();
  };

  const handleAutofillTestCard = () => {
    setCardNumber("4242 4242 4242 4242");
    setCardExp("12/28");
    setCardCvv("123");
    setCardName("Patrick Badley");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7A1900] to-[#9E2A0D] p-5 sm:p-6 text-white flex items-center justify-between">
          <div>
            <h3 className="font-black text-xl">Secure Bill Payment</h3>
            <p className="text-sm text-red-100 mt-0.5">Suburban Waste Services • Eden Prairie</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {isCompleted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900">Payment Successful!</h4>
              <p className="text-base text-slate-600 mt-1">
                ${amount.toFixed(2)} has been charged. Your SWS account is now fully active with no past-due balance.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-500 font-mono">
              Receipt #SWS-2026-89545-PAY • Auth: #994821
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Amount Banner */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Due</span>
                <p className="text-3xl font-black text-slate-900 mt-0.5">${amount.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Instant Clearing
                </span>
                <p className="text-xs text-slate-500 mt-1 font-medium">Quarterly Resi Service</p>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Payment Method
                </label>
                {/* Demo device simulator toggle */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400">Device:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setPlatform("apple");
                      setPaymentMethod("apple");
                    }}
                    className={`px-2 py-0.5 rounded-md transition-colors ${
                      platform === "apple" ? "bg-black text-white font-bold" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                     iOS
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPlatform("google");
                      setPaymentMethod("google");
                    }}
                    className={`px-2 py-0.5 rounded-md transition-colors ${
                      platform === "google" ? "bg-blue-600 text-white font-bold" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Android
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {platform === "apple" ? (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("apple")}
                    className={`py-3.5 px-3 rounded-2xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === "apple"
                        ? "border-black bg-black text-white shadow-md"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-base font-black">Pay</span>
                    <span className="text-xs opacity-80">(1-Tap)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("google")}
                    className={`py-3.5 px-3 rounded-2xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === "google"
                        ? "border-blue-600 bg-blue-600 text-white shadow-md"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-sm font-black">Google Pay</span>
                    <span className="text-xs opacity-80">(1-Tap)</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`py-3.5 px-3 rounded-2xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === "card"
                      ? "border-[#7A1900] bg-[#7A1900] text-white shadow-md"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </button>
              </div>
            </div>

            {/* Apple Pay View */}
            {paymentMethod === "apple" && (
              <div className="space-y-3 pt-1">
                {isStripeConfigured && clientSecret && stripePromise ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <StripeLivePayment
                      amount={amount}
                      clientSecret={clientSecret}
                      onSuccess={handlePaymentSuccess}
                      setIsProcessing={setIsProcessing}
                    />
                  </Elements>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 flex items-center gap-3">
                    <Smartphone className="w-6 h-6 text-slate-900 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Apple Pay Ready</p>
                      <p className="text-xs text-slate-500 font-medium">
                        Pay with your saved Apple Wallet card (Visa •••• 4012)
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleSimulatedPay("Apple Pay")}
                  className="w-full bg-black hover:bg-neutral-800 text-white py-3.5 rounded-2xl font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Authorizing Apple Pay...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay with</span>
                      <span className="text-lg font-black tracking-tight">Pay</span>
                    </>
                  )}
                </button>

                {!isStripeConfigured && (
                  <div className="text-center">
                    <span className="text-[11px] text-slate-400">
                      Running in interactive simulation mode • Stripe keys in <code className="font-mono">.env.local</code>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Google Pay View */}
            {paymentMethod === "google" && (
              <div className="space-y-3 pt-1">
                {/* Engine Mode Pill */}
                <div className="flex items-center justify-between px-1 text-xs">
                  <span className="font-semibold text-slate-500 text-[11px] uppercase tracking-wider">Gateway</span>
                  {isStripeConfigured ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Stripe Test Mode Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Interactive Demo Mode
                    </span>
                  )}
                </div>

                {isStripeConfigured && clientSecret && stripePromise ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <StripeLivePayment
                      amount={amount}
                      clientSecret={clientSecret}
                      onSuccess={handlePaymentSuccess}
                      setIsProcessing={setIsProcessing}
                    />
                  </Elements>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">Google Pay Ready</p>
                      <p className="text-[11px] text-slate-500">Fast 1-tap checkout with your Google Wallet</p>
                    </div>
                  </div>
                )}

                {/* 1-Tap Google Pay Button (Simulated / Fallback) */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleSimulatedPay("Google Pay")}
                  className="w-full bg-slate-900 hover:bg-black text-white py-3.5 rounded-2xl font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Authorizing Google Pay...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay with</span>
                      <span className="text-base font-black text-white">Google Pay</span>
                    </>
                  )}
                </button>

                {!isStripeConfigured && (
                  <p className="text-[11px] text-center text-slate-400">
                    Add your test keys in <code className="text-slate-600 font-mono">.env.local</code> to activate live Stripe Google Pay tokens.
                  </p>
                )}
              </div>
            )}

            {/* Credit Card Input View */}
            {paymentMethod === "card" && (
              <form
                id="payment-form"
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSimulatedPay("Credit Card");
                }}
                className="space-y-3 pt-1"
              >
                <div className="flex items-center justify-between">
                  <label htmlFor="cc-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Name on Card
                  </label>
                  <button
                    type="button"
                    onClick={handleAutofillTestCard}
                    className="text-[11px] text-[#7A1900] hover:underline font-bold flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Autofill Test Card
                  </button>
                </div>

                <div>
                  <input
                    id="cc-name"
                    name="ccname"
                    type="text"
                    autoComplete="cc-name"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Patrick Badley"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1900]"
                  />
                </div>

                <div>
                  <label htmlFor="cc-number" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      id="cc-number"
                      name="cardnumber"
                      type="text"
                      autoComplete="cc-number"
                      inputMode="numeric"
                      required
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#7A1900]"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="cc-exp" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Expires
                    </label>
                    <input
                      id="cc-exp"
                      name="cc-exp"
                      type="text"
                      autoComplete="cc-exp"
                      inputMode="numeric"
                      required
                      maxLength={5}
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#7A1900]"
                    />
                  </div>
                  <div>
                    <label htmlFor="cc-csc" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      CVV / Code
                    </label>
                    <input
                      id="cc-csc"
                      name="cvc"
                      type="text"
                      autoComplete="cc-csc"
                      inputMode="numeric"
                      required
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="123"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#7A1900]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-[#7A1900] hover:bg-[#581200] text-white py-3.5 rounded-2xl font-bold text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Pay ${amount.toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* PCI Security Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>256-Bit Encrypted • PCI-DSS Level 1 Compliant</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
