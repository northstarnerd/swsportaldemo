"use client";

import React, { useState } from "react";
import { X, Smartphone, Check, ArrowRight, ShieldCheck, Sparkles, Send } from "lucide-react";
import confetti from "canvas-confetti";

interface SmsRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCleared: () => void;
}

export function SmsRecoveryModal({ isOpen, onClose, onCleared }: SmsRecoveryModalProps) {
  const [step, setStep] = useState<"sms" | "paying" | "done">("sms");

  if (!isOpen) return null;

  const handlePayFromSms = () => {
    setStep("paying");
    setTimeout(() => {
      setStep("done");
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        onCleared();
        onClose();
        setStep("sms");
      }, 1800);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-950 rounded-[40px] max-w-sm w-full p-4 shadow-2xl border-4 border-slate-800 text-white relative">
        
        {/* Phone Notch */}
        <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-3"></div>

        <div className="flex justify-between items-center px-3 mb-2">
          <span className="text-xs font-bold text-slate-400">Mobile SMS Payment Preview</span>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Smartphone Screen Simulation */}
        <div className="bg-slate-900 rounded-[28px] p-4 min-h-[440px] flex flex-col justify-between border border-slate-800">
          
          {/* Top SMS Header */}
          <div className="text-center pb-3 border-b border-slate-800">
            <div className="w-10 h-10 rounded-full bg-[#7A1900] text-white flex items-center justify-center mx-auto font-black text-sm mb-1 shadow-md">
              SWS
            </div>
            <p className="text-sm font-bold text-slate-200">Suburban Waste Services</p>
            <p className="text-xs text-slate-400 mt-0.5">Automated Billing Alert • (952) 937-8900</p>
          </div>

          {/* SMS Chat Bubble */}
          <div className="space-y-3 my-auto">
            <div className="bg-slate-800/90 text-slate-200 rounded-2xl rounded-tl-sm p-4 text-sm space-y-2 border border-slate-700/50 shadow-sm leading-relaxed">
              <p>
                ⚠️ <strong>SWS Alert:</strong> Hi Patrick, your quarterly trash & organics payment of <strong>$126.93</strong> failed on your stored Mastercard.
              </p>
              <p className="text-slate-300 text-xs sm:text-sm">
                Tap the secure link below to clear your balance via 1-click Apple Pay and avoid Thursday pickup interruption.
              </p>
              <div className="bg-[#7A1900]/20 border border-[#7A1900]/50 rounded-xl p-2.5 text-xs text-red-200 font-mono">
                🔗 pay.suburbanwaste.com/p/89545-q3
              </div>
            </div>

            {step === "sms" && (
              <div className="pt-2 animate-bounce">
                <button
                  onClick={handlePayFromSms}
                  className="w-full bg-white hover:bg-slate-100 text-black py-3 rounded-xl font-black text-sm shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <span>Tap Link to Pay $126.93 with Pay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === "paying" && (
              <div className="bg-black border border-slate-700 rounded-2xl p-4 text-center space-y-2 animate-pulse">
                <p className="text-sm font-bold text-slate-200">Pay Biometric Authentication...</p>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            )}

            {step === "done" && (
              <div className="bg-emerald-950/80 border border-emerald-600/50 rounded-2xl p-4 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto font-black text-sm">
                  ✓
                </div>
                <p className="text-sm font-bold text-emerald-300">Payment Cleared!</p>
                <p className="text-xs text-emerald-400">
                  Account #89545 active. SWS ledger updated in real time.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Clean Status */}
          <div className="text-center pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Automated Real-Time Recovery • End-to-End Encrypted</span>
          </div>

        </div>

      </div>
    </div>
  );
}
