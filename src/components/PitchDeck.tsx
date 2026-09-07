"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Zap,
  Calendar,
  CreditCard,
  DollarSign,
  TrendingUp,
  Maximize2,
  Minimize2,
  Play,
  RotateCcw,
  Smartphone,
} from "lucide-react";

interface PitchDeckProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchDemo: () => void;
}

export function PitchDeck({ isOpen, onClose, onLaunchDemo }: PitchDeckProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title
    {
      id: "title",
      category: "Executive Presentation",
      title: "Transforming the SWS Customer & Billing Experience",
      subtitle: "Replacing Legacy Navusoft with a 10x Consumer-Grade Utility Portal",
      render: () => (
        <div className="flex flex-col items-center justify-center text-center space-y-8 py-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#7A1900] to-[#9E2A0D] flex items-center justify-center text-white shadow-xl shadow-red-950/20 animate-bounce-short">
            <Truck className="w-10 h-10" />
          </div>

          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-100 text-[#7A1900] px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase">
              Suburban Waste Services • Eden Prairie & Savage, MN
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Modernizing the SWS Customer Portal
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              How a modern web and mobile payment experience recovers revenue, cuts support calls by 80%, and delights residents.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl">
              <span>👤 Presented for SWS Leadership</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl">
              <span>📍 Eden Prairie Route Case Study</span>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 2: The Opportunity & Problem Statement
    {
      id: "problem",
      category: "The Current Reality",
      title: "The Problem: The Cost of Legacy Portal Friction",
      subtitle: "Why the June 2026 Navusoft migration created unintended headaches for SWS and its customers.",
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-4">
          <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-[#7A1900] flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Silent AutoPay Drops</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Customers enrolled in recurring payments for years had their cards silently dropped during system migration, triggering unexpected past-due suspensions.
            </p>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Front-Desk Call Inundation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Office staff at (952) 937-8900 spent countless hours manually keying credit cards over the phone and fielding confused pickup day inquiries.
            </p>
          </div>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Delayed Cash Flow</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Quarterly residential balances ($126.93) sat overdue for weeks simply because the online checkout forms failed to render properly.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 3: The Real Case Study Breakdown
    {
      id: "case-study",
      category: "Real-World Evidence",
      title: "Case Study: What Patrick Experienced as an SWS Customer",
      subtitle: "Walking through the actual production breakdown documented from real screenshots.",
      render: () => (
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 space-y-1.5">
              <span className="font-black text-[#7A1900] text-sm">Step 1</span>
              <h4 className="font-bold text-slate-900 text-sm">June Email</h4>
              <p className="text-slate-600 text-xs">
                Invited to join new portal; assumed recurring autopay continued.
              </p>
            </div>

            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 space-y-1.5">
              <span className="font-black text-[#7A1900] text-sm">Step 2</span>
              <h4 className="font-bold text-slate-900 text-sm">Past-Due Shock</h4>
              <p className="text-slate-600 text-xs">
                Received threatening notice: "Pay $126.93 today to avoid suspension."
              </p>
            </div>

            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 space-y-1.5">
              <span className="font-black text-[#7A1900] text-sm">Step 3</span>
              <h4 className="font-bold text-slate-900 text-sm">Registration Maze</h4>
              <p className="text-slate-600 text-xs">
                Forced to find 5-digit Acct & 9-digit Location ID + email link loops.
              </p>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 space-y-1.5">
              <span className="font-black text-red-700 text-sm">Step 4</span>
              <h4 className="font-bold text-red-950 text-sm">The Modal Bug</h4>
              <p className="text-red-800 text-xs font-medium">
                "Add Wallet" modal omitted Card Number & CVV inputs entirely!
              </p>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-4 text-xs flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-amber-400 font-bold">The Takeaway for SWS:</span>
              <p className="text-slate-300 text-xs">
                Customers <em>want</em> to pay SWS on time. The barrier is solely the software friction.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 4: The 3 Core Capabilities
    {
      id: "pillars",
      category: "Core Solution",
      title: "Three Modern Capabilities That Fix SWS Collections",
      subtitle: "Engineered specifically around residential garbage customer psychology.",
      render: () => (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                Pay
              </div>
              <h4 className="font-bold text-slate-900 text-sm">1-Tap Biometric Checkout</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Customers pay via Apple Pay or Google Pay with FaceID in 2.8 seconds. No accounts or password resets needed.
              </p>
            </div>
            <span className="text-emerald-700 font-bold text-xs">✓ 90%+ Drop in Checkout Abandonment</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#7A1900] flex items-center justify-center font-bold text-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Paycheck-Aligned AutoPay</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Homeowners choose charge timing (1st, 15th, or due date) with a 3-day SMS heads-up alert.
              </p>
            </div>
            <span className="text-emerald-700 font-bold text-xs">✓ Eliminates Overdrafts & Inquiries</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Curbside Calendar Sync</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Puts Eden Prairie pickup schedules directly on Apple/Google calendars with 7 PM reminder alarms.
              </p>
            </div>
            <span className="text-emerald-700 font-bold text-xs">✓ Stops Missed Recycling Go-Backs</span>
          </div>
        </div>
      ),
    },

    // Slide 5: Business ROI & Metrics
    {
      id: "roi",
      category: "Business Case",
      title: "Hard ROI & Quantifiable Business Impact for SWS",
      subtitle: "How modern technology pays for itself tenfold while insulating SWS from risk.",
      render: () => (
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-[#7A1900]">-80%</span>
              <p className="text-sm font-bold text-slate-800">Support Call Deflection</p>
              <p className="text-xs text-slate-500">Saves ~$5.50 in staff labor per avoided phone call.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-600">&lt; 2 Hrs</span>
              <p className="text-sm font-bold text-slate-800">Past-Due Cash Recovery</p>
              <p className="text-xs text-slate-500">Fast mobile payments replace 60-day paper collection cycles.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-blue-600">$0.00</span>
              <p className="text-sm font-bold text-slate-800">Card Breach Liability</p>
              <p className="text-xs text-slate-500">100% tokenized via PCI Level 1 hosted vaults.</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs sm:text-sm text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Net Cost Benefit:</strong> Spending ~4¢/month per customer on automated alerts saves <strong>$15–$40/year per home</strong> in avoided truck re-routes, paper postage, and office call labor.
              </span>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 6: Call to Action & Launch Demo
    {
      id: "demo",
      category: "Live Demonstration",
      title: "Experience the Working SWS Portal",
      subtitle: "Let's test the live interactive prototype built for Eden Prairie residential routes.",
      render: () => (
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Play className="w-8 h-8 fill-emerald-600 ml-1" />
          </div>

          <div className="space-y-2 max-w-lg">
            <h3 className="text-2xl font-black text-slate-900">Ready to test the live prototype?</h3>
            <p className="text-sm text-slate-600">
              Try 1-click payments, test the paycheck autopay scheduler, download dynamic calendar syncs, and simulate SMS card recovery.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onLaunchDemo}
              className="bg-[#7A1900] hover:bg-[#581200] text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl hover:shadow-2xl flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Launch Live Customer Portal Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide(0)}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              Restart Slide Deck
            </button>
          </div>
        </div>
      ),
    },
  ];

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, slides.length, onClose]);

  if (!isOpen) return null;

  const current = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/80 backdrop-blur-md animate-fade-in text-slate-900">
      <div className="bg-white rounded-[32px] max-w-4xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col min-h-[580px] max-h-[92vh]">
        
        {/* Top Pitch Deck Toolbar */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between flex-shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#7A1900] text-white flex items-center justify-center font-black text-xs">
              SWS
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200">Suburban Waste Services</span>
              <span className="text-xs text-slate-400 ml-2 hidden sm:inline">• Executive Pitch Deck</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="font-mono font-medium">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Slide Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 flex-shrink-0">
          <div
            className="bg-[#7A1900] h-full transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>

        {/* Slide Main Container */}
        <div className="p-6 sm:p-10 flex-1 flex flex-col justify-between overflow-y-auto custom-scrollbar">
          {/* Slide Header */}
          <div className="space-y-1.5 border-b border-slate-100 pb-4 flex-shrink-0">
            <span className="text-xs font-black uppercase tracking-wider text-[#7A1900] bg-red-50 px-3 py-1 rounded-full">
              {current.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {current.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">{current.subtitle}</p>
          </div>

          {/* Slide Body */}
          <div className="my-auto py-2 flex-1 flex flex-col justify-center">
            {current.render()}
          </div>

          {/* Slide Footer Navigation */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-shrink-0 text-xs">
            <button
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Slide Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === idx ? "w-6 bg-[#7A1900]" : "w-2 bg-slate-200 hover:bg-slate-300"
                  }`}
                />
              ))}
            </div>

            {currentSlide < slides.length - 1 ? (
              <button
                onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl font-bold bg-[#7A1900] hover:bg-[#581200] text-white flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onLaunchDemo}
                className="px-5 py-2.5 rounded-xl font-black bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-all shadow-md active:scale-95"
              >
                <span>Launch Demo ➔</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
