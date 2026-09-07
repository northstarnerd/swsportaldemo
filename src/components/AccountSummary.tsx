import React from "react";
import { AlertCircle, CheckCircle2, CreditCard, ShieldCheck, ArrowRight, Zap, RefreshCw } from "lucide-react";
import { CustomerAccount } from "@/lib/mockData";

interface AccountSummaryProps {
  account: CustomerAccount;
  onOpenPayment: () => void;
  onOpenAutoPay: () => void;
}

export function AccountSummary({ account, onOpenPayment, onOpenAutoPay }: AccountSummaryProps) {
  const isPastDue = account.billing.pastDue > 0;
  const isPaid = account.billing.totalDue === 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* Left Column (7 cols): Balance & 1-Click Pay */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Q3 Residential Account Balance
            </span>
            {isPaid ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active & Paid
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                <AlertCircle className="w-3.5 h-3.5" />
                Overdue (Past Due)
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-3.5">
            <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
              ${account.billing.totalDue.toFixed(2)}
            </span>
            <span className="text-sm sm:text-base text-slate-600 font-semibold">
              {isPaid ? "All quarterly charges settled" : `Due on ${account.billing.dueDate}`}
            </span>
          </div>

          {isPaid ? (
            <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-4 text-sm text-emerald-950 flex items-center gap-3 max-w-lg">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>Next quarterly billing scheduled for <strong>November 1, 2026</strong>.</span>
            </div>
          ) : (
            <div className="space-y-2.5 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenPayment}
                  className="w-full sm:w-auto justify-center bg-[#7A1900] hover:bg-[#581200] text-white px-7 py-3.5 rounded-2xl font-bold text-base shadow-md hover:shadow-lg flex items-center gap-2.5 transition-all active:scale-95"
                >
                  <Zap className="w-5 h-5 text-amber-300" />
                  <span>1-Click Pay (${account.billing.totalDue.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4 opacity-80" />
                </button>
              </div>

              <p className="text-xs text-slate-500 font-medium">
                Supports Apple Pay, Google Pay, and Credit Cards • No login required
              </p>
            </div>
          )}
        </div>

        {/* Right Column (5 cols): AutoPay Card */}
        <div className="lg:col-span-5 bg-slate-50/90 border border-slate-200/90 rounded-2xl p-5 space-y-3.5 relative">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Auto-Pay Schedule
            </span>
            <button
              onClick={onOpenAutoPay}
              className="text-sm font-bold text-[#7A1900] hover:underline"
            >
              Configure
            </button>
          </div>

          <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-sm text-slate-700 flex-shrink-0">
                <CreditCard className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {account.billing.autoPay.cardBrand} •••• {account.billing.autoPay.last4}
                </p>
                <p className="text-xs text-slate-500 font-medium">Expires {account.billing.autoPay.expDate}</p>
              </div>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              account.billing.autoPay.enabled
                ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                : "text-slate-600 bg-slate-200"
            }`}>
              {account.billing.autoPay.enabled ? "Active" : "Disabled"}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
            <span className="text-slate-500">Timing:</span>
            <span className="font-semibold text-slate-900">
              {account.billing.autoPay.scheduleType === "due_date"
                ? "On Due Date (Aug 25)"
                : account.billing.autoPay.scheduleType === "statement_issue"
                ? "When Statement Issues"
                : account.billing.autoPay.scheduleType === "custom_day"
                ? `${account.billing.autoPay.customDay || 15}th of Month`
                : `${account.billing.autoPay.daysBefore || 3} Days Before Due`}
            </span>
          </div>

          {!isPaid && account.billing.autoPay.failedReason && (
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-amber-700">
              <span className="flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>Card declined on Aug 15</span>
              </span>
              <button
                onClick={onOpenAutoPay}
                className="font-bold text-[#7A1900] hover:underline"
              >
                Update Card
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
