"use client";

import React, { useState } from "react";
import {
  Bus,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  CreditCard,
  ThermometerSnowflake,
  Download,
  UserCheck,
  Sparkles,
} from "lucide-react";
import { PaymentModal } from "@/components/PaymentModal";
import { downloadICSFile } from "@/lib/icsGenerator";

export default function SchoolBusDemoPage() {
  const [balance, setBalance] = useState<number>(125.0);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isNotRiding, setIsNotRiding] = useState<boolean>(false);
  const [calendarDownloaded, setCalendarDownloaded] = useState<boolean>(false);

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
    <div className="min-h-screen bg-amber-50/40 font-sans text-slate-900 antialiased selection:bg-amber-200 selection:text-amber-950 pb-20">
      {/* School Transit Amber Header */}
      <header className="bg-amber-500 text-slate-950 shadow-md sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-black text-lg shadow-md">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-lg tracking-tight flex items-center gap-2">
                <span>SAFEROUTE</span>
                <span className="text-xs uppercase px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 font-bold">
                  School Transit
                </span>
              </div>
              <p className="text-xs text-amber-950 font-medium">District & Private Academy Parent Portal</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-slate-950">Bus #14 Morning Route</div>
            <div className="text-xs text-amber-900">Student: Leo (Grade 3)</div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Curbside Weather Alert */}
        <div className="bg-white border border-amber-200 rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase">Minnesota Winter Curbside Guidance</div>
              <div className="text-sm font-bold text-slate-900">Current Temp: 14°F (Wind Chill 4°F)</div>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
            Wait Indoors Until 3-Min Alert
          </span>
        </div>

        {/* Live Morning Bus Proximity Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-900">
                <Bus className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-950">Bus #14 Approaching Stop</h1>
                <p className="text-xs text-slate-600">Corner of Promontory Dr & Valley View Rd</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-black text-amber-950 bg-amber-400 px-3 py-1 rounded-full">
                2 Stops Away
              </span>
              <div className="text-xs font-bold text-slate-900 mt-1">ETA: 7:24 AM (~5 mins)</div>
            </div>
          </div>

          {/* Student Riding Status & Driver Bypass Action */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Leo's Boarding Status</div>
              {isNotRiding ? (
                <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  Skipping Bus Today
                </span>
              ) : (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Expected at Stop</span>
                </span>
              )}
            </div>

            {isNotRiding ? (
              <div className="bg-rose-50 border border-rose-200 text-rose-950 p-4 rounded-xl text-xs space-y-1">
                <div className="font-bold text-rose-900">Driver Notified via Tablet Dispatch</div>
                <p>Bus #14 will skip the Promontory stop this morning, saving 2 minutes on the neighborhood route.</p>
                <button
                  onClick={() => setIsNotRiding(false)}
                  className="mt-2 text-xs font-bold text-rose-800 underline"
                >
                  Undo: Leo will ride the bus
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <p className="text-xs text-slate-600">
                  Driving Leo yourself today? Tap to let the driver skip your corner stop and prevent route delays.
                </p>
                <button
                  onClick={() => setIsNotRiding(true)}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-black px-4 py-2.5 rounded-xl text-xs transition-all active:scale-95 shrink-0"
                >
                  Leo is NOT Riding Today
                </button>
              </div>
            )}
          </div>

          {/* Dynamic Schedule & Weather Delays (.ics) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
            <div className="text-xs text-slate-600">
              Syncs Late-Start Wednesdays, 2-Hour Winter Delays, and early release days directly to phone calendars.
            </div>
            <button
              onClick={handleCalendarDownload}
              className="text-xs font-bold text-amber-950 hover:text-black bg-amber-100 hover:bg-amber-200 border border-amber-300 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{calendarDownloaded ? "School Schedule Synced!" : "Sync Bus Schedule to Calendar (.ics)"}</span>
            </button>
          </div>
        </div>

        {/* Micro-Payment & Pay-to-Ride Courtesy Fee */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Semester Courtesy Bus Transportation Fee
              </div>
              <div className="text-3xl font-black text-slate-950 mt-1">
                ${balance.toFixed(2)}{" "}
                <span className="text-xs font-normal text-slate-500">/ Fall Semester</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {isPaid
                  ? "Courtesy bus seat confirmed. Instant digital bus pass stored in Apple Wallet."
                  : "Within 2-mile non-mandated radius. 1-tap checkout eliminates paper check drop-offs at school office."}
              </p>
            </div>

            <div>
              {isPaid ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Bus Seat Paid via Apple Pay</span>
                </div>
              ) : (
                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay Seat Fee ($125)</span>
                </button>
              )}
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
        merchantName="SafeRoute Student Transportation"
        subtitle="SafeRoute Transit • Eden Prairie District"
        headerGradientClass="from-amber-600 to-amber-800"
      />
    </div>
  );
}
