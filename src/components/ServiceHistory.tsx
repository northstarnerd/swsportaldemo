"use client";

import React, { useState } from "react";
import { History, CheckCircle2, Clock, HelpCircle, AlertCircle, ChevronRight, Check } from "lucide-react";
import { ServiceHistoryItem } from "@/lib/mockData";

interface ServiceHistoryProps {
  history: ServiceHistoryItem[];
}

export function ServiceHistory({ history }: ServiceHistoryProps) {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportedService, setReportedService] = useState<ServiceHistoryItem | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOpenReport = (item: ServiceHistoryItem) => {
    setReportedService(item);
    setIsSubmitted(false);
    setReportModalOpen(true);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setReportModalOpen(false);
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-black text-slate-900 text-lg flex items-center gap-2.5">
            <History className="w-5 h-5 text-[#7A1900]" />
            <span>Recent Pickup Activity & Verification</span>
          </h3>
          <p className="text-sm text-slate-600 font-medium mt-0.5">Live in-cab driver completion stamps</p>
        </div>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          Route #EP-04
        </span>
      </div>

      {/* History Table / List */}
      <div className="divide-y divide-slate-100">
        {history.map((item) => (
          <div
            key={item.id}
            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-slate-50/70 rounded-2xl px-3 transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                {item.status === "Completed" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Clock className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{item.serviceName}</span>
                  <span className="text-xs font-mono text-slate-400">WO #{item.serviceId}</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{item.date}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 pl-12 sm:pl-0">
              {item.status === "Completed" ? (
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed {item.time}
                  </span>
                </div>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5" />
                  Scheduled
                </span>
              )}

              <button
                onClick={() => handleOpenReport(item)}
                className="text-xs font-semibold text-slate-400 hover:text-slate-700 hover:underline"
              >
                Report Issue
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Missed Pickup Self-Service Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            {isSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Ticket Created!</h4>
                <p className="text-sm text-slate-600">
                  Our dispatch team in Savage has received your inquiry. A driver will verify GPS route logs and follow up via SMS.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Report Service Issue</h4>
                  <p className="text-sm text-slate-500">
                    {reportedService?.serviceName} • {reportedService?.date}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700">What happened?</label>
                  <select className="w-full text-sm p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#7A1900]">
                    <option>Cart was curbside by 6:30 AM but missed</option>
                    <option>Bin was blocked by street parked car</option>
                    <option>Damaged cart wheel or broken lid</option>
                    <option>Cart left in middle of driveway</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-slate-700">Optional Notes for Driver</label>
                  <textarea
                    rows={2}
                    placeholder="E.g., cart is near the mailbox..."
                    className="w-full text-sm p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#7A1900]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="w-1/2 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 text-sm font-bold bg-[#7A1900] hover:bg-[#581200] text-white rounded-xl shadow-md"
                  >
                    Submit Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
