"use client";

import React, { useState } from "react";
import {
  X,
  Trash2,
  RefreshCw,
  Leaf,
  CheckCircle2,
  Wrench,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  Info,
} from "lucide-react";
import { CustomerAccount } from "@/lib/mockData";

interface ContainerManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: CustomerAccount;
  onUpdateCartSize?: (cartType: string, newSize: string) => void;
}

type ModalTab = "containers" | "yard_waste" | "repair";

export function ContainerManagerModal({
  isOpen,
  onClose,
  account,
  onUpdateCartSize,
}: ContainerManagerModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>("containers");
  const [trashSize, setTrashSize] = useState<"35" | "65" | "95">("95");
  const [recycleSize, setRecycleSize] = useState<"35" | "65" | "95">("65");
  const [repairType, setRepairType] = useState<string>("wheel");
  const [repairCart, setRepairCart] = useState<string>("trash");
  const [repairSubmitted, setRepairSubmitted] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveSizes = () => {
    setSaveSuccess(true);
    if (onUpdateCartSize) {
      onUpdateCartSize("trash", `${trashSize} Gallon Cart`);
      onUpdateCartSize("recycle", `${recycleSize} Gallon Cart`);
    }
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1500);
  };

  const handleRepairSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRepairSubmitted(true);
    setTimeout(() => {
      setRepairSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#7A1900] to-[#9E2A0D] p-5 sm:p-6 text-white flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-black text-xl">Bins & Seasonal Services</h3>
              <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Self-Service
              </span>
            </div>
            <p className="text-sm text-red-100 mt-1">
              Change cart sizes, manage yard waste dates, or request repairs
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-slate-100 bg-slate-50 p-1.5 gap-1.5 text-sm">
          <button
            onClick={() => setActiveTab("containers")}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "containers"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Trash2 className="w-4 h-4 text-[#7A1900]" />
            <span>Bin Sizes & Options</span>
          </button>
          <button
            onClick={() => setActiveTab("yard_waste")}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "yard_waste"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Yard Waste Season</span>
          </button>
          <button
            onClick={() => setActiveTab("repair")}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "repair"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Wrench className="w-4 h-4 text-blue-600" />
            <span>Request Repair</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Tab 1: Bin Sizes & Pricing */}
          {activeTab === "containers" && (
            <div className="space-y-4 text-sm">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#7A1900]" />
                  <span>Minnesota Volume-Based Pricing (Pay-As-You-Throw)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Choose the right bin size for your household. Smaller trash bins reduce your quarterly bill.
                </p>
              </div>

              {/* Trash Cart Selection */}
              <div className="space-y-2.5">
                <label className="font-bold text-slate-900 text-sm flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Trash2 className="w-4 h-4 text-[#7A1900]" />
                    <span>Residential Trash Cart</span>
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Serial #SW-95-88421</span>
                </label>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setTrashSize("35")}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      trashSize === "35"
                        ? "border-[#7A1900] bg-red-50/50 text-[#7A1900] ring-2 ring-[#7A1900]/20"
                        : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                    }`}
                  >
                    <div className="font-black text-sm">35 Gallon</div>
                    <div className="text-xs text-slate-500 mt-0.5">Small / 1-2 people</div>
                    <div className="font-mono font-bold text-sm mt-2">$19.50/mo</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTrashSize("65")}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      trashSize === "65"
                        ? "border-[#7A1900] bg-red-50/50 text-[#7A1900] ring-2 ring-[#7A1900]/20"
                        : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                    }`}
                  >
                    <div className="font-black text-sm">65 Gallon</div>
                    <div className="text-xs text-slate-500 mt-0.5">Medium / Standard</div>
                    <div className="font-mono font-bold text-sm mt-2">$26.50/mo</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTrashSize("95")}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      trashSize === "95"
                        ? "border-[#7A1900] bg-red-50/50 text-[#7A1900] ring-2 ring-[#7A1900]/20"
                        : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                    }`}
                  >
                    <div className="font-black text-sm">95 Gallon</div>
                    <div className="text-xs text-slate-500 mt-0.5">Large / Family (Current)</div>
                    <div className="font-mono font-bold text-sm mt-2">$34.50/mo</div>
                  </button>
                </div>
              </div>

              {/* Recycling Cart Selection */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                <label className="font-bold text-slate-900 text-sm flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-blue-600" />
                    <span>Single-Stream Recycling Cart</span>
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Serial #RC-65-10294</span>
                </label>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRecycleSize("35")}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      recycleSize === "35"
                        ? "border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-600/20"
                        : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                    }`}
                  >
                    <div className="font-black text-sm">35 Gallon</div>
                    <div className="text-xs text-slate-500 mt-0.5">Compact Cart</div>
                    <div className="font-mono font-bold text-sm mt-2">Included</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRecycleSize("65")}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      recycleSize === "65"
                        ? "border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-600/20"
                        : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                    }`}
                  >
                    <div className="font-black text-sm">65 Gallon</div>
                    <div className="text-xs text-slate-500 mt-0.5">Standard (Current)</div>
                    <div className="font-mono font-bold text-sm mt-2">Included</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRecycleSize("95")}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      recycleSize === "95"
                        ? "border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-600/20"
                        : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                    }`}
                  >
                    <div className="font-black text-sm">95 Gallon</div>
                    <div className="text-xs text-slate-500 mt-0.5">High Volume (Free)</div>
                    <div className="font-mono font-bold text-sm mt-2">Included</div>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleSaveSizes}
                disabled={saveSuccess}
                className="w-full bg-[#7A1900] hover:bg-[#581200] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 text-sm"
              >
                {saveSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Cart Swap Requested! Dispatched for Thursday.</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Cart Selection & Schedule Swap</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Tab 2: Yard Waste & Seasonal Dates */}
          {activeTab === "yard_waste" && (
            <div className="space-y-4 text-sm">
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 font-black text-emerald-950 text-base">
                    <Leaf className="w-5 h-5 text-emerald-600" />
                    <span>Seasonal Yard Waste & Organics</span>
                  </div>
                  <span className="bg-emerald-200/80 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    Active Subscription
                  </span>
                </div>

                <p className="text-emerald-900 leading-relaxed text-sm">
                  You are enrolled in weekly curbside yard waste & organics collection for the 2026 season.
                </p>

                {/* Clear Season Schedule Box */}
                <div className="bg-white/95 border border-emerald-200/80 rounded-2xl p-4 space-y-2.5 font-mono text-xs sm:text-sm text-emerald-950">
                  <div className="flex justify-between border-b border-emerald-100 pb-2">
                    <span>🌱 Season Start:</span>
                    <strong>Wednesday, April 15, 2026</strong>
                  </div>
                  <div className="flex justify-between border-b border-emerald-100 pb-2 text-[#7A1900]">
                    <span>🍂 Final Fall Collection Day:</span>
                    <strong>Friday, November 28, 2026</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>❄️ Winter Pause Period:</span>
                    <span>Dec 1, 2026 – April 14, 2027</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold pt-1">
                    <span>🌻 2027 Season Resumes:</span>
                    <span>Thursday, April 15, 2027</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-sm">
                <span className="font-bold text-slate-900 block">Yard Waste Service Details:</span>
                <div className="space-y-1.5 text-slate-600 text-xs sm:text-sm">
                  <div>• <strong>Rate:</strong> $135.00 / season (Billed quarterly at $45.00/qtr).</div>
                  <div>• <strong>Allowed:</strong> Leaves, lawn clippings, garden waste, twigs (&lt;3" diameter).</div>
                  <div>• <strong>Container:</strong> Brown 95-Gal Yard Waste Cart or Kraft compostable paper bags.</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => alert("Extra Kraft Bag pickup added for next Thursday route!")}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-center text-xs sm:text-sm transition-colors"
                >
                  + Request Extra Bag ($3.50)
                </button>
                <button
                  type="button"
                  onClick={() => alert("Your yard waste renewal preference for 2027 has been updated.")}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-center text-xs sm:text-sm transition-colors shadow-sm"
                >
                  ✓ Auto-Renew for 2027
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Cart Repair & Replacement */}
          {activeTab === "repair" && (
            <form onSubmit={handleRepairSubmit} className="space-y-4 text-sm">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1 text-slate-700">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-blue-600" />
                  <span>Free Curbside Cart Repair & Replacement</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Damaged cart? SWS maintenance swaps or repairs damaged wheels, axles, and lids free of charge on your regular service day.
                </p>
              </div>

              <div className="space-y-2.5">
                <label className="font-bold text-slate-900 text-sm block">Which container is damaged?</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "trash", label: "Trash Cart", icon: Trash2 },
                    { id: "recycle", label: "Recycling Cart", icon: RefreshCw },
                    { id: "yard", label: "Yard Waste Cart", icon: Leaf },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setRepairCart(c.id)}
                      className={`p-3 rounded-xl border text-center font-bold flex flex-col items-center gap-1.5 transition-all text-xs sm:text-sm ${
                        repairCart === c.id
                          ? "border-[#7A1900] bg-red-50/50 text-[#7A1900] ring-2 ring-[#7A1900]/20"
                          : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      <c.icon className="w-4 h-4" />
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="font-bold text-slate-900 text-sm block">What is the issue?</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "wheel", label: "Broken Wheel / Axle" },
                    { id: "lid", label: "Cracked / Missing Lid" },
                    { id: "body", label: "Cracked Body / Split Side" },
                    { id: "stolen", label: "Missing / Stolen Cart" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRepairType(r.id)}
                      className={`p-3 rounded-xl border text-left font-medium transition-all text-xs sm:text-sm ${
                        repairType === r.id
                          ? "border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-600/20 font-bold"
                          : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={repairSubmitted}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 text-sm"
              >
                {repairSubmitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Work Order Dispatched to SWS Route #4!</span>
                  </>
                ) : (
                  <>
                    <span>Submit Repair Work Order (Curbside Swap)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
