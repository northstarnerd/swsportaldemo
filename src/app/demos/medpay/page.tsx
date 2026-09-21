"use client";

import React, { useState } from "react";
import {
  Stethoscope,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Receipt,
  Heart,
  Calendar,
  AlertCircle,
  FileText,
  Lock,
  Sparkles,
} from "lucide-react";
import { PaymentModal } from "@/components/PaymentModal";

export default function MedPayDemoPage() {
  const [balance, setBalance] = useState<number>(45.0);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setBalance(0);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-teal-100 selection:text-teal-900 pb-20">
      {/* Clinical Header */}
      <header className="bg-gradient-to-r from-teal-800 to-cyan-900 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center font-black text-white text-lg border border-white/20">
              <Stethoscope className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <div className="font-black text-lg tracking-tight flex items-center gap-2">
                <span>SOUTHDALE</span>
                <span className="text-xs uppercase px-2 py-0.5 rounded-full bg-teal-400 text-teal-950 font-bold">
                  Pediatrics & Surgery
                </span>
              </div>
              <p className="text-xs text-teal-100 font-medium">Patient Billing & 1-Tap QuickPay</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-teal-200">Guarantor #8942-B</div>
            <div className="text-xs text-white/90">Edina & Eden Prairie, MN</div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Patient & Visit Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                Verified Patient Statement
              </span>
              <h1 className="text-xl font-black text-slate-900 mt-2">Leo Badley (Age 8)</h1>
              <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>Date of Service: Sept 12, 2026 • Dr. Sarah Jenkins, MD</span>
              </p>
            </div>

            <div className="sm:text-right">
              <div className="text-xs text-slate-600">Insurance Carrier</div>
              <div className="text-sm font-bold text-slate-800">Blue Cross Blue Shield MN</div>
              <div className="text-xs font-mono text-slate-600">Claim #CLM-902184</div>
            </div>
          </div>

          {/* Insurance Adjudication Breakdown */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Insurance Adjudication Summary</div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Provider Billed:</span>
                <span className="font-semibold text-slate-900">$240.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Network Contract Discount:</span>
                <span className="font-semibold text-emerald-600">-$120.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Insurance Paid:</span>
                <span className="font-semibold text-emerald-600">-$75.00</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline">
                <span className="font-bold text-slate-900">Remaining Patient Copay / Deductible:</span>
                <span className="text-lg font-black text-teal-900">${balance.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* 1-Tap Settlement Action */}
          <div className="pt-2">
            {isPaid ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-5 rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Statement Settled via Apple Pay</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Thank you! Your transaction settled directly to Southdale Pediatrics. An itemized receipt and claim summary have been dispatched to your phone and Apple Wallet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full bg-teal-800 hover:bg-teal-900 text-white font-black py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-2.5 shadow-lg shadow-teal-900/20 transition-all active:scale-95"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>1-Tap Apple Pay ($45.00)</span>
                </button>

                <div className="flex items-center justify-center gap-3 text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1 text-teal-900 font-bold bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-lg">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>HSA / FSA Card Eligible</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                    <span>Zero Login or PIN Required</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Value Callout for Clinic Practice Managers */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Practice Management Economic Impact</span>
          </div>
          <h3 className="text-base font-black text-white">Why Independent Practices Switch to 1-Tap MedPay</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-slate-800/80 p-3.5 rounded-2xl space-y-1">
              <div className="font-bold text-teal-300">48-Hr Recovery</div>
              <p className="text-slate-300">73% of patient copays collected within 48 hours of SMS alert.</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-2xl space-y-1">
              <div className="font-bold text-emerald-300">Zero Paper Bills</div>
              <p className="text-slate-300">Saves $1.50/statement and eliminates manual phone collection tag.</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-2xl space-y-1">
              <div className="font-bold text-amber-300">HSA / FSA Native</div>
              <p className="text-slate-300">Patients easily spend pre-tax healthcare dollars right from Apple Wallet.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={balance}
        onSuccess={handlePaymentSuccess}
        merchantName="Southdale Pediatrics"
        subtitle="Southdale Pediatrics • Edina & Eden Prairie"
        headerGradientClass="from-teal-800 to-cyan-900"
      />
    </div>
  );
}
