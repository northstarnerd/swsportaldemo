"use client";

import React, { useState } from "react";
import {
  X,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Mail,
  CreditCard,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface StoryComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StoryComparisonModal({ isOpen, onClose }: StoryComparisonModalProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  if (!isOpen) return null;

  const slides = [
    {
      tabLabel: "1. AutoPay Drop",
      title: "1. The Account Transition & Silent AutoPay Drop",
      tag: "Resident Experience",
      tagColor: "bg-amber-100 text-amber-800",
      content: (
        <div className="space-y-4 text-sm sm:text-base">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm sm:text-base">
              <Mail className="w-5 h-5 text-[#7A1900]" />
              <span>June 2026: SWS Announces New Billing Portal</span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Customers who had been enrolled in AutoPay were invited to transition. Like many homeowners, I assumed existing recurring payments would continue automatically.
            </p>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2 text-amber-950">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm sm:text-base">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
              <span>August 2026: The Unexpected Past-Due Notice</span>
            </div>
            <p className="text-amber-900 text-xs sm:text-sm leading-relaxed">
              Without realizing stored card details hadn't carried over, a notice arrived stating:
              <br />
              <strong className="bg-white/90 px-3 py-1 rounded-xl mt-2 inline-block text-amber-950 font-mono text-xs sm:text-sm border border-amber-200 shadow-xs">
                "Submit Payment Today to Avoid Suspension of all Services — Total Due: $126.93"
              </strong>
            </p>
          </div>
        </div>
      ),
    },
    {
      tabLabel: "2. Re-Enrollment",
      title: "2. The Multi-Step Re-Enrollment Flow",
      tag: "Customer Friction",
      tagColor: "bg-blue-100 text-blue-800",
      content: (
        <div className="space-y-4 text-xs sm:text-sm">
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            To re-enroll and clear the balance, several steps were required:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5">
              <span className="font-bold text-slate-900 text-xs sm:text-sm block">1. Account & Password Creation</span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Navigating the portal, waiting for email confirmation links, and creating new passwords.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5">
              <span className="font-bold text-slate-900 text-xs sm:text-sm block">2. Ambiguous AutoPay Menu</span>
              <p className="text-xs text-slate-500 leading-relaxed">
                AutoPay settings only offered a dropdown with [No] and [At Billing] without payment date choice.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5 sm:col-span-2">
              <span className="font-bold text-slate-900 text-xs sm:text-sm block flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#7A1900]" />
                <span>3. Customer Calls to the Office (Assumed)</span>
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                <em>We assume</em> that when busy residents hit re-enrollment friction or password resets, many give up and call Susie and the front office at (952) 937-8900 to pay over the phone.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      tabLabel: "3. Multi-Step Popups",
      title: "3. The Multi-Step Nested Modal Flow",
      tag: "Checkout Friction",
      tagColor: "bg-blue-100 text-blue-800",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center text-xs">
          <div className="bg-slate-900 text-white rounded-3xl p-5 space-y-3 h-[310px] flex flex-col justify-between shadow-md">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-xs sm:text-sm text-amber-400">Actual Flow Record</span>
                <span className="text-xs text-slate-400 font-medium">Eden Prairie Account</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Clicking <strong>"Add Wallet"</strong> opens a popup asking for Card Type & Name on Card first, requiring a Save click before opening a second screen for card details.
              </p>
            </div>
            <div className="bg-slate-800/90 rounded-2xl p-3 text-xs text-slate-300 font-mono space-y-1">
              <p className="text-amber-400">⚠️ Multi-step popups & redirects on mobile</p>
              <p className="text-emerald-400">✓ Fixed: 1-Tap Apple & Google Pay on 1 screen</p>
            </div>
          </div>

          {/* Real Screenshot Preview */}
          <div className="bg-slate-100 border border-slate-200 rounded-3xl p-3 h-[310px] flex flex-col justify-center items-center overflow-hidden shadow-inner">
            <img
              src="/navusoft-modal-cropped.png"
              alt="SWS Portal Add Wallet Multi-Step Screen"
              className="max-h-[290px] w-auto rounded-2xl object-contain shadow-lg border border-slate-300/80"
            />
          </div>
        </div>
      ),
    },
    {
      tabLabel: "4. Session Glitch",
      title: "4. The Session Expiry & 'Zombie State' Glitch",
      tag: "Technical Architecture",
      tagColor: "bg-red-100 text-red-800",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center text-xs sm:text-sm">
          <div className="bg-slate-900 text-white rounded-3xl p-5 space-y-3 h-[310px] flex flex-col justify-between shadow-md">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-xs sm:text-sm text-red-400">Observed Navusoft Bug</span>
                <span className="text-xs text-slate-400 font-medium">Screen Recording Bug</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When a session expires after 15–20 minutes, the portal <strong>fails to redirect to login</strong>. Clicking "Logout" does nothing, and clicking "Pay Invoice" triggers a raw <code>"Failed to load user"</code> error toast. The user is trapped in a zombie state until a manual hard refresh.
              </p>
            </div>
            <div className="bg-slate-800/90 rounded-2xl p-3 text-xs text-slate-300 font-mono space-y-1">
              <p className="text-red-400">⚠️ Broken unhandled 401 token state</p>
              <p className="text-emerald-400">✓ Fixed: Silent background token refresh & self-healing sessions</p>
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-5 h-[310px] flex flex-col justify-between text-xs sm:text-sm">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Our Cloud Architecture
              </span>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-1">Self-Healing Seamless Auth</h4>
              <div className="space-y-2 text-slate-700 text-xs sm:text-sm mt-2">
                <div>• <strong>Silent Token Refresh:</strong> Sessions refresh invisibly in the background.</div>
                <div>• <strong>Global 401 Interceptors:</strong> If an auth token expires, it smoothly prompts FaceID re-auth without throwing error toasts.</div>
                <div>• <strong>Instant Logout:</strong> Clears cache and returns to landing page immediately.</div>
              </div>
            </div>
            <div className="bg-emerald-900 text-white p-2.5 rounded-xl text-center font-bold text-xs">
              ✓ 100% Graceful Error Handling
            </div>
          </div>
        </div>
      ),
    },
    {
      tabLabel: "5. 1-Tap Solution",
      title: "5. The Modern 1-Tap Experience",
      tag: "Proposed Solution",
      tagColor: "bg-emerald-100 text-emerald-800",
      content: (
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs sm:text-sm">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>1-Tap Apple & Google Pay</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Biometric FaceID settles invoices in under 3 seconds with zero manual typing.
              </p>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Paycheck-Aligned AutoPay</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Customers choose 1st, 15th, or due date with a 3-day advance reminder text.
              </p>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs sm:text-sm">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>1-Click SMS Card Recovery</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                If a card expires, automated texts provide 1-click FaceID recovery links.
              </p>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs sm:text-sm">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Office Call Relief</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Self-service mobile tools significantly reduce front-desk billing inquiries.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[32px] max-w-4xl w-full h-[620px] max-h-[92vh] shadow-2xl border border-slate-100 overflow-hidden flex flex-col justify-between flex-shrink-0">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7A1900] to-[#9E2A0D] p-5 sm:p-6 text-white flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-bold text-base sm:text-xl">Eden Prairie Customer Journey & Case Study</h3>
              <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Resident Walkthrough
              </span>
            </div>
            <p className="text-sm text-red-100 mt-0.5">
              How mobile 1-tap checkout eliminates resident friction and front-office call volume
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* 5-Step Segmented Tab Bar */}
        <div className="grid grid-cols-5 border-b border-slate-200 bg-slate-50 p-2 gap-1.5 flex-shrink-0 text-xs">
          {slides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`py-2 px-3 text-center rounded-xl text-xs sm:text-sm font-bold transition-all truncate ${
                activeTab === idx
                  ? "bg-[#7A1900] text-white shadow-sm"
                  : "bg-white/70 hover:bg-white text-slate-600 border border-slate-200/60"
              }`}
            >
              {slide.tabLabel}
            </button>
          ))}
        </div>

        {/* Slide Body: Rigidly Locked 400px Height (Zero resizing or shifting!) */}
        <div className="p-6 sm:p-8 h-[400px] max-h-[400px] overflow-hidden flex flex-col justify-between text-slate-900 flex-shrink-0">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-shrink-0">
            <h4 className="text-base sm:text-lg font-black text-slate-900">{slides[activeTab].title}</h4>
            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${slides[activeTab].tagColor}`}>
              {slides[activeTab].tag}
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center py-2 overflow-hidden">
            {slides[activeTab].content}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
          <button
            disabled={activeTab === 0}
            onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-30 flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeTab === idx ? "bg-[#7A1900] w-8" : "bg-slate-300 w-2"
                }`}
              />
            ))}
          </div>

          {activeTab < slides.length - 1 ? (
            <button
              onClick={() => setActiveTab((prev) => Math.min(slides.length - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#7A1900] hover:bg-[#581200] text-white flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>Done / Return to Portal</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
