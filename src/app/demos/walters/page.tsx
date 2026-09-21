"use client";

import React, { useState } from "react";
import {
  Truck,
  Calendar,
  CreditCard,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Clock,
  Sparkles,
  Leaf,
  Plus,
  ArrowRight,
  Download,
} from "lucide-react";
import { PaymentModal } from "@/components/PaymentModal";
import { downloadICSFile } from "@/lib/icsGenerator";

export default function WaltersDemoPage() {
  const [balance, setBalance] = useState<number>(108.75);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [calendarDownloaded, setCalendarDownloaded] = useState<boolean>(false);
  const [bulkyRequested, setBulkyRequested] = useState<boolean>(false);

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setBalance(0);
    setIsPaymentModalOpen(false);
  };

  const handleCalendarDownload = () => {
    downloadICSFile();
    setCalendarDownloaded(true);
    setTimeout(() => setCalendarDownloaded(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900 pb-20">
      {/* Walters Forest Green Header */}
      <header className="bg-[#1b4d3e] text-white shadow-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center font-black text-white text-lg border border-white/20">
              <Truck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="font-black text-lg tracking-tight flex items-center gap-2">
                <span>WALTERS</span>
                <span className="text-xs uppercase px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950 font-bold">
                  Recycling & Refuse
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-medium">Customer Portal • Blaine & North Metro</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-emerald-200">Acct #7412-BL</div>
            <div className="text-xs text-white/90">125th Ave NE, Blaine, MN</div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Account Balance & 1-Tap Pay */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                Q4 Residential Service
              </span>
              {isPaid ? (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Account Settled</span>
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Due Oct 15
                </span>
              )}
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900">
              ${balance.toFixed(2)}
            </div>
            <p className="text-xs text-slate-600">
              {isPaid
                ? "Thank you! Your payment was processed via Apple Pay. Confirmation sent to text on file."
                : "Standard 95-gal Trash (Weekly) + 95-gal Recycling (Bi-Weekly) + Yard Waste."}
            </p>
          </div>

          <div>
            {isPaid ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-6 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Paid via 1-Tap Apple Pay</span>
              </div>
            ) : (
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full sm:w-auto bg-[#1b4d3e] hover:bg-[#143c30] text-white font-black px-6 py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
              >
                <CreditCard className="w-4 h-4" />
                <span>1-Tap Apple Pay ($108.75)</span>
              </button>
            )}
          </div>
        </div>

        {/* Collection Schedule Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#1b4d3e]" />
              <h2 className="font-black text-lg text-slate-950">Next Blaine Route Pickup</h2>
            </div>
            <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
              Route B-04
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Trash */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase">Trash (Weekly)</span>
                <Trash2 className="w-4 h-4 text-slate-600" />
              </div>
              <div className="font-black text-slate-900 text-base">This Friday</div>
              <div className="text-xs text-slate-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Curbside by 6:30 AM</span>
              </div>
            </div>

            {/* Recycling */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 uppercase">Recycling (Week A)</span>
                <RefreshCw className="w-4 h-4 text-emerald-700" />
              </div>
              <div className="font-black text-emerald-950 text-base">This Friday</div>
              <div className="text-xs text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Green Cart Collection</span>
              </div>
            </div>

            {/* Yard Waste */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950 uppercase">Yard Waste</span>
                <Leaf className="w-4 h-4 text-amber-800" />
              </div>
              <div className="font-black text-amber-950 text-base">Next Friday</div>
              <div className="text-xs text-amber-800">Brown Cart (Through Nov 30)</div>
            </div>
          </div>

          {/* Calendar Sync Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
            <div className="text-xs text-slate-600">
              Includes Walters holiday delay shift (+1 day following Thanksgiving & Christmas).
            </div>
            <button
              onClick={handleCalendarDownload}
              className="text-xs font-bold text-[#1b4d3e] hover:text-[#143c30] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{calendarDownloaded ? "Schedule Added to Calendar!" : "Sync Route to Phone Calendar (.ics)"}</span>
            </button>
          </div>
        </div>

        {/* Self-Service Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3">
            <div className="font-black text-base text-slate-900">Bulky Item Pickup</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Schedule curbside collection for mattresses, appliances, or furniture on your regular Friday route.
            </p>
            {bulkyRequested ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pickup Scheduled for Friday!</span>
              </div>
            ) : (
              <button
                onClick={() => setBulkyRequested(true)}
                className="text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Request Bulky Pickup ($35.00)</span>
              </button>
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3">
            <div className="font-black text-base text-slate-900">Cart Repairs & Extra Bins</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Broken wheel or cracked lid? Request a complimentary cart swap delivered by our route maintenance truck.
            </p>
            <button
              onClick={() => alert("Cart replacement service order #WLT-8921 opened. Our route truck will swap your cart within 48 hours.")}
              className="text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span>Report Damaged Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={balance}
        onSuccess={handlePaymentSuccess}
        merchantName="Walters Recycling & Refuse"
        subtitle="Walters Recycling • Blaine & North Metro"
        headerGradientClass="from-[#1b4d3e] to-[#0f3026]"
      />
    </div>
  );
}
