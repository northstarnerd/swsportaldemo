"use client";

import React from "react";
import { X, Sparkles, PhoneCall, DollarSign, Calendar, Truck, ShieldCheck, CheckCircle2 } from "lucide-react";

interface PresenterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PresenterDrawer({ isOpen, onClose }: PresenterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 text-white h-full shadow-2xl border-l border-slate-800 flex flex-col justify-between overflow-hidden animate-slide-left">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-400 font-black text-sm">💡</span>
            <div>
              <h3 className="font-bold text-sm text-white">Presenter Cheat Sheet</h3>
              <p className="text-xs text-slate-400">SWS Meeting Guide & Value Metrics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs custom-scrollbar">
          
          {/* Audience Focus Cards */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              🎯 Meeting Audience Cheat Sheet
            </span>
            <div className="space-y-2 text-slate-300 text-xs">
              <div>
                <strong className="text-white">Paul Rosland (President):</strong> Cares about diesel fuel, route profitability, and paying less than Navusoft.
              </div>
              <div>
                <strong className="text-white">Susie Scott (Office Mgr):</strong> Fields calls at (952) 937-8900. Cares about eliminating billing complaints & holiday confusion.
              </div>
              <div>
                <strong className="text-white">Rick Sievers (VP Ops):</strong> Cares about truck go-backs and getting bins out on time across 53 routes.
              </div>
            </div>
          </div>

          {/* Feature 1: Apple Pay */}
          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                <span>🍎</span> 1-Tap Apple Pay / Google Pay
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full">
                &lt; 3 Sec Checkout
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              No account passwords, no typing 16 digits into clunky modals. Resolves past-due accounts with FaceID instantly.
            </p>
            <div className="text-xs text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
              <strong>ROI:</strong> 90%+ faster cash collection on past-due quarterly bills.
            </div>
          </div>

          {/* Feature 2: Paycheck Timing */}
          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                <span>📅</span> Paycheck-Aligned AutoPay
              </span>
              <span className="text-xs bg-blue-500/20 text-blue-300 font-bold px-2.5 py-0.5 rounded-full">
                Zero Overdrafts
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Allows homeowners to set their recurring charge on the 1st, 15th, or statement due date.
            </p>
            <div className="text-xs text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
              <strong>ROI:</strong> Prevents 80% of declined payments and angry customer chargeback calls.
            </div>
          </div>

          {/* Feature 3: Calendar Sync */}
          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                <span>🗓️</span> 1-Click Curbside Calendar Sync
              </span>
              <span className="text-xs bg-purple-500/20 text-purple-300 font-bold px-2.5 py-0.5 rounded-full">
                Stops Go-Backs
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Puts Trash (weekly) and Recycling (bi-weekly) directly onto Apple, Google, & Outlook calendars with 7 PM night-before alerts.
            </p>
            <div className="text-xs text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
              <strong>ROI:</strong> Eliminates $45 truck go-backs when residents forget recycling week.
            </div>
          </div>

          {/* Feature 4: Plain-English Holiday Rules */}
          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                <span>🇺🇸</span> Plain-English Holiday Shift Rules
              </span>
              <span className="text-xs bg-red-500/20 text-red-300 font-bold px-2.5 py-0.5 rounded-full">
                Front-Desk Relief
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Clear banner: <em>"Labor Day on Monday shifts pickup to Friday this week."</em> No PDFs to download.
            </p>
            <div className="text-xs text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
              <strong>ROI:</strong> Saves Susie 200+ phone calls on every single holiday week.
            </div>
          </div>

        </div>

        {/* Footer Quick Action */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white font-mono">Esc</kbd> to close
          </span>
          <button
            onClick={onClose}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
          >
            Got it, Return to Demo
          </button>
        </div>

      </div>
    </div>
  );
}
