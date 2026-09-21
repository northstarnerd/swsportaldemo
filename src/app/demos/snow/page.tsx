"use client";

import React, { useState } from "react";
import {
  Snowflake,
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Camera,
  Navigation,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { PaymentModal } from "@/components/PaymentModal";

export default function SnowDispatchDemoPage() {
  const [balance, setBalance] = useState<number>(45.0);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [priorityRequested, setPriorityRequested] = useState<boolean>(false);

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setBalance(0);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 antialiased selection:bg-blue-500 selection:text-white pb-20">
      {/* Cold Weather Dark Header */}
      <header className="bg-slate-950/90 border-b border-slate-800 text-white shadow-md sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black">
              <Snowflake className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-lg tracking-tight flex items-center gap-2 text-white">
                <span>NORTH STAR</span>
                <span className="text-xs uppercase px-2 py-0.5 rounded-full bg-blue-500 text-white font-bold">
                  Snow & Ice
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Residential Storm Dispatch • Eden Prairie</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-blue-400">Route EP-North</div>
            <div className="text-xs text-slate-300">Promontory Drive</div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Active Storm Alert Banner */}
        <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/30 rounded-3xl p-5 sm:p-6 flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-300 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-blue-300 bg-blue-950 border border-blue-800 px-2.5 py-0.5 rounded-full">
                Live Winter Storm Warning
              </span>
              <span className="text-xs text-slate-400">Eden Prairie / Hennepin Co.</span>
            </div>
            <h1 className="text-lg font-black text-white">6.4 Inches Fallen — Residential Route #3 Active</h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Snow trigger (2.0 in) exceeded. All trucks dispatched for Driveway Pass #1. Salt applications underway.
            </p>
          </div>
        </div>

        {/* Live Truck Proximity Status Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Truck className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h2 className="font-black text-lg text-white">Plow Truck #04 Approaching</h2>
                <p className="text-xs text-slate-400">Driver: Dave Miller • Ford F-550 V-Plow</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full">
                2 Driveways Away
              </span>
              <div className="text-xs text-slate-400 mt-1">ETA: ~12–15 Mins</div>
            </div>
          </div>

          {/* Route Milestones Progress */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Storm Clearing Progress</div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-blue-950/80 border border-blue-800/80 p-2.5 rounded-2xl text-blue-200">
                <div className="font-bold">1. Storm Trigger</div>
                <div className="text-slate-400 text-xs">2.0" Reached</div>
              </div>
              <div className="bg-blue-950/80 border border-blue-800/80 p-2.5 rounded-2xl text-blue-200">
                <div className="font-bold">2. Dispatched</div>
                <div className="text-slate-400 text-xs">4:15 AM</div>
              </div>
              <div className="bg-emerald-950 border border-emerald-500 p-2.5 rounded-2xl text-emerald-200 ring-2 ring-emerald-500/20">
                <div className="font-bold">3. On Your Street</div>
                <div className="text-emerald-400 text-xs font-semibold">En Route Now</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl text-slate-500">
                <div className="font-bold">4. Photo Verified</div>
                <div className="text-slate-500 text-xs">Pending Clearing</div>
              </div>
            </div>
          </div>

          {/* Driveway Location */}
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Driveway: 2-Car Double Driveway + Front Sidewalk</span>
            </div>
            <span className="text-blue-300 font-semibold">Promontory Drive</span>
          </div>
        </div>

        {/* 1-Tap Per-Push Billing Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Storm Service Fee</div>
              <div className="text-3xl font-black text-white mt-1">
                ${balance.toFixed(2)}{" "}
                <span className="text-xs font-normal text-slate-400">/ Residential Push</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isPaid
                  ? "Pre-authorized via Apple Pay. Card will charge automatically upon completion photo timestamp."
                  : "Automatic 1-Tap payment authorized on file. Zero paper bills or mail-in checks."}
              </p>
            </div>

            <div>
              {isPaid ? (
                <div className="bg-emerald-950 border border-emerald-800 text-emerald-300 px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Apple Pay Pre-Authorized</span>
                </div>
              ) : (
                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-black px-6 py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all active:scale-95"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Authorize 1-Tap Apple Pay ($45)</span>
                </button>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-blue-400" />
              <span>Timestamped curb photo sent to your phone when driveway is clear.</span>
            </div>

            {priorityRequested ? (
              <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-3 py-1.5 rounded-xl">
                ✓ Priority Commute Clearing Confirmed (&lt; 6:30 AM)
              </span>
            ) : (
              <button
                onClick={() => setPriorityRequested(true)}
                className="text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3.5 py-2 rounded-xl transition-colors"
              >
                Request Priority Morning Commute Pass
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={balance}
        onSuccess={handlePaymentSuccess}
        merchantName="North Star Snow & Ice"
        subtitle="Residential Winter Storm Clearing • Eden Prairie"
        headerGradientClass="from-blue-700 to-indigo-900"
      />
    </div>
  );
}
