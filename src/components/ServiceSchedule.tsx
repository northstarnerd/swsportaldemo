import React, { useState } from "react";
import { Calendar, Download, Bell, Check, Sparkles, Trash2, RefreshCw, Leaf, Plus, ArrowUpRight } from "lucide-react";
import { ServiceItem } from "@/lib/mockData";
import { downloadCalendarFile } from "@/lib/icsGenerator";
interface ServiceScheduleProps {
  services: ServiceItem[];
  onOpenExtraServices: () => void;
  onOpenCalendarSync: () => void;
  onOpenContainerManager?: () => void;
}

export function ServiceSchedule({
  services,
  onOpenExtraServices,
  onOpenCalendarSync,
  onOpenContainerManager,
}: ServiceScheduleProps) {
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [activeHoliday, setActiveHoliday] = useState<"none" | "labor_day" | "thanksgiving" | "friday_holiday">("none");

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="font-black text-slate-900 text-xl flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#7A1900]" />
              <span>Curbside Pickup Schedule</span>
            </h3>
            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
              Eden Prairie EP-04
            </span>
          </div>
          <p className="text-sm text-slate-600 font-medium mt-1">
            6484 Promontory Drive • Curbside by 6:30 AM
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto">
          {/* Bin Sizes & Yard Waste Button */}
          {onOpenContainerManager && (
            <button
              onClick={onOpenContainerManager}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-sm font-bold bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <Leaf className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Manage Bins</span>
            </button>
          )}

          {/* Calendar Sync Button */}
          <button
            onClick={onOpenCalendarSync}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-sm font-bold bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            <Calendar className="w-4 h-4 text-[#7A1900] flex-shrink-0" />
            <span>Sync Calendar</span>
          </button>

          {/* Add Extra Pickup */}
          <button
            onClick={onOpenExtraServices}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-sm font-bold bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4 text-[#7A1900] flex-shrink-0" />
            <span>Extra Bags</span>
          </button>
        </div>
      </div>

      {/* Live Route Status Banner */}
      <div className="flex items-center justify-between text-sm text-slate-700 pt-0.5">
        <span className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Normal Thursday schedule • Next collection: <strong>Thu, Aug 27 by 6:30 AM</strong></span>
        </span>
        <span className="text-xs text-slate-500 font-mono hidden sm:inline">
          Eden Prairie Route #4
        </span>
      </div>

      {/* 3 Unified Clean Cart Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Cart 1: Trash */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-base shadow-2xs">
              🗑️
            </div>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Put Out
            </span>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">96-gal Trash</h4>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Weekly Curbside Collection</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Next Pickup</span>
            <p className="text-sm font-black text-slate-900 mt-0.5">Thu, August 27</p>
          </div>
        </div>

        {/* Cart 2: Organics */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-base shadow-2xs">
              🥑
            </div>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Put Out
            </span>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">35-gal Organics</h4>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Weekly Curbside Collection</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Next Pickup</span>
            <p className="text-sm font-black text-slate-900 mt-0.5">Thu, August 27</p>
          </div>
        </div>

        {/* Cart 3: Recycling */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-base shadow-2xs">
              ♻️
            </div>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
              Skip This Week
            </span>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">96-gal Single-Stream</h4>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Every 2 Weeks Pickup</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Next Pickup</span>
            <p className="text-sm font-black text-slate-900 mt-0.5">Thu, September 3</p>
          </div>
        </div>
      </div>

      {/* Clean Bottom SMS Row */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-slate-700">
        <div className="flex items-center gap-2.5">
          <Bell className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span className="font-medium">Wednesday 6:00 PM "Garbage Night" SMS Alerts</span>
        </div>
        <button
          onClick={() => setSmsEnabled(!smsEnabled)}
          className={`px-3.5 py-1 rounded-xl text-xs font-bold transition-all w-fit ${
            smsEnabled
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {smsEnabled ? "✓ Alerts Active" : "Alerts Disabled"}
        </button>
      </div>
    </div>
  );
}

