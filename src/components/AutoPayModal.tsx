"use client";

import React, { useState } from "react";
import {
  X,
  Check,
  CreditCard,
  Calendar,
  Clock,
  Bell,
  ShieldCheck,
  Zap,
  Sparkles,
  Smartphone,
  Info,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { CustomerAccount, AutoPayScheduleType } from "@/lib/mockData";

interface AutoPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: CustomerAccount;
  onSave: (updatedAutoPay: CustomerAccount["billing"]["autoPay"]) => void;
}

export function AutoPayModal({
  isOpen,
  onClose,
  account,
  onSave,
}: AutoPayModalProps) {
  const current = account.billing.autoPay;

  const [enabled, setEnabled] = useState(current.enabled);
  const [scheduleType, setScheduleType] = useState<AutoPayScheduleType>(
    current.scheduleType || "due_date"
  );
  const [customDay, setCustomDay] = useState(current.customDay || 15);
  const [daysBefore, setDaysBefore] = useState(current.daysBefore || 3);
  const [notifyBeforeDays, setNotifyBeforeDays] = useState(
    current.notifyBeforeDays || 3
  );
  const [platform, setPlatform] = useState<"apple" | "google">("apple");
  const [selectedCard, setSelectedCard] = useState<"current" | "wallet" | "new">(
    "current"
  );
  const [isSaved, setIsSaved] = useState(false);

  // Detect user's device/browser ecosystem
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent || "";
      const isApple = /Macintosh|Mac OS X|iPhone|iPad|iPod/i.test(ua) && !/Android/i.test(ua);
      setPlatform(isApple ? "apple" : "google");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);

    let cardBrand = current.cardBrand;
    let last4 = current.last4;
    let expDate = current.expDate;

    if (selectedCard === "wallet") {
      cardBrand = platform === "apple" ? "Apple Pay" : "Google Pay";
      last4 = platform === "apple" ? "Apple Wallet" : "Google Account";
      expDate = "Active";
    }

    const updated = {
      ...current,
      enabled,
      scheduleType,
      customDay,
      daysBefore,
      notifyBeforeDays,
      cardBrand,
      last4,
      expDate,
      statusNote: enabled
        ? `Auto-pay active. Scheduled for ${
            scheduleType === "due_date"
              ? "statement due date"
              : scheduleType === "statement_issue"
              ? "statement issue date"
              : scheduleType === "custom_day"
              ? `the ${customDay}th of billing month`
              : `${daysBefore} days before due date`
          }.`
        : "Auto-pay is currently paused.",
      failedReason: undefined,
    };

    setTimeout(() => {
      onSave(updated);
      setIsSaved(false);
      onClose();
    }, 1000);
  };

  // Helper to format live preview date string
  const getSchedulePreviewText = () => {
    if (!enabled) return "Auto-pay is paused. You will manually pay invoices.";
    switch (scheduleType) {
      case "due_date":
        return "On the invoice due date (August 25, 2026)";
      case "statement_issue":
        return "Immediately when quarterly bill is generated (August 1, 2026)";
      case "custom_day":
        return `On the ${customDay}th day of the billing month (${customDay}th)`;
      case "days_before":
        return `${daysBefore} days before due date (August ${
          25 - daysBefore
        }, 2026)`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7A1900] to-[#9E2A0D] p-5 text-white flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">Manage Auto-Pay Preferences</h3>
              <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Smart Timing
              </span>
            </div>
            <p className="text-sm text-red-100 mt-0.5">
              Customize your charge date to align with your payday and budget
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {isSaved ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-900">
                Auto-Pay Preferences Saved!
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                Your payment timing and notification rules have been updated in
                the SWS billing system.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSave}
            className="p-6 overflow-y-auto space-y-5 custom-scrollbar text-slate-900"
          >
            {/* Auto-Pay Enable / Pause Switch */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="font-bold text-base text-slate-900 block">
                  Automatic Payments
                </span>
                <span className="text-sm text-slate-600">
                  {enabled
                    ? "Invoices will be automatically paid according to your schedule"
                    : "Auto-pay is disabled. Pay invoices manually each quarter"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEnabled(!enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  enabled ? "bg-[#7A1900]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {enabled && (
              <div className="space-y-4">
                {/* Timing Options */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#7A1900]" />
                      <span>When should we charge your account?</span>
                    </label>
                    <span className="text-xs text-slate-500 font-bold">
                      Quarterly cycle
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Option 1: On Due Date */}
                    <div
                      onClick={() => setScheduleType("due_date")}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        scheduleType === "due_date"
                          ? "border-[#7A1900] bg-red-50/50 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-slate-900">
                              On Statement Due Date
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Charges on the exact due date (Aug 25).
                          </p>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      </div>
                    </div>

                    {/* Option 2: When Statement Issues */}
                    <div
                      onClick={() => setScheduleType("statement_issue")}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        scheduleType === "statement_issue"
                          ? "border-[#7A1900] bg-red-50/50 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-slate-900">
                          When Statement Issues
                        </span>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Charges immediately on invoice generation ("At Billing").
                        </p>
                      </div>
                    </div>

                    {/* Option 3: Custom Day of the Month */}
                    <div
                      onClick={() => setScheduleType("custom_day")}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        scheduleType === "custom_day"
                          ? "border-[#7A1900] bg-red-50/50 shadow-xs sm:col-span-2"
                          : "border-slate-200 hover:border-slate-300 bg-white sm:col-span-1"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-sm font-bold text-slate-900">
                            Custom Day of Month
                          </span>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Match your paycheck (e.g. 1st, 15th, or 25th).
                          </p>
                        </div>
                        <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                          Paycheck Match
                        </span>
                      </div>

                      {scheduleType === "custom_day" && (
                        <div className="mt-3 pt-2.5 border-t border-red-200/60 flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-700">
                            Select day:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {[1, 5, 10, 15, 20, 25, 28].map((day) => (
                              <button
                                key={day}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCustomDay(day);
                                }}
                                className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
                                  customDay === day
                                    ? "bg-[#7A1900] text-white shadow-xs"
                                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                {day}th
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Option 4: Days Before Due Date */}
                    <div
                      onClick={() => setScheduleType("days_before")}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        scheduleType === "days_before"
                          ? "border-[#7A1900] bg-red-50/50 shadow-xs sm:col-span-2"
                          : "border-slate-200 hover:border-slate-300 bg-white sm:col-span-1"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-slate-900">
                          Days Before Due Date
                        </span>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Buffer period before final deadline.
                        </p>
                      </div>

                      {scheduleType === "days_before" && (
                        <div className="mt-3 pt-2.5 border-t border-red-200/60 flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-700">
                            Charge:
                          </span>
                          <div className="flex gap-2">
                            {[1, 3, 5, 7].map((days) => (
                              <button
                                key={days}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDaysBefore(days);
                                }}
                                className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
                                  daysBefore === days
                                    ? "bg-[#7A1900] text-white shadow-xs"
                                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                {days} {days === 1 ? "day" : "days"} before
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stored Wallet / Payment Method */}
                <div>
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-700 block mb-2">
                    Payment Method
                  </label>

                  <div className="space-y-2">
                    {/* Stored Mastercard */}
                    <div
                      onClick={() => setSelectedCard("current")}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        selectedCard === "current"
                          ? "border-[#7A1900] bg-red-50/30 shadow-xs"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shadow-2xs">
                          <CreditCard className="w-5 h-5 text-slate-700" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {current.cardBrand} •••• {current.last4}
                          </p>
                          <p className="text-xs text-slate-500">
                            Expires {current.expDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedCard === "current" && (
                          <span className="w-5 h-5 rounded-full bg-[#7A1900] text-white flex items-center justify-center text-xs font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Biometric Mobile Wallet Option (Apple Pay on Apple, Google Pay on Android/Chrome) */}
                    <div
                      onClick={() => setSelectedCard("wallet")}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        selectedCard === "wallet"
                          ? platform === "apple"
                            ? "border-black bg-slate-900 text-white shadow-xs"
                            : "border-blue-600 bg-blue-600 text-white shadow-xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${
                            selectedCard === "wallet"
                              ? "bg-white text-slate-950"
                              : platform === "apple"
                              ? "bg-slate-900 text-white"
                              : "bg-blue-600 text-white"
                          }`}
                        >
                          {platform === "apple" ? "Pay" : "GPay"}
                        </div>
                        <div>
                          <p className="text-sm font-bold">
                            {platform === "apple"
                              ? "Apple Pay (Biometric Autopay)"
                              : "Google Pay (Google Wallet)"}
                          </p>
                          <p
                            className={`text-xs ${
                              selectedCard === "wallet"
                                ? "text-slate-200"
                                : "text-slate-500"
                            }`}
                          >
                            {platform === "apple"
                              ? "Charges to default Apple Wallet card automatically"
                              : "Charges to default Google Account card automatically"}
                          </p>
                        </div>
                      </div>
                      {selectedCard === "wallet" && (
                        <span className="w-5 h-5 rounded-full bg-white text-slate-950 flex items-center justify-center text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </div>

                    {/* Add New Card Option */}
                    <div
                      onClick={() => setSelectedCard("new")}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        selectedCard === "new"
                          ? "border-[#7A1900] bg-red-50/30 shadow-xs"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-sm text-slate-700">
                          +
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            Add New Debit / Credit Card
                          </p>
                          <p className="text-xs text-slate-500">
                            Full autofill support for LastPass, 1Password & Chrome
                          </p>
                        </div>
                      </div>
                      {selectedCard === "new" && (
                        <span className="w-5 h-5 rounded-full bg-[#7A1900] text-white flex items-center justify-center text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </div>
                  </div>

                  {/* New Card Input Fields */}
                  {selectedCard === "new" && (
                    <div className="space-y-3 pt-3 mt-3 border-t border-slate-200 text-sm">
                      <div>
                        <label htmlFor="ap-cc-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          id="ap-cc-name"
                          name="ccname"
                          type="text"
                          autoComplete="cc-name"
                          enterKeyHint="next"
                          placeholder="Patrick Badley"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#7A1900]"
                        />
                      </div>

                      <div>
                        <label htmlFor="ap-cc-number" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Card Number
                        </label>
                        <input
                          id="ap-cc-number"
                          name="cardnumber"
                          type="text"
                          autoComplete="cc-number"
                          inputMode="numeric"
                          enterKeyHint="next"
                          maxLength={19}
                          placeholder="4000 1234 5678 9010"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-base font-mono focus:outline-none focus:ring-2 focus:ring-[#7A1900]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="ap-cc-exp" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Expires
                          </label>
                          <input
                            id="ap-cc-exp"
                            name="cc-exp"
                            type="text"
                            autoComplete="cc-exp"
                            inputMode="numeric"
                            enterKeyHint="next"
                            maxLength={5}
                            placeholder="MM/YY"
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-base font-mono focus:outline-none focus:ring-2 focus:ring-[#7A1900]"
                          />
                        </div>
                        <div>
                          <label htmlFor="ap-cc-csc" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            CVV / Security Code
                          </label>
                          <input
                            id="ap-cc-csc"
                            name="cvc"
                            type="text"
                            autoComplete="cc-csc"
                            inputMode="numeric"
                            enterKeyHint="done"
                            maxLength={4}
                            placeholder="123"
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-base font-mono focus:outline-none focus:ring-2 focus:ring-[#7A1900]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pre-Charge Reminder Safeguards */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span className="text-sm font-bold text-slate-800">
                        Pre-Charge SMS & Email Reminder
                      </span>
                    </div>
                    <select
                      value={notifyBeforeDays}
                      onChange={(e) =>
                        setNotifyBeforeDays(Number(e.target.value))
                      }
                      className="text-sm font-bold bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-[#7A1900]"
                    >
                      <option value={1}>1 day before</option>
                      <option value={3}>3 days before</option>
                      <option value={5}>5 days before</option>
                    </select>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We will text and email you a statement summary before charging
                    your card so you always have full visibility.
                  </p>
                </div>

                {/* Dynamic Live Preview Callout */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm space-y-1">
                    <span className="font-bold text-emerald-900 block">
                      Scheduled Execution Preview
                    </span>
                    <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">
                      Next charge of{" "}
                      <strong>${account.billing.totalDue > 0 ? account.billing.totalDue.toFixed(2) : "126.93"}</strong> will occur{" "}
                      <strong>{getSchedulePreviewText()}</strong> using{" "}
                      <strong>
                        {selectedCard === "wallet"
                          ? platform === "apple"
                            ? "Apple Pay"
                            : "Google Pay"
                          : `${current.cardBrand} •••• ${current.last4}`}
                      </strong>
                      .
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-bold bg-[#7A1900] hover:bg-[#581200] text-white rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                Save Preferences
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
