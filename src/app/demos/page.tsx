"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Stethoscope,
  Snowflake,
  Bus,
  ExternalLink,
  Copy,
  Check,
  ShieldAlert,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";

interface DemoCard {
  id: string;
  title: string;
  category: string;
  badgeColor: string;
  urlPath: string;
  targetAudience: string;
  valueProp: string;
  keyFeatures: string[];
  icon: React.ElementType;
}

export default function DemosDirectoryPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const demos: DemoCard[] = [
    {
      id: "sws",
      title: "Suburban Waste Services (SWS)",
      category: "Primary Active Pilot",
      badgeColor: "bg-red-100 text-[#7A1900] border-red-200",
      urlPath: "/",
      targetAudience: "Susie Scott / SWS Leadership (Eden Prairie, MN)",
      valueProp: "Bypass paper notices for ~300 quarterly declined cards. Recover cash via 1-tap SMS Apple Pay.",
      keyFeatures: [
        "1-Tap Apple Pay / Google Pay ($94.50 quarterly bill)",
        "Curbside .ics Calendar Sync with Eden Prairie holiday shift",
        "Self-service cart & bulky item pickup requests",
        "Interactive executive pitch & case study comparisons",
      ],
      icon: Truck,
    },
    {
      id: "walters",
      title: "Walters Recycling & Refuse",
      category: "Twin Cities Independent Hauler",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-200",
      urlPath: "/demos/walters",
      targetAudience: "Walters Leadership / Ops (Blaine & North Metro, MN)",
      valueProp: "Plug-and-play white-label portal for Walters' Navusoft/Soft-Pak residential routes.",
      keyFeatures: [
        "Walters forest green & navy brand aesthetic",
        "Blaine, MN Friday residential collection schedule",
        "Quarterly invoice payment with Apple Pay ($108.75)",
        "Yard waste cart add-on & holiday schedule sync",
      ],
      icon: Truck,
    },
    {
      id: "medpay",
      title: "Southdale Pediatric Associates (1-Tap QuickPay)",
      category: "High-Margin Healthcare Beachhead",
      badgeColor: "bg-blue-100 text-[#0067B1] border-blue-200",
      urlPath: "/demos/medpay",
      targetAudience: "Southdale Pediatrics Practice Leadership (Edina, Eden Prairie, Burnsville)",
      valueProp: "Eliminate paper statements & IQHealth/Cerner portal friction. Recover post-insurance patient copays ($45) via 1-tap Apple Pay with HSA/FSA cards.",
      keyFeatures: [
        "Authentic Southdale Peds SVG logo & royal blue (#0067B1) / teal branding",
        "Itemized clinical statement (CPT 99393 exam, CPT 90460 vaccine, BCBS discount)",
        "1-Tap Apple Pay with HSA / FSA Healthcare Card badge",
        "Zero password or 8-digit Guarantor PIN required",
      ],
      icon: Stethoscope,
    },
    {
      id: "snow",
      title: "North Star Snow Dispatch",
      category: "Seasonal Route-Based Services",
      badgeColor: "bg-blue-100 text-blue-900 border-blue-200",
      urlPath: "/demos/snow",
      targetAudience: "Twin Cities Residential Snow Removal Contractors",
      valueProp: "Kill the blizzard morning phone panic: 'When is my plow coming?' with live arrival alerts.",
      keyFeatures: [
        "Live storm status ('6.2 in fallen — Route 3 Active')",
        "Curbside truck proximity tracker ('Truck #4 is 2 driveways away')",
        "Per-push automated charge ($45/push) to Apple Pay on file",
        "Priority clearing requests (< 6:30 AM commute cutoff)",
      ],
      icon: Snowflake,
    },
    {
      id: "bus",
      title: "SafeRoute K-12 Transportation",
      category: "School Transit & Attendance",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-200",
      urlPath: "/demos/bus",
      targetAudience: "Private / Independent Schools (Breck, Blake) & Public Districts",
      valueProp: "Curbside SMS arrival alerts so kids don't stand in sub-zero Minnesota winters. 1-tap absence notices.",
      keyFeatures: [
        "Live bus ETA ('Bus #14 is 2 stops away / ~5 mins')",
        "1-Tap 'Leo is NOT riding this morning' button (saves driver 2 mins)",
        "Dynamic 2-Hour Weather Delay calendar sync (.ics)",
        "1-Tap Apple Pay for Pay-to-Ride courtesy fees ($125/sem)",
      ],
      icon: Bus,
    },
  ];

  const copyUrl = (id: string, path: string) => {
    const fullUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white font-black shadow-lg">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-black text-lg text-white leading-tight">Venture Demo Portfolio Hub</h1>
              <p className="text-xs text-slate-400">Internal Link Center • URL-Isolated Vertical Prototypes</p>
            </div>
          </div>
          <Link
            href="/"
            className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <span>Active SWS Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Notice Banner */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-5 sm:p-6 flex items-start gap-4">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm">
            <div className="font-bold text-white text-base">URL-Isolated Prototype Environment</div>
            <p className="text-slate-300 leading-relaxed">
              In accordance with architectural invariants, each demo below is <strong>100% self-contained</strong>. There are no public toggle menus or cross-demo links on any customer-facing page. Clients viewing their branded link will see only their tailored workflow.
            </p>
          </div>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demos.map((demo) => {
            const Icon = demo.icon;
            return (
              <div
                key={demo.id}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 flex flex-col justify-between transition-all hover:shadow-xl space-y-6"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${demo.badgeColor}`}
                    >
                      {demo.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      {demo.urlPath}
                    </span>
                  </div>

                  {/* Title & Target */}
                  <div className="flex items-start gap-3.5 pt-1">
                    <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-black text-lg text-white leading-snug">{demo.title}</h2>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{demo.targetAudience}</p>
                    </div>
                  </div>

                  {/* Value Prop */}
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-2xl">
                    <strong className="text-white">The Angle:</strong> {demo.valueProp}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Included Interactions</div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {demo.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => copyUrl(demo.id, demo.urlPath)}
                    className="text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
                  >
                    {copiedId === demo.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied Full URL!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={demo.urlPath}
                    target="_blank"
                    className="text-xs font-black text-slate-950 bg-white hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                  >
                    <span>Open Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
