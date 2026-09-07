"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  Download,
  ExternalLink,
  Check,
  Sparkles,
  Smartphone,
  Clock,
  Info,
  Trash2,
  RefreshCw,
  Leaf,
  Bell,
} from "lucide-react";
import {
  downloadCalendarFile,
  generateGoogleCalendarUrl,
  generateOutlookCalendarUrl,
} from "@/lib/icsGenerator";

interface CalendarSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendarSyncModal({ isOpen, onClose }: CalendarSyncModalProps) {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleIcsDownload = () => {
    downloadCalendarFile();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const scheduleWeeks = [
    {
      date: "Thu, Aug 27",
      title: "This Week",
      isThisWeek: true,
      services: [
        { name: "Trash (96-gal)", icon: <Trash2 className="w-3.5 h-3.5 text-amber-600" />, badge: "Weekly" },
        { name: "Organics (35-gal)", icon: <Leaf className="w-3.5 h-3.5 text-emerald-600" />, badge: "Weekly" },
      ],
      recycle: false,
    },
    {
      date: "Thu, Sep 3",
      title: "Next Week",
      isThisWeek: false,
      services: [
        { name: "Trash (96-gal)", icon: <Trash2 className="w-3.5 h-3.5 text-amber-600" />, badge: "Weekly" },
        { name: "Organics (35-gal)", icon: <Leaf className="w-3.5 h-3.5 text-emerald-600" />, badge: "Weekly" },
        { name: "Recycling (96-gal)", icon: <RefreshCw className="w-3.5 h-3.5 text-blue-600" />, badge: "Bi-Weekly" },
      ],
      recycle: true,
    },
    {
      date: "Thu, Sep 10",
      title: "In 2 Weeks",
      isThisWeek: false,
      services: [
        { name: "Trash (96-gal)", icon: <Trash2 className="w-3.5 h-3.5 text-amber-600" />, badge: "Weekly" },
        { name: "Organics (35-gal)", icon: <Leaf className="w-3.5 h-3.5 text-emerald-600" />, badge: "Weekly" },
      ],
      recycle: false,
    },
    {
      date: "Thu, Sep 17",
      title: "In 3 Weeks",
      isThisWeek: false,
      services: [
        { name: "Trash (96-gal)", icon: <Trash2 className="w-3.5 h-3.5 text-amber-600" />, badge: "Weekly" },
        { name: "Organics (35-gal)", icon: <Leaf className="w-3.5 h-3.5 text-emerald-600" />, badge: "Weekly" },
        { name: "Recycling (96-gal)", icon: <RefreshCw className="w-3.5 h-3.5 text-blue-600" />, badge: "Bi-Weekly" },
      ],
      recycle: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7A1900] to-[#9E2A0D] p-5 text-white flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">Sync Pickup Schedule to Calendar</h3>
              <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Never Miss a Day
              </span>
            </div>
            <p className="text-sm text-red-100 mt-0.5">
              Eden Prairie Route EP-04 • Thursday Curbside by 6:30 AM
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar text-slate-900">
          
          {/* Calendar App Buttons */}
          <div>
            <label className="text-sm font-bold uppercase tracking-wider text-slate-700 block mb-2">
              Choose Your Calendar App (1-Click Setup)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Google Calendar */}
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all flex flex-col items-center text-center group shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-900">Google Calendar</span>
                <span className="text-xs text-slate-500 mt-1 flex items-center gap-0.5">
                  Web 1-Click <ExternalLink className="w-3 h-3" />
                </span>
              </a>

              {/* Apple Calendar (.ics) */}
              <button
                type="button"
                onClick={handleIcsDownload}
                className="p-3 rounded-2xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all flex flex-col items-center text-center group shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-900">Apple Calendar / iCal</span>
                <span className="text-xs text-slate-500 mt-1">
                  {downloaded ? "✓ Downloaded!" : "Download .ICS File"}
                </span>
              </button>

              {/* Outlook */}
              <a
                href={generateOutlookCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50/40 transition-all flex flex-col items-center text-center group shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-900">Outlook / Office</span>
                <span className="text-xs text-slate-500 mt-1 flex items-center gap-0.5">
                  Web 1-Click <ExternalLink className="w-3 h-3" />
                </span>
              </a>

            </div>
          </div>

          {/* Upcoming 4-Week Living Schedule */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">
                Upcoming 4-Week Pickup Matrix
              </label>
              <span className="text-xs text-slate-500 font-bold">Recycling is Every 2 Weeks</span>
            </div>

            <div className="space-y-2">
              {scheduleWeeks.map((week, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                    week.isThisWeek
                      ? "bg-red-50/40 border-[#7A1900]/40 shadow-xs"
                      : "bg-slate-50/60 border-slate-200"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-900">{week.date}</span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                          week.isThisWeek
                            ? "bg-[#7A1900] text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {week.title}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {week.services.map((srv, sIdx) => (
                        <span
                          key={sIdx}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs"
                        >
                          {srv.icon}
                          <span>{srv.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    {week.recycle ? (
                      <span className="text-xs font-bold text-blue-700 bg-blue-100 border border-blue-200 px-3 py-1 rounded-full">
                        ♻️ Recycling Day
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-400">
                        No Recycling
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plain-English Holiday Schedule Guide */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm">
                💡
              </div>
              <div>
                <h4 className="font-bold text-sm text-amber-950">How Holiday Weeks Work (Plain English)</h4>
                <p className="text-xs text-amber-800 font-medium">No confusing asterisks or PDF fine print.</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-slate-700">
              <p className="bg-white/80 border border-amber-200/80 rounded-xl p-3 leading-relaxed">
                🎯 <strong>The Golden Rule:</strong> If a major holiday falls on or before your pickup day (Mon–Thu), our trucks shift by <strong>1 day later</strong> for the rest of that week.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block text-sm">🇺🇸 Labor Day (Mon, Sep 7)</span>
                  <p className="text-slate-600 mt-1 leading-relaxed">Monday off ➔ Thursday route runs on <strong>Friday, Sep 11</strong>.</p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block text-sm">🦃 Thanksgiving (Thu, Nov 26)</span>
                  <p className="text-slate-600 mt-1 leading-relaxed">Thursday off ➔ Thursday route runs on <strong>Friday, Nov 27</strong>.</p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block text-sm">🎄 Christmas Day (Fri, Dec 25)</span>
                  <p className="text-slate-600 mt-1 leading-relaxed">Friday off ➔ Thursday runs <strong>normally on Thursday</strong>.</p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block text-sm">🎖️ Memorial Day (Mon, May 25)</span>
                  <p className="text-slate-600 mt-1 leading-relaxed">Monday off ➔ Thursday route runs on <strong>Friday, May 29</strong>.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold bg-[#7A1900] hover:bg-[#581200] text-white rounded-xl shadow-md transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
