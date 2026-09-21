"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Stethoscope,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  Lock,
  Sparkles,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Check,
} from "lucide-react";
import { PaymentModal } from "@/components/PaymentModal";

export default function SouthdaleMedPayDemoPage() {
  const [balance, setBalance] = useState<number>(45.0);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setBalance(0);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 antialiased selection:bg-[#0067B1]/20 selection:text-[#0067B1] pb-20">
      {/* 1. Top Phone Utility Bar (Authentic Southdale Peds Header) */}
      <div className="bg-[#00477b] text-white text-xs py-2 px-4 border-b border-[#003861]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-slate-200">
            <span className="flex items-center gap-1.5">
              <span className="text-slate-400">Pediatrics:</span>
              <a href="tel:9522787000" className="font-bold text-white hover:underline">
                (952) 278-7000
              </a>
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:flex items-center gap-1.5">
              <span className="text-slate-400">Allergy:</span>
              <a href="tel:9522787010" className="font-bold text-white hover:underline">
                (952) 278-7010
              </a>
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-slate-400">Billing Office:</span>
              <a href="tel:9528311944" className="font-bold text-emerald-300 hover:underline">
                (952) 831-1944
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-300">Edina • Eden Prairie • Burnsville</span>
            <span className="text-slate-500">|</span>
            <span className="text-amber-300 font-bold">QuickPay Portal</span>
          </div>
        </div>
      </div>

      {/* 2. Southdale Signature Alert Banner */}
      <div className="bg-[#fff9e6] border-b border-[#fde68a] text-[#854d0e] py-2 px-4 text-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 font-medium text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
          <span>
            <strong>New 1-Tap Mobile QuickPay:</strong> Settle patient balances in seconds with Apple Pay or your HSA/FSA health card. Zero login or portal PIN required.
          </span>
        </div>
      </div>

      {/* 3. Main Brand Navigation with Official Logo */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Embedded Official Southdale Pediatric Associates SVG */}
            <div className="h-10 sm:h-12 w-auto flex items-center">
              <img
                src="/images/southdale-peds-logo.svg"
                alt="Southdale Pediatric Associates, LTD"
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-[#0067B1]">Eden Prairie Clinic</div>
            <div className="text-xs text-slate-500">800 Prairie Center Drive</div>
          </div>
        </div>
      </header>

      {/* 4. Signature Southdale Gradient Banner */}
      <div className="bg-gradient-to-r from-[#0067B1] via-[#118ec4] to-[#23BCBA] text-white py-6 px-4 shadow-inner">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full mb-2 border border-white/30">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
            <span>Encrypted HIPAA-Compliant Patient Balance Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Patient Statement & 1-Tap QuickPay
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100 mt-1 max-w-2xl font-medium">
            Seven Decades of the Best in Pediatric Primary Care • Family-centered care for your children.
          </p>
        </div>
      </div>

      {/* 5. Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Patient Statement Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#0067B1] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                  Post-Insurance Patient Balance
                </span>
                {isPaid ? (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Paid in Full</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    Due in 30 Days
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-black text-slate-900 mt-2">Leo Badley (Age 8)</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#0067B1]" />
                  <span>Date of Service: Sept 12, 2026</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                  <span>Physician: Dr. Sarah Jenkins, MD</span>
                </span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:text-right text-xs space-y-0.5">
              <div className="text-slate-500 font-medium">Guarantor Account</div>
              <div className="font-bold text-slate-900 text-sm">Patrick Badley</div>
              <div className="font-mono text-slate-500">Acct #8942-B • Eden Prairie</div>
            </div>
          </div>

          {/* Insurance Adjudication Itemization */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-700">Itemized Clinical Services</span>
              <span className="text-slate-500 font-medium">Claim #CLM-902184 (BCBS Minnesota)</span>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 text-xs">
              {/* Service 1 */}
              <div className="p-3.5 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">CPT 99393 — Well-Child Preventive Exam (Established, Age 5–11)</div>
                  <div className="text-slate-500 text-xs">Routine physical, vision screening, growth & developmental assessment</div>
                </div>
                <div className="font-bold text-slate-900">$190.00</div>
              </div>

              {/* Service 2 */}
              <div className="p-3.5 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">CPT 90460 — Immunization Administration with Counseling</div>
                  <div className="text-slate-500 text-xs">Seasonal flu vaccine & childhood immunization booster</div>
                </div>
                <div className="font-bold text-slate-900">$50.00</div>
              </div>

              {/* Adjudication breakdown */}
              <div className="p-4 bg-white space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Total Southdale Pediatrics Charges:</span>
                  <span className="font-semibold text-slate-900">$240.00</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Blue Cross Blue Shield Contract Savings (In-Network):</span>
                  <span>-$120.00</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Insurance Plan Benefit Paid:</span>
                  <span>-$75.00</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                  <div>
                    <div className="font-black text-slate-900 text-sm">Remaining Patient Copay / Responsibility:</div>
                    <div className="text-slate-500 text-xs">After health insurance adjudication has been finalized</div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0067B1]">
                    ${balance.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 1-Tap Apple Pay / HSA Action */}
          <div className="pt-2">
            {isPaid ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-6 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 font-black text-emerald-800 text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Statement Settled via 1-Tap Apple Pay</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Thank you! Your payment has been reconciled into your Southdale Pediatric Associates account. A verified itemized receipt has been dispatched to your phone and saved in your Apple Wallet.
                </p>
                <div className="pt-2 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                  <span>Confirmation #SDP-PAY-882194</span>
                  <span>•</span>
                  <span>Batch Settled to Eden Prairie Clinic</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full bg-[#0067B1] hover:bg-[#00508a] text-white font-black py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 transition-all active:scale-95"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>1-Tap Apple Pay ($45.00)</span>
                </button>

                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 font-medium pt-1">
                  <span className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>HSA / FSA Healthcare Cards Supported</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl">
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Zero Login or 8-Digit PIN Required</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* The Patient Experience & Clinic Economics Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Legacy Flow */}
          <div className="bg-slate-100 border border-slate-200 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>Legacy Patient Portal Experience</span>
            </div>
            <h3 className="font-black text-slate-900 text-base">The Paper Statement Black Hole</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✗</span>
                <span>Wait 3–4 weeks for a physical paper statement in the mail.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✗</span>
                <span>Requires hunting for an 8-digit Guarantor ID or Cerner/IQHealth password.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✗</span>
                <span>Typing 16-digit card numbers manually on a smartphone keyboard.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✗</span>
                <span>60%+ of small copays ($30–$60) get forgotten and hit 90-day aging.</span>
              </li>
            </ul>
          </div>

          {/* 1-Tap MedPay Flow */}
          <div className="bg-gradient-to-br from-[#0067B1] to-[#004e87] text-white rounded-3xl p-6 space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Modern Southdale QuickPay</span>
            </div>
            <h3 className="font-black text-white text-base">Instant 1-Tap SMS Settlement</h3>
            <ul className="space-y-2 text-xs text-cyan-100">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>Parent receives direct SMS text the moment insurance clears.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>One tap opens secure tokenized statement (zero passwords or PINs).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>Double-click iPhone side button with FaceID (2 seconds total).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>73% of patient copays recovered within 48 hours; saves $1.50/statement.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Clinic Contact Info */}
        <footer className="border-t border-slate-200 pt-6 text-center text-xs text-slate-500 space-y-2">
          <div className="font-bold text-slate-700">
            Southdale Pediatric Associates, LTD • Edina • Eden Prairie • Burnsville
          </div>
          <div>
            Questions regarding this statement? Contact our Business & Billing Office at{" "}
            <a href="tel:9528311944" className="text-[#0067B1] font-bold hover:underline">
              (952) 831-1944
            </a>
          </div>
          <p className="text-slate-400">
            Protected Health Information (PHI) is tokenized and processed in accordance with HIPAA and PCI-DSS Level 1 security standards.
          </p>
        </footer>
      </main>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={balance}
        onSuccess={handlePaymentSuccess}
        merchantName="Southdale Pediatric Associates"
        subtitle="Southdale Pediatric Associates • Edina, Eden Prairie & Burnsville"
        headerGradientClass="from-[#0067B1] to-[#23BCBA]"
      />
    </div>
  );
}
