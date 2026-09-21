"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  User,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkles,
  ArrowLeft,
  Clock,
  HelpCircle,
} from "lucide-react";

export default function MobileCheatSheetPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "We already have an online portal with Navusoft. Why would we need this?",
      a: "Navusoft is great for the heavy back-office lifting: dispatch sheets, route logistics, container inventory, and core accounting. What we're talking about isn't replacing Navusoft at all. It’s simply a modern 'mobile front-door'—specifically for 1-tap Apple Pay and automated text reminders—so residents can settle past-due bills in 5 seconds on their phone instead of having to call your desk or wait for a paper letter.",
    },
    {
      q: "How would this work with our current systems? We don't want to change our accounting or routes.",
      a: "Zero change to your daily operations. In fact, for a pilot, we don't even touch your website or Navusoft setup. You could simply export a list of past-due accounts whose cards expired, we send the 1-click text reminders, collect the funds into your account, and hand you a clean reconciliation sheet to clear the balance in Navusoft.",
    },
    {
      q: "Is this going to cost us a lot of money? What is your business model?",
      a: "Not at all. Right now, I'm focused on solving the real operational headache for SWS. For an initial test, we propose a 30-day risk-free pilot where we only help you recover past-due accounts that would otherwise require printing, stuffing, and mailing paper notices. If it doesn't recover cash faster and save your staff hours of phone time, you owe nothing.",
    },
    {
      q: "Do residents actually use Apple Pay or Google Pay to pay garbage bills?",
      a: "Over 80% of consumer web traffic in Minnesota is now on mobile devices. Most people don't sit down at desktop computers to pay utility bills anymore. With Apple Pay, residents don't have to go find their wallet, type in a 16-digit card number, or reset a forgotten password—they just double-click the side button on their iPhone and it's paid in 3 seconds.",
    },
    {
      q: "Does Apple Pay cost Suburban Waste extra processing fees?",
      a: "No, Apple Pay costs merchants zero additional fees. Apple collects their fraction directly from the issuing banks, not from SWS. In fact, because Apple Pay uses biometric tokenization (FaceID), it qualifies for standard or lower interchange rates and virtually eliminates fraudulent chargebacks compared to manually keyed phone orders.",
    },
    {
      q: "How much does a text message cost compared to what we do today?",
      a: "Sending a text alert costs about a penny and a half. By comparison, mailing a paper past-due notice costs roughly $1.50 to $2.00+ once you count the $0.73 stamp, envelopes, paper, and staff time—plus the 5 minutes your staff spends taking the card over the phone when they call in. On 300 delinquent cards, switching to text recovery saves over $1,300 every quarter in direct waste.",
    },
    {
      q: "What about residents who don't have smartphones or don't want texts?",
      a: "They continue exactly as they do today! Traditional payers can still mail paper checks or use your existing desktop portal. This simply captures the busy, mobile-first residents who let their bills slip simply because typing card numbers on a phone was too painful.",
    },
    {
      q: "Who are you again? Do you work for a software company?",
      a: "I'm a local software engineer living right here in Eden Prairie on Promontory Drive, and a longtime SWS customer. I build modern financial technology and customer portals, and because I love your curbside service, I wanted to see if I could bring my expertise to help out a great local family business.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 pb-20">
      <div className="max-w-md mx-auto space-y-5">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>SWS Portal</span>
          </Link>
          <span className="text-[11px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold">
            🟡 Voicemail Left (Pending Callback)
          </span>
        </div>

        {/* Quick Context Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-[#7A1900] tracking-wider bg-red-100 px-3 py-1 rounded-full w-fit">
            <User className="w-3.5 h-3.5" />
            <span>Susie Scott • Office Manager</span>
          </div>

          <h1 className="text-xl font-black text-white tracking-tight">
            Callback Pocket Cheat Sheet
          </h1>

          <div className="text-xs space-y-1.5 text-slate-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                Your Anchor: <strong>Promontory Drive in Eden Prairie</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>
                SWS Main Office: <strong>(952) 937-8900</strong>
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 1: IF SUSIE CALLS BACK */}
        <div className="bg-emerald-950/40 border-2 border-emerald-500/60 rounded-3xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-400 tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>When Susie Calls You Back</span>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-slate-200">
            <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 space-y-2">
              <p className="font-semibold text-emerald-300">1. Warm Re-Anchor:</p>
              <p className="italic text-slate-300">
                &ldquo;Hi Susie, thanks so much for getting back to me! How&apos;s your week going?
                As I mentioned in my voicemail, I&apos;m an SWS customer over on Promontory Drive in
                Eden Prairie. First off, thank you and your crew for great curbside service week in
                and week out.&rdquo;
              </p>
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 space-y-2">
              <p className="font-semibold text-emerald-300">2. The Big Discovery Question:</p>
              <p className="italic text-slate-300">
                &ldquo;I reached out because I&apos;m a local software engineer, and as a customer,
                I&apos;ve been thinking about ways to help SWS cut down on paper past-due notices and
                taking credit cards over the phone when cards expire.
                I have a few ideas—like 1-tap text reminders with Apple Pay—<strong>but really, I wanted to hear from you: what are the biggest headaches or bottlenecks you and your front office deal with day-to-day right now?</strong>&rdquo;
              </p>
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 space-y-2">
              <p className="font-semibold text-emerald-300">3. The Soft Close (Next Step):</p>
              <p className="italic text-slate-300">
                &ldquo;Susie, this is super helpful context. I&apos;d love to buy you a cup of coffee
                or swing by your Savage office for 10 minutes sometime next week just to show you a
                quick demo of what I put together and see if it aligns with what you need. Would you
                be open to that?&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: ACTIVE LISTENING PIVOTS */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
          <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Active Listening Cheat Matrix</span>
          </h2>

          <div className="space-y-2.5 text-xs">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
              <p className="font-bold text-amber-300">If she says: &ldquo;Billing week is chaos with phone calls&rdquo;</p>
              <p className="text-slate-400">
                👉 <em>&ldquo;That makes total sense. How much of that time is spent just having residents read 16-digit card numbers over the phone?&rdquo;</em>
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
              <p className="font-bold text-amber-300">If she says: &ldquo;Printing & mailing paper bills is a huge chore&rdquo;</p>
              <p className="text-slate-400">
                👉 <em>&ldquo;Right, and then you wait weeks for them to see it on the counter. An instant 1-tap text link could clear that cash in 48 hours.&rdquo;</em>
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
              <p className="font-bold text-amber-300">If she says: &ldquo;We just migrated to Navusoft&rdquo;</p>
              <p className="text-slate-400">
                👉 <em>&ldquo;I completely understand—migrations are grueling. That&apos;s why this is strictly a lightweight front-door that sits on top of Navusoft without touching your ledger or routes.&rdquo;</em>
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: FAQ ACCORDION */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
          <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span>Quick Objection / FAQ Answers</span>
          </h2>

          <div className="space-y-2 text-xs">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-slate-950 border border-slate-800/80 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-3.5 font-bold text-slate-200 flex justify-between items-center gap-2"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 text-slate-300 text-[11px] leading-relaxed border-t border-slate-900 pt-2 bg-slate-900/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-500 pt-2">
          Patrick Badley • Promontory Dr, Eden Prairie
        </div>
      </div>
    </div>
  );
}
