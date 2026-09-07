"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Zap,
  Calendar,
  DollarSign,
  Play,
  RotateCcw,
  Smartphone,
  ExternalLink,
  Users,
  Sparkles,
  HeartHandshake,
  MapPin,
  Fingerprint,
} from "lucide-react";

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title & Vision
    {
      id: "title",
      category: "Prepared for SWS Leadership",
      title: "A Modern, Frictionless Customer Portal for SWS",
      subtitle: "Delivering an effortless resident experience while cutting office overhead.",
      content: (
        <div className="flex flex-col items-center justify-center text-center h-full space-y-7">
          <div className="h-20 w-auto flex items-center justify-center p-2 bg-white rounded-3xl shadow-xl border border-slate-100">
            <img
              src="/sws-logo.png"
              alt="Suburban Waste Services"
              className="h-16 w-auto object-contain"
            />
          </div>

          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-100 text-[#7A1900] px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              Suburban Waste Services • Savage & Eden Prairie, MN
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Modernizing the SWS Customer Portal
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              Faster payments, happier residents, and 80% fewer billing phone calls.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2">
            <span className="bg-slate-100 border border-slate-200/80 px-4 py-2 rounded-xl">📍 Built for Local Minnesota Routes</span>
            <span className="bg-slate-100 border border-slate-200/80 px-4 py-2 rounded-xl">⚡ 100% Mobile & Apple Pay Ready</span>
          </div>
        </div>
      ),
    },

    // Slide 2: Enhancing Core Billing with a Modern Mobile Layer
    {
      id: "cost",
      category: "Strategic Architecture",
      title: "The Best of Both Worlds: Core ERP + 1-Tap Mobile",
      subtitle: "Keep your existing dispatch and billing engine. Add an effortless mobile checkout layer.",
      content: (
        <div className="grid grid-cols-3 gap-5 h-full items-center text-xs">
          {/* Core Billing Engine */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-3 h-[360px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-slate-700 bg-slate-200 px-3 py-1 rounded-full">
                Core Back-Office
              </span>
              <div className="text-xl font-black text-slate-900 mt-3">Heavy Operations</div>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Built for route logistics, daily driver dispatch sheets, commercial container inventory, and general ledger accounting.
              </p>
            </div>
            <div className="space-y-1.5 text-xs text-slate-700 border-t border-slate-200 pt-3">
              <div className="flex items-center gap-1.5">✓ <span>Route & driver fleet management</span></div>
              <div className="flex items-center gap-1.5">✓ <span>Core billing ledger & invoicing</span></div>
            </div>
          </div>

          {/* Plus: Modern Mobile Layer */}
          <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-3xl p-6 space-y-3 h-[360px] flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                + Modern Mobile Layer
              </span>
              <div className="text-xl font-black text-emerald-700 mt-3">1-Tap Customer UX</div>
              <p className="text-emerald-950 text-xs mt-2 leading-relaxed">
                A lightweight front-door designed specifically for smartphones, biometric Apple Pay, and automated curbside SMS.
              </p>
            </div>
            <div className="space-y-1.5 text-xs text-emerald-900 border-t border-emerald-200/60 pt-3">
              <div className="flex items-center gap-1.5">✓ <span>3-sec Apple & Google Pay checkout</span></div>
              <div className="flex items-center gap-1.5">✓ <span>1-click Calendar & SMS alerts</span></div>
            </div>
          </div>

          {/* SWS Net Impact */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-3 h-[360px] flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-black uppercase text-amber-400">
                Combined Impact
              </span>
              <div className="text-3xl font-black text-emerald-400 mt-3">80% Less Friction</div>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Faster quarterly cash collection, zero phone queues for Susie, and happier local residents across all routes.
              </p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-3 text-xs text-amber-300">
              🎯 <strong>Outcome:</strong> Maximizes the ROI of your back-office systems without software disruption.
            </div>
          </div>
        </div>
      ),
    },

    // Slide 3: Solving the "Last-Mile" Checkout Friction
    {
      id: "friction",
      category: "Customer Experience",
      title: "Eliminating the 'Last-Mile' Mobile Friction",
      subtitle: "Bridging the gap between back-office accounting and modern smartphone habits.",
      content: (
        <div className="grid grid-cols-3 gap-5 h-full items-center text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-3 h-[360px] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-base mt-3">Card Re-Enrollment</h4>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                During database transitions, getting 25k+ busy homeowners to manually re-enter cards takes months and triggers past-due shocks.
              </p>
            </div>
            <div className="text-xs text-amber-800 font-semibold bg-amber-50 p-2.5 rounded-xl border border-amber-200/60">
              Solution: 1-click SMS re-enroll
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-3 h-[360px] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-base mt-3">Mobile Passwords</h4>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Homeowners rarely remember portal passwords on phones, causing them to abandon payment or call the office at (952) 937-8900.
              </p>
            </div>
            <div className="text-xs text-blue-800 font-semibold bg-blue-50 p-2.5 rounded-xl border border-blue-200/60">
              Solution: Native FaceID & Apple Pay
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-3 h-[360px] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-base mt-3">Holiday Inquiries</h4>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Static PDF holiday calendars create 200+ phone call surges every Memorial Day, Labor Day, and Thanksgiving week.
              </p>
            </div>
            <div className="text-xs text-purple-800 font-semibold bg-purple-50 p-2.5 rounded-xl border border-purple-200/60">
              Solution: Automated calendar alerts
            </div>
          </div>
        </div>
      ),
    },

    // Slide 4: Zero-Password Identity & Modern Onboarding
    {
      id: "auth-identity",
      category: "Zero-Password Onboarding",
      title: "Zero Passwords. Zero PIN Codes. 1-Tap Auth.",
      subtitle: "Eliminating login friction with Sign in with Apple, Google SSO, and SMS magic links.",
      content: (
        <div className="grid grid-cols-3 gap-5 h-full items-center text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-3 h-[360px] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-lg">
                
              </div>
              <h4 className="font-bold text-slate-900 text-base mt-3">1-Tap Apple & Google SSO</h4>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Homeowners authenticate in 1 second using FaceID or Google Account. Instantly matches their verified email to their SWS utility account.
              </p>
            </div>
            <div className="text-xs text-slate-800 font-semibold bg-slate-100 p-2.5 rounded-xl border border-slate-200">
              ✓ Zero password creation or resets
            </div>
          </div>

          <div className="bg-purple-50/70 border border-purple-200 rounded-3xl p-6 space-y-3 h-[360px] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-purple-950 text-base mt-3">SMS Magic Link Token</h4>
              <p className="text-purple-900 text-xs mt-2 leading-relaxed">
                Enter mobile number $\rightarrow$ tap 1-time secure link or 4-digit text code $\rightarrow$ instant login. No passwords to remember every 90 days.
              </p>
            </div>
            <div className="text-xs text-purple-900 font-semibold bg-purple-100/80 p-2.5 rounded-xl border border-purple-200">
              ✓ 100% mobile-native convenience
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-6 space-y-3 h-[360px] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-blue-950 text-base mt-3">"Claim Address" Autocomplete</h4>
              <p className="text-blue-900 text-xs mt-2 leading-relaxed">
                New residents type their street address (e.g. 9842 Promontory Dr). System auto-matches the route record and verifies via SMS in 5 seconds.
              </p>
            </div>
            <div className="text-xs text-blue-900 font-semibold bg-blue-100/80 p-2.5 rounded-xl border border-blue-200">
              ✓ Zero looking up 8-digit paper PINs
            </div>
          </div>
        </div>
      ),
    },

    // Slide 5: The 4 Simple Solutions
    {
      id: "solutions",
      category: "The New SWS Experience",
      title: "The 4 Core Upgrades We Built",
      subtitle: "Designed to make payments instant and pickup days completely transparent.",
      content: (
        <div className="grid grid-cols-2 gap-5 h-full items-center text-xs">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-5 space-y-2 h-[175px] flex flex-col justify-center">
            <div className="flex items-center gap-2 font-bold text-emerald-950 text-base">
              <Zap className="w-5 h-5 text-emerald-600" />
              <span>1-Tap Apple & Google Pay</span>
            </div>
            <p className="text-emerald-900 text-xs leading-relaxed">
              Pay $126.93 in 3 seconds with FaceID. No typing 16-digit card numbers or hunting for passwords on smartphone screens.
            </p>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-5 space-y-2 h-[175px] flex flex-col justify-center">
            <div className="flex items-center gap-2 font-bold text-blue-950 text-base">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Paycheck-Aligned AutoPay</span>
            </div>
            <p className="text-blue-900 text-xs leading-relaxed">
              Customers pick their payment date (1st, 15th, or due date) with a 3-day advance reminder text to eliminate NSF declines.
            </p>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-5 space-y-2 h-[175px] flex flex-col justify-center">
            <div className="flex items-center gap-2 font-bold text-amber-950 text-base">
              <Truck className="w-5 h-5 text-amber-600" />
              <span>Smart Curbside & Holiday Explainer</span>
            </div>
            <p className="text-amber-900 text-xs leading-relaxed">
              Address-specific "Which bins go out tonight?" and plain-English explanations of holiday week +1 day schedule shifts.
            </p>
          </div>

          <div className="bg-purple-50/70 border border-purple-200 rounded-3xl p-5 space-y-2 h-[175px] flex flex-col justify-center">
            <div className="flex items-center gap-2 font-bold text-purple-950 text-base">
              <Smartphone className="w-5 h-5 text-purple-600" />
              <span>1-Click SMS Card Recovery</span>
            </div>
            <p className="text-purple-900 text-xs leading-relaxed">
              When a card expires, an automated text sends a 1-click FaceID recovery link—recovering 75% of balances in under 2 hours.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 6: Recurring Apple & Google Pay (Zero Expired Cards)
    {
      id: "recurring-apple-pay",
      category: "Solving Card Churn Forever",
      title: "Recurring Apple Pay: Zero Expired Card Declines",
      subtitle: "Why mobile merchant tokens eliminate 300 quarterly card failures and phone chases.",
      content: (
        <div className="grid grid-cols-3 gap-5 h-full items-center text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-3 h-[360px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-red-700 bg-red-100 px-3 py-1 rounded-full">
                The Legacy Problem
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-3">Physical Cards Expire</h4>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Bank cards expire every 2–3 years. When 300 cards decline on quarterly billing, SWS loses <strong>$38,000 in cash flow</strong> and Susie spends weeks chasing payments.
              </p>
            </div>
            <div className="text-xs text-red-900 font-semibold bg-red-50 p-2.5 rounded-xl border border-red-200">
              ⚠️ Involuntary churn & $38k past due
            </div>
          </div>

          <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-3xl p-6 space-y-3 h-[360px] flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                The Apple Pay Solution
              </span>
              <h4 className="font-bold text-emerald-950 text-base mt-3">Auto-Updating Tokens</h4>
              <p className="text-emerald-950 text-xs mt-2 leading-relaxed">
                Residents authorize once with FaceID. When their bank re-issues a physical card, <strong>Apple & Google auto-update the token in the background</strong>.
              </p>
            </div>
            <div className="text-xs text-emerald-950 font-bold bg-emerald-100 p-2.5 rounded-xl border border-emerald-300">
              ✓ Involuntary card declines drop to ~0%
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-3 h-[360px] flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-black uppercase text-amber-400">
                Quarterly Cash Impact
              </span>
              <div className="text-3xl font-black text-emerald-400 mt-3">+$35k Cash</div>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Quarterly balances settle on day one. Cash arrives in SWS's bank account with zero manual phone entry or paper collection letters.
              </p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-3 text-xs text-slate-200">
              💰 Direct cash acceleration on Form 1040 / GL
            </div>
          </div>
        </div>
      ),
    },

    // Slide 7: Marketing Super-Weapon (SWS vs Republic Services & WM)
    {
      id: "competitive-edge",
      category: "Customer Acquisition & Marketing",
      title: "How SWS Beats Republic Services & Waste Management",
      subtitle: "Combine hometown Minnesota service with a mobile experience 10x better than national conglomerates.",
      content: (
        <div className="grid grid-cols-2 gap-5 h-full items-center text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-2.5 h-[360px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-slate-700 bg-slate-200 px-3 py-1 rounded-full">
                The Neighborhood Pitch
              </span>
              <h4 className="font-black text-slate-900 text-sm mt-2">Win Eden Prairie & Savage Move-Ins</h4>
              <p className="text-slate-600 text-xs leading-relaxed mt-1">
                When new residents move in or HOAs bid master contracts, SWS advertises:
              </p>
              <div className="space-y-1.5 text-slate-700 text-xs mt-2">
                <div className="flex items-center gap-1.5 font-semibold">✓ <span>"Pay in 3 Seconds with FaceID"</span></div>
                <div className="flex items-center gap-1.5 font-semibold">✓ <span>"Night-Before Curbside Calendar Alerts"</span></div>
                <div className="flex items-center gap-1.5 font-semibold">✓ <span>"Local office answered on Ring 2 (No 1-800 queues)"</span></div>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-700 font-medium text-center">
              📬 Ready for door hangers, postcards & truck QR decals
            </div>
          </div>

          <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-3xl p-5 space-y-2.5 h-[360px] flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Head-to-Head Comparison
              </span>
              <h4 className="font-black text-emerald-950 text-sm mt-2">SWS vs National Giants</h4>
              <div className="space-y-2 text-xs mt-2 text-emerald-950">
                <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-200 flex justify-between">
                  <span>1-Tap Apple Pay Checkout:</span>
                  <strong className="text-emerald-700">SWS: YES • Republic: NO</strong>
                </div>
                <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-200 flex justify-between">
                  <span>Curbside Calendar Sync:</span>
                  <strong className="text-emerald-700">SWS: YES • WM: NO</strong>
                </div>
                <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-200 flex justify-between">
                  <span>Zero-Password Address Claim:</span>
                  <strong className="text-emerald-700">SWS: YES • Republic: NO</strong>
                </div>
              </div>
            </div>
            <div className="bg-emerald-900 text-white rounded-xl p-2.5 text-xs font-bold text-center">
              🏆 Unmatched competitive advantage in the Twin Cities
            </div>
          </div>
        </div>
      ),
    },

    // Slide 8: The "Founding Design Partner" Win-Win & Pricing
    {
      id: "founding-partner",
      category: "Commercial Partnership",
      title: "The SWS 'Founding Design Partner' Opportunity",
      subtitle: "A collaborative partnership: SWS gets custom software at a lifetime discount; we build the right tool.",
      content: (
        <div className="grid grid-cols-3 gap-4 h-full items-center text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-2.5 h-[360px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                1. Custom Tailored
              </span>
              <h4 className="font-black text-slate-900 text-base mt-2">Built for Your Team</h4>
              <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                Engineered directly around Susie's billing workflow, Navusoft integrations, and your Savage routes.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-2.5 text-xs text-blue-900 font-semibold text-center">
              ✓ Direct 1-on-1 local engineer support
            </div>
          </div>

          <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-3xl p-5 space-y-2.5 h-[360px] flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                2. Lifetime Discount
              </span>
              <h4 className="font-black text-emerald-950 text-base mt-2">60–75% Off for Life</h4>
              <p className="text-emerald-950 text-xs mt-1.5 leading-relaxed">
                As our founding partner, SWS locks in a <strong>\$500–\$750/mo rate</strong> (or 5% of recovered past-due cash with \$0 out of pocket).
              </p>
            </div>
            <div className="bg-emerald-900 text-white rounded-2xl p-2.5 text-xs font-bold text-center">
              💰 Guaranteed lifetime low rate
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-2.5 h-[360px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                3. Zero Financial Risk
              </span>
              <h4 className="font-black text-slate-900 text-base mt-2">30-Day Free Trial</h4>
              <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                Test the SMS past-due recovery on declined cards first. If you don't recover thousands in cash and cut phone calls, pay \$0.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-2.5 text-xs text-purple-900 font-semibold text-center">
              ✓ 100% risk-free verification
            </div>
          </div>
        </div>
      ),
    },

    // Slide 9: Call to Action & Interactive Prototype Demo
    {
      id: "demo",
      category: "Interactive Prototype",
      title: "Let's Test the Working Prototype",
      subtitle: "Experience 1-tap Apple Pay, holiday shift simulator, and SMS recovery live.",
      content: (
        <div className="flex flex-col items-center justify-center text-center h-full space-y-6 py-3">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Play className="w-8 h-8 fill-emerald-600 ml-1" />
          </div>

          <div className="space-y-2 max-w-lg">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Ready to test the live prototype?</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Test 1-tap Apple Pay, customize paycheck autopay dates, sync curbside schedules to phone calendars, and simulate SMS card recovery.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href="/"
              className="bg-[#7A1900] hover:bg-[#581200] text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl hover:shadow-2xl flex items-center gap-2.5 transition-all active:scale-95"
            >
              <span>Launch Live Customer Portal Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setCurrentSlide(0)}
              className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              Restart Presentation
            </button>
          </div>
        </div>
      ),
    },
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length]);

  const current = slides[currentSlide];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#7A1900] selection:text-white">
      {/* Top Header Bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-auto bg-white p-1 rounded-lg flex items-center justify-center shadow-md">
            <img
              src="/sws-logo.png"
              alt="SWS"
              className="h-6 w-auto object-contain"
            />
          </div>
          <div>
            <span className="font-black text-sm text-slate-200">Suburban Waste Services</span>
            <span className="text-xs text-slate-500 ml-2 hidden sm:inline">• Executive Presentation</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <Link
            href="/family-pitch"
            className="bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/80 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors text-xs"
          >
            <span>🏡 Family & Tax Deck</span>
          </Link>
          <span className="font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-bold">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <Link
            href="/"
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-xs"
          >
            <span>Live Portal Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Presentation Stage: Majestic Locked 1100x620 Widescreen Canvas */}
      <div className="w-full flex items-center justify-center my-auto py-2">
        <main className="w-[1100px] h-[620px] max-w-full bg-white rounded-[32px] shadow-2xl border border-slate-800 text-slate-900 flex flex-col justify-between overflow-hidden relative flex-shrink-0">
          
          {/* Top Slide Header */}
          <div className="p-8 pb-4 border-b border-slate-100 flex items-start justify-between flex-shrink-0">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#7A1900] bg-red-50 px-3 py-1 rounded-full">
                {current.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {current.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{current.subtitle}</p>
            </div>

            <div className="text-right">
              <span className="text-sm font-mono font-bold text-slate-400">
                0{currentSlide + 1} / 0{slides.length}
              </span>
            </div>
          </div>

          {/* Slide Body Stage: Rigidly Locked 420px Height (Zero resizing or jumping) */}
          <div className="px-8 py-3 h-[420px] max-h-[420px] overflow-hidden flex flex-col justify-center">
            {current.content}
          </div>

          {/* Slide Footer Navigation */}
          <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between flex-shrink-0 text-xs">
            <button
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-30 flex items-center gap-1.5 transition-colors text-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === idx ? "w-8 bg-[#7A1900]" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {currentSlide < slides.length - 1 ? (
              <button
                onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl font-bold bg-[#7A1900] hover:bg-[#581200] text-white flex items-center gap-1.5 transition-all shadow-md active:scale-95 text-xs"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl font-black bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-all shadow-lg active:scale-95 text-xs"
              >
                <span>Launch Live Portal ➔</span>
              </Link>
            )}
          </div>
        </main>
      </div>

      {/* Bottom Hint */}
      <footer className="text-center text-xs text-slate-500 pt-2 flex items-center justify-center gap-4">
        <span>Tip: Press <kbd className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">Space</kbd> or <kbd className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">→</kbd> to advance.</span>
        <span>•</span>
        <Link href="/family-pitch" className="text-emerald-400 hover:text-emerald-300 underline font-medium">
          Switch to Family Venture & Tax Shield Presentation
        </Link>
      </footer>
    </div>
  );
}
