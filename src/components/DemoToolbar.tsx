"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Smartphone, RotateCcw, ShieldAlert, CheckCircle, Zap } from "lucide-react";

interface DemoToolbarProps {
  onOpenSmsDemo: () => void;
  onOpenStory: () => void;
  onOpenAuth: () => void;
  onOpenContainers?: () => void;
  onReset: () => void;
  onToggleState: () => void;
  isPaid: boolean;
}

export function DemoToolbar({
  onOpenSmsDemo,
  onOpenStory,
  onOpenAuth,
  onOpenContainers,
  onReset,
  onToggleState,
  isPaid,
}: DemoToolbarProps) {
  return (
    <div className="hidden md:flex fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-slate-950/90 hover:bg-slate-950 backdrop-blur-md border border-slate-800 text-white rounded-2xl px-3 py-1.5 shadow-2xl items-center gap-2 text-xs transition-all">
      {/* Slide Deck Links */}
      <Link
        href="/family-pitch"
        className="bg-emerald-800 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors"
      >
        <span>🏡 Family & Tax Deck</span>
      </Link>

      <Link
        href="/pitch"
        className="bg-[#7A1900] hover:bg-[#581200] text-white px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors"
      >
        <span>🖥️ SWS Slides</span>
      </Link>

      {/* Auth / SSO Demo */}
      <button
        onClick={onOpenAuth}
        className="bg-amber-600 hover:bg-amber-500 text-white px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-colors"
      >
        <span>🔑 Fast SSO / Auth</span>
      </button>

      {/* Bins & Yard Waste Modal */}
      {onOpenContainers && (
        <button
          onClick={onOpenContainers}
          className="bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-colors"
        >
          <span>🗑️ Bins & Yard Waste</span>
        </button>
      )}

      {/* Case Study */}
      <button
        onClick={onOpenStory}
        className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-colors"
      >
        <span>📖 Case Study</span>
      </button>

      {/* SMS Recovery Demo */}
      <button
        onClick={onOpenSmsDemo}
        className="bg-red-700 hover:bg-red-600 text-white px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-colors"
      >
        <Smartphone className="w-3 h-3" />
        <span>SMS Demo</span>
      </button>

      {/* State Toggle */}
      <button
        onClick={onToggleState}
        className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded-lg font-medium flex items-center gap-1 transition-colors"
        title="Toggle Paid vs Past-Due"
      >
        {isPaid ? (
          <span className="text-amber-400">Paid ➔ Past Due</span>
        ) : (
          <span className="text-emerald-400">Past Due ➔ Paid</span>
        )}
      </button>

      {/* Reset */}
      <button
        onClick={onReset}
        title="Reset Data"
        className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
      >
        <RotateCcw className="w-3 h-3" />
      </button>
    </div>
  );
}
