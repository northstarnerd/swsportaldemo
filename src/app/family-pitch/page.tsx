"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  ArrowRight,
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
  Clock,
  Briefcase,
  Layers,
  CheckCircle2,
  AlertCircle,
  PiggyBank,
  TrendingUp,
  Percent,
  Sliders,
  Scale,
  Award,
  Fingerprint,
  GraduationCap,
  Bus,
  Stethoscope,
  Activity,
  Building2,
} from "lucide-react";

export default function FamilyPitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // State for interactive income & tax calculator
  const [scenario, setScenario] = useState<"conservative" | "target" | "scale">("target");
  const [hardwareExpense, setHardwareExpense] = useState(7500);
  const [homeOfficeExpense, setHomeOfficeExpense] = useState(5500);
  const [softwareDevExpense, setSoftwareDevExpense] = useState(2500);
  const [mileageTravelExpense, setMileageTravelExpense] = useState(2000);
  const [marginalTaxRate, setMarginalTaxRate] = useState(46.0); // 37% Fed + 9.85% MN - standard high W2 bracket

  const totalDeductions = hardwareExpense + homeOfficeExpense + softwareDevExpense + mileageTravelExpense;
  const directTaxRefundSavings = Math.round((totalDeductions * (marginalTaxRate / 100)));

  const slides = [
    // Slide 1: Title & Executive Overview
    {
      id: "title",
      category: "Family Strategic Proposal",
      title: "Waste Tech Venture: Opportunity, Effort & Tax Strategy",
      subtitle: "Evaluating a low-risk, high-margin B2B SaaS venture with immediate W-2 tax offset benefits.",
      content: (
        <div className="flex flex-col items-center justify-center text-center h-full space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#7A1900] to-[#9E2A0D] flex items-center justify-center text-white shadow-xl shadow-red-950/20">
              <Truck className="w-8 h-8" />
            </div>
            <span className="text-2xl font-black text-slate-300">+</span>
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-xl shadow-emerald-950/20">
              <PiggyBank className="w-8 h-8" />
            </div>
          </div>

          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-100 text-[#7A1900] px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              🏡 Family Decision Proposal • August 2026
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Should We Pursue the SWS Waste SaaS Venture?
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              A transparent breakdown of market demand, time commitments (5–8 hrs/wk), income potential ($24k–$300k+), and active tax shielding for high physician W-2 income.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full max-w-3xl pt-1 text-left text-xs">
            <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-2xl">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Time Budget</span>
              </div>
              <p className="text-slate-600 text-xs mt-1">5–8 hrs/week capped; no weekend fire drills</p>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-2xl">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Upside Potential</span>
              </div>
              <p className="text-slate-600 text-xs mt-1">$24k–$88k ARR locally, 90%+ gross margin</p>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-2xl">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Physician Tax Shield</span>
              </div>
              <p className="text-slate-600 text-xs mt-1">Active business offsets high W-2 marginal tax</p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 2: Market Pain & The "Hidden Monopoly"
    {
      id: "market",
      category: "The Market Opportunity",
      title: "Why Waste Hauling? The Hidden Recession-Proof Utility",
      subtitle: "Independent haulers run multi-million dollar fleets on 20-year-old software.",
      content: (
        <div className="grid grid-cols-3 gap-4 h-full items-center text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-2.5 h-[360px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                The Monopoly Wedge
              </span>
              <h4 className="font-black text-slate-900 text-base mt-2.5">Suburban Waste (SWS)</h4>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Right in our backyard (Savage/Eden Prairie). 53 commercial trucks, 25,000–45,000 residential homes, and a fantastic local reputation.
              </p>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-3 text-xs space-y-1 text-slate-700">
              <div className="font-bold text-slate-900">Immediate Customer:</div>
              <div>• We are existing customers</div>
              <div>• Direct relationship with leadership</div>
            </div>
          </div>

          <div className="bg-red-50/60 border border-red-200 rounded-3xl p-5 space-y-2.5 h-[360px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-red-800 bg-red-100 px-3 py-1 rounded-full">
                Their Pain Points
              </span>
              <h4 className="font-black text-slate-900 text-base mt-2.5">Legacy ERP Clunkiness</h4>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Their Navusoft portal is confusing on phones, takes 60 days to recover expired credit cards ($40k+ stuck in A/R), and floods office manager Susie with 200+ phone calls a day.
              </p>
            </div>
            <div className="bg-white border border-red-200/80 rounded-2xl p-3 text-xs space-y-1 text-red-900">
              <div className="font-bold">Real Bottlenecks:</div>
              <div>• $40k+ overdue unpaid cards</div>
              <div>• 200+ phone calls per holiday week</div>
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-5 space-y-2.5 h-[360px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Our Solution
              </span>
              <h4 className="font-black text-emerald-950 text-base mt-2.5">Lightweight Mobile Front</h4>
              <p className="text-emerald-900 text-xs mt-2 leading-relaxed">
                We don't replace their system; we add a sleek 1-tap Apple Pay layer and automated SMS card recovery. SWS recovers cash in 2 hours with zero phone calls.
              </p>
            </div>
            <div className="bg-emerald-900 text-white rounded-2xl p-3 text-xs space-y-1">
              <div className="font-bold text-amber-300">National Scale:</div>
              <div>• 10,000+ independent haulers in US</div>
              <div>• Turnkey white-label in &lt; 2 hours</div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 3: What's Already Built (POC Showcase)
    {
      id: "poc",
      category: "De-Risked Execution",
      title: "We Aren't Starting from Scratch: Working POC is Live",
      subtitle: "The entire core product and customer portal are already engineered and testable.",
      content: (
        <div className="grid grid-cols-2 gap-4 h-full items-center text-xs">
          <div className="space-y-2.5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-0.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>1-Tap Apple & Google Pay Checkout</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Biometric FaceID settling $126.93 bills in 3 seconds. Eliminates 16-digit card typing on phones.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-0.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                <Fingerprint className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero-Password SSO & Smart Address Lookup</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Sign in with Apple/Google or claim home by street address. Zero forgotten passwords or PINs.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-0.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                <Smartphone className="w-3.5 h-3.5 text-purple-600" />
                <span>Automated SMS Magic Link Card Recovery</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                When a card declines, an automated text link lets the homeowner update with Apple Pay in 2 seconds.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-0.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>Curbside Calendar Sync & Holiday Shift Engine</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Syncs alternating recycling schedules to phone calendars and explains +1 day holiday shifts clearly.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 h-full flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Production Prototype Complete</span>
              </div>
              <h3 className="text-xl font-black text-white">Zero Technical Discovery Risk</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                The prototype is fully interactive, responsive across all devices, integrated with .ics calendar generators, and ready to demonstrate live.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <Link
                href="/"
                target="_blank"
                className="bg-white hover:bg-slate-100 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-transform active:scale-95"
              >
                <span>Test Live Customer Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <span className="text-xs text-slate-400">Opens in new tab</span>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 4: Time Commitment & Family Guardrails
    {
      id: "effort",
      category: "Family Life & Balance",
      title: "Time Commitment & Strict Family Guardrails",
      subtitle: "How we protect family time, marriage, and work-life balance while building.",
      content: (
        <div className="grid grid-cols-3 gap-4 h-full items-center text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-2.5 h-[360px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                  Phase 1: Pilot
                </span>
                <span className="font-mono font-bold text-slate-500 text-xs">Weeks 1–4</span>
              </div>
              <div className="text-3xl font-black text-slate-900 mt-3">5–8 hrs/wk</div>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Configuring the SWS past-due pilot, setting up webhooks, and monitoring SMS recovery conversions.
              </p>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-3 text-xs text-slate-600">
              ⏰ <strong>Schedule:</strong> 8:30–9:45 PM on weekdays or 2 hrs on Sunday afternoon. Zero family dinner conflicts.
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-2.5 h-[360px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Phase 2: Steady
                </span>
                <span className="font-mono font-bold text-slate-500 text-xs">Months 2–6</span>
              </div>
              <div className="text-3xl font-black text-emerald-600 mt-3">3–5 hrs/wk</div>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                System runs autonomously on cloud infrastructure. Only weekly telemetry checks and monthly reporting to SWS.
              </p>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-3 text-xs text-slate-600">
              🤖 <strong>Automation:</strong> Serverless cloud & automated Stripe alerts handle 99% of daily work.
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-5 space-y-2.5 h-[360px] flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-black uppercase text-amber-400 bg-slate-800 px-3 py-1 rounded-full">
                Strict Guardrails
              </span>
              <h4 className="font-black text-white text-base mt-3">Our 3 Golden Rules</h4>
              <div className="space-y-2 text-xs text-slate-300 mt-2">
                <div className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">1.</span>
                  <span><strong>No Weekend Emergency Firefights:</strong> Built on 99.99% uptime managed cloud.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">2.</span>
                  <span><strong>Hard 30-Day Checkpoint:</strong> If it causes stress, we walk away immediately.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">3.</span>
                  <span><strong>Family Comes First:</strong> No travel or disruptions to family routines.</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 text-amber-300 rounded-2xl p-2.5 text-xs font-semibold text-center">
              ✓ Low-stress, bounded commitment
            </div>
          </div>
        </div>
      ),
    },

    // Slide 5: Revenue & Financial Projections
    {
      id: "revenue",
      category: "Financial Potential",
      title: "Revenue Models & Scalable Software Economics",
      subtitle: "Software economics with 92%–96% pre-tax margins and recurring monthly contracts.",
      content: (
        <div className="flex flex-col h-full justify-between text-xs space-y-3">
          {/* Scenario Selector */}
          <div className="flex items-center justify-center gap-3 bg-slate-100 p-1.5 rounded-2xl max-w-md mx-auto">
            <button
              onClick={() => setScenario("conservative")}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all text-xs ${
                scenario === "conservative"
                  ? "bg-[#7A1900] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              1. SWS Only
            </button>
            <button
              onClick={() => setScenario("target")}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all text-xs ${
                scenario === "target"
                  ? "bg-[#7A1900] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              2. Target (3 Haulers)
            </button>
            <button
              onClick={() => setScenario("scale")}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all text-xs ${
                scenario === "scale"
                  ? "bg-[#7A1900] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              3. Scale (10 Haulers)
            </button>
          </div>

          {/* Cards for chosen scenario */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 text-center flex flex-col justify-center space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">Gross Annual Revenue</span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900">
                {scenario === "conservative" ? "$24,000" : scenario === "target" ? "$87,600" : "$318,000"}
              </div>
              <span className="text-xs text-slate-500">
                {scenario === "conservative"
                  ? "$2,000/mo ($1.5k SaaS + $500 recovery)"
                  : scenario === "target"
                  ? "$7,300/mo across 3 local haulers"
                  : "$26,500/mo across 10 regional haulers"}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 text-center flex flex-col justify-center space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">Annual Operating Costs</span>
              <div className="text-3xl sm:text-4xl font-black text-red-600">
                {scenario === "conservative" ? "$1,800" : scenario === "target" ? "$4,200" : "$12,000"}
              </div>
              <span className="text-xs text-slate-500">Cloud hosting, Twilio SMS ($0.0079), Apple Dev</span>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 text-center flex flex-col justify-center space-y-1 shadow-sm">
              <span className="text-xs font-black text-emerald-800 uppercase">Net Annual Cash Flow</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-700">
                {scenario === "conservative" ? "$22,200" : scenario === "target" ? "$83,400" : "$306,000"}
              </div>
              <span className="text-xs font-bold text-emerald-900">
                {scenario === "conservative" ? "92.5% Gross Margin" : scenario === "target" ? "95.2% Gross Margin" : "96.2% Gross Margin"}
              </span>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-200 p-3 rounded-2xl flex items-center justify-between text-xs">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span><strong>Why Margins are 90%+:</strong> Pure software infrastructure requires zero inventory, physical trucks, or warehouse leases.</span>
            </span>
            <span className="text-amber-400 font-mono font-bold">100% Digital Delivery</span>
          </div>
        </div>
      ),
    },

    // Slide 6: The Physician Tax Shield (The W-2 Dilemma)
    {
      id: "physician-tax-shield",
      category: "High W-2 Tax Optimization",
      title: "The Physician Tax Shield: Turning Expenses into Tax Refunds",
      subtitle: "How an active pass-through business directly reduces our high marginal tax burden.",
      content: (
        <div className="grid grid-cols-2 gap-5 h-full items-center text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4 h-[360px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-red-800 bg-red-100 px-3 py-1 rounded-full">
                The High W-2 Dilemma
              </span>
              <h4 className="font-black text-slate-900 text-lg mt-3">Heavy Tax Drag on Physician Salary</h4>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Physician W-2 salaries are hit by the highest tax brackets with virtually zero allowable write-offs or deductions:
              </p>
            </div>

            <div className="space-y-2 bg-white border border-slate-200/80 p-3.5 rounded-2xl font-mono text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Top Federal Bracket:</span>
                <span className="font-bold text-red-600">35.0% – 37.0%</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Minnesota State Income Tax:</span>
                <span className="font-bold text-red-600">9.85%</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Medicare & Surtax:</span>
                <span className="font-bold text-red-600">2.35% – 3.8%</span>
              </div>
              <div className="border-t border-slate-200 pt-1.5 flex justify-between font-bold text-slate-900">
                <span>Combined Marginal Tax Rate:</span>
                <span className="text-red-700">~ 46.0% – 47.5%</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic">
              *Every incremental dollar earned on W-2 loses ~46¢ straight to federal and state taxes.
            </p>
          </div>

          <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-3xl p-6 space-y-4 h-[360px] flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                The Active Business Remedy
              </span>
              <h4 className="font-black text-emerald-950 text-lg mt-3">IRC §469 Material Participation</h4>
              <p className="text-emerald-900 text-xs mt-2 leading-relaxed">
                Because Patrick <strong>materially participates</strong> (active software development), legitimate business expenses and start-up deductions flow through our joint tax return (Form 1040) and <strong>directly offset our W-2 income</strong>!
              </p>
            </div>

            <div className="bg-white/90 border border-emerald-200 p-4 rounded-2xl space-y-2 text-xs">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>The 46% Government Co-Pay:</span>
              </div>
              <p className="text-emerald-900 text-xs leading-relaxed">
                A $10,000 legitimate business expense (MacBook, home office, mobile testing, servers) reduces our tax bill by <strong>~$4,600</strong> in real cash savings.
              </p>
            </div>

            <div className="bg-emerald-900 text-white p-3 rounded-2xl text-xs font-bold text-center">
              💡 Business equipment & R&D are effectively 46% off!
            </div>
          </div>
        </div>
      ),
    },

    // Slide 7: Deductions & Wealth Creation Deep Dive
    {
      id: "tax-strategies",
      category: "Tax Strategies Playbook",
      title: "The 4 Main Pillars of Our Tax Shelter Strategy",
      subtitle: "Four proven tax code mechanisms to protect household cash and build wealth.",
      content: (
        <div className="grid grid-cols-2 gap-4 h-full items-center text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4.5 space-y-2 h-[175px] flex flex-col justify-center">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Award className="w-4 h-4 text-blue-600" />
              <span>1. Section 179 Equipment Expensing</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              100% first-year write-off for MacBooks, 4K monitors, mobile test devices (iOS/Android for Apple Pay testing), and home server networking. (~$7,500 deduction = <strong>~$3,450 tax savings</strong>).
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4.5 space-y-2 h-[175px] flex flex-col justify-center">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Briefcase className="w-4 h-4 text-purple-600" />
              <span>2. Dedicated Home Office (IRC §280A)</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Deducts a proportional share of home mortgage interest, property taxes, utilities, and 100% of gigabit fiber internet and business mobile plans. (~$5,500/yr deduction = <strong>~$2,530 tax savings</strong>).
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4.5 space-y-2 h-[175px] flex flex-col justify-center">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <PiggyBank className="w-4 h-4 text-emerald-600" />
              <span>3. Solo 401(k) Super-Stacking</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Hospital 403(b) caps employee contributions ($23k). Our side business lets us contribute up to <strong>25% of net business profits</strong> into a Solo 401(k) / Mega-Backdoor Roth on top of hospital limits!
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4.5 space-y-2 h-[175px] flex flex-col justify-center">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Percent className="w-4 h-4 text-amber-600" />
              <span>4. Section 199A QBI (20% Tax-Free Profit)</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              When the SaaS generates profit, up to 20% of net pass-through income is <strong>completely free from federal income tax</strong> under the Tax Cuts and Jobs Act QBI deduction.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 8: Interactive Tax Shield Calculator
    {
      id: "calculator",
      category: "Interactive Tax Modeler",
      title: "Interactive Year 1 Tax Shield Calculator",
      subtitle: "See the exact cash refund generated by legitimate business expenses against our joint W-2 bracket.",
      content: (
        <div className="grid grid-cols-2 gap-5 h-full items-center text-xs">
          {/* Sliders Area */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-3.5">
            <div className="font-bold text-slate-900 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#7A1900]" />
                <span>Business Expense Allocations</span>
              </span>
              <span className="text-xs text-slate-500 font-normal">Adjust values:</span>
            </div>

            {/* Hardware */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">§179 Tech Gear & Devices:</span>
                <span className="font-mono font-bold text-slate-900">${hardwareExpense.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={15000}
                step={500}
                value={hardwareExpense}
                onChange={(e) => setHardwareExpense(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#7A1900]"
              />
            </div>

            {/* Home Office & Telecom */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Home Office & Fiber Internet:</span>
                <span className="font-mono font-bold text-slate-900">${homeOfficeExpense.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={10000}
                step={500}
                value={homeOfficeExpense}
                onChange={(e) => setHomeOfficeExpense(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#7A1900]"
              />
            </div>

            {/* Software Dev & Cloud */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Software Tools, Cloud & Legal:</span>
                <span className="font-mono font-bold text-slate-900">${softwareDevExpense.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={6000}
                step={500}
                value={softwareDevExpense}
                onChange={(e) => setSoftwareDevExpense(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#7A1900]"
              />
            </div>

            {/* Mileage & Client Visits */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Business Mileage & Client Meetings:</span>
                <span className="font-mono font-bold text-slate-900">${mileageTravelExpense.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={500}
                max={5000}
                step={500}
                value={mileageTravelExpense}
                onChange={(e) => setMileageTravelExpense(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#7A1900]"
              />
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 h-[360px] flex flex-col justify-between shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
                  Tax Shelter Results
                </span>
                <span className="text-slate-400 font-mono text-xs">@ {marginalTaxRate}% Fed+MN</span>
              </div>

              <div className="pt-2">
                <span className="text-slate-400 text-xs">Total Active Business Deductions:</span>
                <div className="text-2xl font-black text-white font-mono">${totalDeductions.toLocaleString()}</div>
              </div>
            </div>

            <div className="bg-emerald-950/70 border border-emerald-500/30 rounded-2xl p-4 text-center space-y-1">
              <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
                Direct Tax Refund / Savings
              </span>
              <div className="text-4xl font-black text-emerald-400 font-mono">
                +${directTaxRefundSavings.toLocaleString()}
              </div>
              <span className="text-xs text-emerald-200 block">
                Cash returned to our household on Form 1040
              </span>
            </div>

            <div className="text-xs text-slate-400 text-center">
              🎯 <em>Even with zero revenue in month 1, we still save ~${directTaxRefundSavings.toLocaleString()} on taxes.</em>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 9: De-Risking the Navusoft Factor (APIs, Contracts & Budget)
    {
      id: "navusoft-derisking",
      category: "Technical & Partner Due Diligence",
      title: "What If SWS Is Locked into an Uncancelable Contract?",
      subtitle: "Why an uncancelable add-on contract still doesn't stop this deal from generating cash.",
      content: (
        <div className="grid grid-cols-3 gap-4 h-full items-center text-xs">
          {/* Pillar 1: Sunk Cost vs Bleeding */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-2.5 h-[360px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                1. Sunk Cost vs Bleeding
              </span>
              <h4 className="font-black text-slate-900 text-base mt-2.5">ROI Beats Sunk Costs</h4>
              <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                Even if SWS pays Navusoft $1,000/mo for their portal, that portal is actively bleeding SWS:
              </p>
              <div className="space-y-1 text-slate-700 text-xs mt-2 bg-white p-2.5 rounded-xl border border-slate-200">
                <div>• <strong>-$38,000/qtr</strong> in unpaid failed cards</div>
                <div>• <strong>-$1,500/mo</strong> in office phone overtime</div>
                <div>• <strong>-$900/mo</strong> in missed bin truck re-routes</div>
              </div>
            </div>
            <div className="bg-blue-50 text-blue-900 p-2.5 rounded-xl text-xs font-semibold text-center border border-blue-200">
              💡 Stopping a $15k/mo bleed justifies a $1.5k fee
            </div>
          </div>

          {/* Pillar 2: The Pure Performance Model */}
          <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-3xl p-5 space-y-2.5 h-[360px] flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                2. The "Checkmate" Offer
              </span>
              <h4 className="font-black text-emerald-950 text-base mt-2.5">100% Performance-Based</h4>
              <p className="text-emerald-900 text-xs mt-1.5 leading-relaxed">
                If SWS has zero budget for a new SaaS fee, we propose a pure revenue share:
              </p>
              <div className="bg-white/90 border border-emerald-200 p-2.5 rounded-xl text-xs text-emerald-950 mt-2 space-y-1">
                <div>• <strong>SWS pays 5% of recovered cash only.</strong></div>
                <div>• We recover $35,000 $\rightarrow$ SWS gets <strong>+$33,250 net new cash</strong> and pays us $1,750.</div>
                <div>• <strong>Net cost to SWS budget: $0.00.</strong></div>
              </div>
            </div>
            <div className="bg-emerald-900 text-white rounded-2xl p-2.5 text-xs font-bold text-center">
              ✓ Impossible for Paul to say no to free cash
            </div>
          </div>

          {/* Pillar 3: Pure SMS & Calendar Wedge */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-2.5 h-[360px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                3. The Non-Overlapping Wedge
              </span>
              <h4 className="font-black text-slate-900 text-base mt-2.5">Features Navusoft Lacks</h4>
              <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                SWS keeps Navusoft for desktop logins and pays us strictly for the two features Navusoft does not have:
              </p>
              <div className="space-y-1 text-slate-700 text-xs mt-2">
                <div>1. <strong>1-Click SMS Card Recovery:</strong> Instant FaceID dunning texts.</div>
                <div>2. <strong>Curbside Calendar Sync:</strong> Night-before bin alerts on phone calendars.</div>
              </div>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-2.5 text-xs text-purple-900 font-semibold text-center">
              ✓ Zero software duplication overlap
            </div>
          </div>
        </div>
      ),
    },

    // Slide 10: Risk vs. Reward Matrix
    {
      id: "risk-reward",
      category: "Downside Protection",
      title: "Asymmetric Upside: Why This is a High-Reward, Low-Risk Bet",
      subtitle: "Near zero downside exposure with substantial recurring income upside.",
      content: (
        <div className="grid grid-cols-2 gap-5 h-full items-center text-xs">
          {/* Downside Risks (Near Zero) */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-3 h-[360px] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-black uppercase">
                Downside Protection (The Floor)
              </div>
              <h4 className="font-black text-slate-900 text-base mt-2.5">What is the Worst Case?</h4>
              <div className="space-y-2 text-slate-600 text-xs mt-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Capital Risk: &lt;$500 out-of-pocket.</strong> No physical leases, franchise fees, inventory, or debt.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Payment Liability: $0.</strong> Stripe handles all PCI-DSS compliance; no credit card data ever touches our server.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Walk-Away Option:</strong> If SWS declines after 30 days, we keep all software IP and harvest tax deductions.</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 text-slate-700 p-2.5 rounded-2xl text-xs font-semibold text-center">
              🛡️ Maximum financial loss: ~$500 (with tax offsets)
            </div>
          </div>

          {/* Upside Potential (The Ceiling) */}
          <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-3xl p-5 space-y-3 h-[360px] flex flex-col justify-between shadow-sm">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-black uppercase">
                Upside Potential (The Ceiling)
              </div>
              <h4 className="font-black text-emerald-950 text-base mt-2.5">What is the Best Case?</h4>
              <div className="space-y-2 text-emerald-950 text-xs mt-3">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Anchor Client Signed:</strong> SWS pays $18k–$30k/yr recurring revenue right in our hometown.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Regional Monopoly:</strong> Expand to 5–10 haulers across MN/Midwest for $100k–$300k+ ARR.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Wealth & Tax Supercharge:</strong> Solo 401(k) super-stacking + 20% tax-free QBI income.</span>
                </div>
              </div>
            </div>
            <div className="bg-emerald-800 text-white p-2.5 rounded-2xl text-xs font-bold text-center">
              🚀 High-margin recurring cash stream for family wealth
            </div>
          </div>
        </div>
      ),
    },

    // Slide 10: 12-Month Execution Roadmap
    {
      id: "roadmap",
      category: "Step-by-Step Plan",
      title: "12-Month Execution Roadmap & Milestones",
      subtitle: "Phased rollout prioritizing fast proof, minimal stress, and scalable systems.",
      content: (
        <div className="grid grid-cols-4 gap-3.5 h-full items-center text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 h-[350px] flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-xl bg-[#7A1900] text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h5 className="font-black text-slate-900 text-sm mt-2">30-Day Pilot</h5>
              <span className="text-xs font-mono text-slate-500 block">Weeks 1–4</span>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Pitch SWS on zero-risk past-due card recovery pilot. Target: recover $30k+ for SWS with zero software disruption.
              </p>
            </div>
            <div className="text-xs bg-red-50 text-red-900 p-2.5 rounded-xl font-medium">
              🎯 SWS sign-off on 30-day trial
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 h-[350px] flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h5 className="font-black text-slate-900 text-sm mt-2">Full SWS Rollout</h5>
              <span className="text-xs font-mono text-slate-500 block">Months 2–4</span>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Deploy 1-tap Apple Pay and curbside calendar across all 25k–45k homes. Sign formal $1.5k–$2.5k/mo contract.
              </p>
            </div>
            <div className="text-xs bg-blue-50 text-blue-900 p-2.5 rounded-xl font-medium">
              🎯 First recurring SaaS check
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 h-[350px] flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h5 className="font-black text-slate-900 text-sm mt-2">Case Study & IP</h5>
              <span className="text-xs font-mono text-slate-500 block">Months 5–7</span>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Document 80% phone call reduction and $40k cash recovery in a visual case study. Package turnkey white-label system.
              </p>
            </div>
            <div className="text-xs bg-purple-50 text-purple-900 p-2.5 rounded-xl font-medium">
              🎯 Proven industry playbook
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 space-y-2 h-[350px] flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h5 className="font-black text-emerald-950 text-sm mt-2">Regional Scale</h5>
              <span className="text-xs font-mono text-emerald-700 block">Months 8–12</span>
              <p className="text-emerald-900 text-xs mt-2 leading-relaxed">
                Onboard 3–5 neighboring independent haulers (DSI, Dick's, etc.). Scale ARR to $80k–$150k+ with automated operations.
              </p>
            </div>
            <div className="text-xs bg-emerald-200 text-emerald-900 p-2.5 rounded-xl font-bold">
              🎯 $100k+ recurring ARR
            </div>
          </div>
        </div>
      ),
    },

    // Slide 11: The Family Agreement & Go/No-Go Decision Gate
    {
      id: "decision-gate",
      category: "The Go / No-Go Decision",
      title: "The Proposed 30-Day Family Agreement",
      subtitle: "A clear, low-pressure decision framework to test the waters with full family alignment.",
      content: (
        <div className="flex flex-col items-center justify-center text-center h-full space-y-5 py-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7A1900] to-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
            <HeartHandshake className="w-7 h-7" />
          </div>

          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Our 30-Day Alignment Agreement</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We commit to a <strong>strict 30-day trial window</strong>. Patrick pitches SWS leadership for a zero-risk past-due pilot with a hard cap of 8 hours/week.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl text-left text-xs">
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl space-y-1">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Green Light (If SWS is Excited):</span>
              </div>
              <p className="text-emerald-900 text-xs leading-relaxed">
                We establish our LLC entity, lock in $18k–$30k/yr recurring revenue, and activate our active W-2 physician tax shield with our CPA.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-slate-500" />
                <span>Graceful Exit (If SWS Passes):</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                We pull the plug immediately. Zero ongoing stress, all software code is preserved, and we take our R&D equipment deductions on taxes.
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href="/"
              className="bg-[#7A1900] hover:bg-[#581200] text-white px-7 py-3 rounded-xl font-black text-xs shadow-lg flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Explore Live Prototype Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pitch"
              className="bg-slate-900 hover:bg-slate-800 text-slate-200 px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all"
            >
              <span>View SWS Executive Deck</span>
            </Link>
          </div>
        </div>
      ),
    },

    // Slide 12: Appendix - School Bus & Adjacent Verticals Expansion
    {
      id: "appendix-expansion",
      category: "Appendix: Expansion Verticals",
      title: "Adjacent Market: School Bus Tracking & Parent Alerts",
      subtitle: "Reusing 90%+ of our route notification & calendar engine for K-12 school transit.",
      content: (
        <div className="grid grid-cols-3 gap-4 h-full items-center text-xs">
          {/* Column 1: The School Bus Problem */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-3 h-[360px] flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-amber-700 bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                <Bus className="w-3.5 h-3.5" />
                <span>The Pain Point</span>
              </span>
              <div className="text-lg font-black text-slate-900">"Where's the Bus?" Panic</div>
              <p className="text-slate-600 text-xs leading-relaxed">
                School front desks get flooded with frantic morning phone calls when buses run late in traffic or snow. Legacy district dispatch tools have clunky, outdated parent portals (1.5-star App Store ratings).
              </p>
            </div>
            <div className="space-y-1 text-xs text-slate-700 border-t border-slate-200 pt-3">
              <div className="flex items-center gap-1.5 text-red-600">✗ <span>80+ panic calls per school morning</span></div>
              <div className="flex items-center gap-1.5 text-red-600">✗ <span>Kids waiting in sub-zero weather</span></div>
            </div>
          </div>

          {/* Column 2: The Modern Overlay Solution */}
          <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-3xl p-5 space-y-3 h-[360px] flex flex-col justify-between shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                <Zap className="w-3.5 h-3.5" />
                <span>Our Solution</span>
              </span>
              <div className="text-lg font-black text-emerald-900">Instant Geofenced Alerts</div>
              <p className="text-emerald-950 text-xs leading-relaxed">
                Parents receive SMS alerts (*"Bus #14 is 3 stops away (~5 min)"*), 1-tap "Not riding today" no-show logging, and automated `.ics` calendar sync for 2-hr weather delays and late-start days.
              </p>
            </div>
            <div className="space-y-1 text-xs text-emerald-950 border-t border-emerald-200 pt-3">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">✓ <span>No App Store passwords required</span></div>
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">✓ <span>Dynamic late-start calendar sync</span></div>
            </div>
          </div>

          {/* Column 3: Business Model & Go-to-Market */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-3 h-[360px] flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-blue-700 bg-blue-100 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Go-to-Market</span>
              </span>
              <div className="text-lg font-black text-slate-900">Private & Fleet Entry</div>
              <p className="text-slate-600 text-xs leading-relaxed">
                <strong>Beachhead:</strong> Private/independent schools (fast sales, no RFP bureaucracy) & contracted bus fleet operators. Plus courtesy busing & field trip micro-payments via Apple Pay.
              </p>
            </div>
            <div className="bg-slate-900 text-slate-200 p-2.5 rounded-2xl text-xs font-medium space-y-1">
              <div className="text-amber-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>90%+ Code Reuse</span>
              </div>
              <p className="text-xs text-slate-400">Same PWA UI, Twilio SMS engine, and Stripe/Apple Pay stack.</p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 13: Medical & Dental Practice Expansion (Pediatrics, Maxillofacial Surgery, Private Clinics)
    {
      id: "appendix-medical-expansion",
      category: "High-Margin Expansion: Healthcare",
      title: "Private Medical & Dental: 1-Tap Patient Balance Quick Pay",
      subtitle: "Eliminating paper statements, guarantor PINs, and portal password friction for clinics.",
      content: (
        <div className="grid grid-cols-3 gap-4 h-full items-center text-xs">
          {/* Column 1: The Patient Billing Disaster */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-3 h-[360px] flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-rose-700 bg-rose-100 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>The Patient Pain Point</span>
              </span>
              <div className="text-lg font-black text-slate-900">The Paper Statement Black Hole</div>
              <p className="text-slate-600 text-xs leading-relaxed">
                After insurance pays, clinics (e.g. Southdale Pediatrics, dental & maxillofacial centers) mail paper bills with confusing "Guarantor #", "Web ID", and 8-digit codes. Patients lose the paper or abandon clunky patient portal logins.
              </p>
            </div>
            <div className="space-y-1 text-xs text-slate-700 border-t border-slate-200 pt-3">
              <div className="flex items-center gap-1.5 text-rose-600 font-semibold">✗ <span>60%+ of $30–$250 bills hit 90-day aging</span></div>
              <div className="flex items-center gap-1.5 text-rose-600 font-semibold">✗ <span>$1.50/statement + endless office phone tag</span></div>
            </div>
          </div>

          {/* Column 2: The 1-Tap MedPay Solution */}
          <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-3xl p-5 space-y-3 h-[360px] flex flex-col justify-between shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>1-Tap MedPay Solution</span>
              </span>
              <div className="text-lg font-black text-emerald-900">SMS + FaceID Apple Pay</div>
              <p className="text-emerald-950 text-xs leading-relaxed">
                Parents receive a secure SMS: <em>"Southdale Pediatrics: Balance for Emily’s well-check ($45.00). Tap to settle."</em> Tap link ➔ <strong>1-Tap Apple Pay (FaceID in 2 sec)</strong> with <strong>HSA/FSA health card</strong> support & instant Wallet receipt.
              </p>
            </div>
            <div className="space-y-1 text-xs text-emerald-950 border-t border-emerald-200 pt-3">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">✓ <span>No patient portal password or registration</span></div>
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">✓ <span>HSA/FSA cards + 48-hr cash settlement</span></div>
            </div>
          </div>

          {/* Column 3: Family Strategic Advantage */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-3 h-[360px] flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-blue-700 bg-blue-100 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Unfair Family Moat</span>
              </span>
              <div className="text-lg font-black text-slate-900">Warm Beachheads & Authority</div>
              <p className="text-slate-600 text-xs leading-relaxed">
                <strong>Physician Wife Credibility:</strong> Instant clinical trust. <br />
                <strong>Brother-in-Law (Maxillofacial Surgery Center):</strong> Warm pilot design partner for surgical/dental billing workflows (Dentrix/Nextech).
              </p>
            </div>
            <div className="bg-slate-900 text-slate-200 p-2.5 rounded-2xl text-xs font-medium space-y-1">
              <div className="text-emerald-400 font-bold flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span>$250–$500/mo SaaS / Clinic</span>
              </div>
              <p className="text-xs text-slate-400">10 private clinics = $30k–$60k ARR in high-margin healthcare SaaS.</p>
            </div>
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
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7A1900] to-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-md">
            🏡
          </div>
          <div>
            <span className="font-black text-sm text-slate-200">Family Strategy & Tax Deck</span>
            <span className="text-xs text-slate-500 ml-2 hidden sm:inline">• Waste Tech Venture Decision</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <Link
            href="/pitch"
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-xl font-medium transition-colors text-xs hidden md:flex items-center gap-1.5"
          >
            <span>🏢 SWS Exec Deck</span>
          </Link>
          <span className="font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-bold text-amber-300">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <Link
            href="/"
            className="bg-[#7A1900] hover:bg-[#581200] text-white px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs"
          >
            <span>Live Portal Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Presentation Stage: Locked 1100x620 Widescreen Canvas */}
      <div className="w-full flex items-center justify-center my-auto py-2">
        <main className="w-[1100px] h-[620px] max-w-full bg-white rounded-[32px] shadow-2xl border border-slate-800 text-slate-900 flex flex-col justify-between overflow-hidden relative flex-shrink-0">
          
          {/* Top Slide Header */}
          <div className="p-7 pb-3 border-b border-slate-100 flex items-start justify-between flex-shrink-0">
            <div className="space-y-0.5">
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
                {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Slide Body Stage: Locked Height */}
          <div className="px-8 py-3 h-[430px] max-h-[430px] overflow-hidden flex flex-col justify-center">
            {current.content}
          </div>

          {/* Slide Footer Navigation */}
          <div className="px-8 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between flex-shrink-0 text-xs">
            <button
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-30 flex items-center gap-1.5 transition-colors text-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  title={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === idx ? "w-7 bg-[#7A1900]" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {currentSlide < slides.length - 1 ? (
              <button
                onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
                className="px-5 py-2 rounded-xl font-bold bg-[#7A1900] hover:bg-[#581200] text-white flex items-center gap-1.5 transition-all shadow-md active:scale-95 text-xs"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/"
                className="px-5 py-2 rounded-xl font-black bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-all shadow-lg active:scale-95 text-xs"
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
        <Link href="/pitch" className="text-slate-400 hover:text-slate-200 underline">
          Switch to SWS Executive Presentation
        </Link>
      </footer>
    </div>
  );
}
