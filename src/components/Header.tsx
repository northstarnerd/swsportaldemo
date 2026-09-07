"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Phone,
  MapPin,
  User,
  LogOut,
  ChevronDown,
  Bell,
  Menu,
  X,
  Sparkles,
  Calendar,
  Leaf,
  Layers,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { CustomerAccount } from "@/lib/mockData";

interface HeaderProps {
  account: CustomerAccount;
  onOpenPitchDeck?: () => void;
  onOpenAuth?: () => void;
  onOpenContainers?: () => void;
  onOpenCalendar?: () => void;
  onOpenStory?: () => void;
}

export function Header({
  account,
  onOpenPitchDeck,
  onOpenAuth,
  onOpenContainers,
  onOpenCalendar,
  onOpenStory,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Utility Bar (Compact on mobile) */}
      <div className="bg-[#7A1900] text-white text-xs sm:text-sm py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wide">SUBURBAN WASTE SERVICES</span>
            <span className="text-red-200 hidden sm:inline">• Savage & Eden Prairie, MN</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-6 text-slate-200 text-xs sm:text-sm">
            <a
              href="tel:9529378900"
              className="flex items-center gap-1.5 hover:text-white font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-200" />
              <span>(952) 937-8900</span>
            </a>
            <button
              onClick={onOpenAuth}
              className="hidden sm:flex items-center gap-2 text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors font-medium text-xs sm:text-sm"
            >
              <User className="w-3.5 h-3.5 text-red-200" />
              <span className="truncate max-w-[180px]">{account.email}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation & Location Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-auto flex items-center justify-center flex-shrink-0">
            <img
              src="/sws-logo.png"
              alt="Suburban Waste Services"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </div>
          <div className="border-l border-slate-200 pl-3.5">
            <div className="flex items-center gap-2">
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-900">Suburban Waste</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Customer Account & Billing
            </p>
          </div>
        </div>

        {/* Right Controls: Desktop Location + Hamburger Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Service Address Pill (Hidden on very small screens, accessible in menu) */}
          <div
            onClick={onOpenContainers}
            className="hidden md:flex bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl px-4 py-2 items-center gap-3 transition-colors cursor-pointer text-left shadow-2xs"
          >
            <div className="w-8 h-8 rounded-xl bg-red-50 text-[#7A1900] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{account.serviceAddress.street}</span>
                <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-mono font-bold">
                  EP-04
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {account.serviceAddress.city}, {account.serviceAddress.state} • Acct #{account.accountNumber}
              </p>
            </div>
          </div>

          {/* User / Auth trigger on mobile */}
          <button
            onClick={onOpenAuth}
            className="sm:hidden w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95"
            title="Fast SSO / Login"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Hamburger / Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-800 transition-colors active:scale-95"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Slide-Down / Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 sm:px-8 py-5 space-y-4 shadow-xl animate-fade-in">
          {/* Location Summary in Menu */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-[#7A1900] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">{account.serviceAddress.street}</div>
                <div className="text-xs text-slate-500 font-medium">
                  {account.serviceAddress.city}, {account.serviceAddress.state} {account.serviceAddress.zip} • Acct #{account.accountNumber}
                </div>
              </div>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">
              Active
            </span>
          </div>

          {/* Customer Self-Service Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
            {onOpenContainers && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContainers();
                }}
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left flex items-center gap-2.5 text-slate-800 transition-colors"
              >
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Bins, Cart Sizes & Yard Waste</span>
              </button>
            )}

            {onOpenCalendar && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalendar();
                }}
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left flex items-center gap-2.5 text-slate-800 transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#7A1900]" />
                <span>Sync Curbside Calendar to Phone</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAuth) onOpenAuth();
              }}
              className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left flex items-center gap-2.5 text-slate-800 transition-colors"
            >
              <User className="w-4 h-4 text-blue-600" />
              <span>Fast SSO / Zero-Password Login</span>
            </button>

            {onOpenStory && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStory();
                }}
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left flex items-center gap-2.5 text-slate-800 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span>Case Study & Glitch Comparison</span>
              </button>
            )}
          </div>

          {/* Discreet Presenter & Strategy Section (Hidden from standard view) */}
          <div className="border-t border-slate-100 pt-3 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Presenter & Strategy Decks
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link
                href="/family-pitch"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-emerald-800 hover:bg-emerald-900 text-white px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 text-xs shadow-xs"
              >
                <span>🏡 Family & Tax Deck</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <Link
                href="/pitch"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#7A1900] hover:bg-[#581200] text-white px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 text-xs shadow-xs"
              >
                <span>🖥️ SWS Executive Deck</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

