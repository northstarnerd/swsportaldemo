"use client";

import React, { useState } from "react";
import { X, Plus, Package, Sofa, Tv, Check, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface ExtraServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSuccess: (itemName: string, cost: number) => void;
}

export function ExtraServiceModal({ isOpen, onClose, onBookSuccess }: ExtraServiceModalProps) {
  const [selectedItem, setSelectedItem] = useState<{ name: string; price: number } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const catalog = [
    {
      id: "extra-bag",
      name: "Extra Trash Bag Tag (Up to 32 Gallons)",
      price: 5.0,
      description: "Leave an extra 32-gal bag next to your 96-gal cart this Thursday.",
      icon: <Package className="w-5 h-5 text-amber-600" />,
    },
    {
      id: "bulky-mattress",
      name: "Mattress / Box Spring Pickup",
      price: 35.0,
      description: "Curbside pickup for 1 mattress or box spring on Thursday.",
      icon: <Sofa className="w-5 h-5 text-blue-600" />,
    },
    {
      id: "bulky-couch",
      name: "Couch / Furniture Item",
      price: 35.0,
      description: "Curbside pickup for 1 standard sofa, recliner, or dining table.",
      icon: <Sofa className="w-5 h-5 text-purple-600" />,
    },
    {
      id: "appliance",
      name: "Major Appliance / Electronics (Certified Recycling)",
      price: 45.0,
      description: "State-certified disposal for refrigerator, washer, dryer, or TV.",
      icon: <Tv className="w-5 h-5 text-emerald-600" />,
    },
  ];

  const handleCheckout = () => {
    if (!selectedItem) return;
    setIsSuccess(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
    });

    setTimeout(() => {
      onBookSuccess(selectedItem.name, selectedItem.price);
      onClose();
      setIsSuccess(false);
      setSelectedItem(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7A1900] to-[#9E2A0D] p-5 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">On-Demand Curbside Add-Ons</h3>
            <p className="text-sm text-red-100 mt-0.5">Scheduled for Upcoming Thursday Pickup in Eden Prairie</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-xl font-black text-slate-900">Pickup Scheduled!</h4>
            <p className="text-sm text-slate-600">
              <strong>{selectedItem?.name}</strong> has been added to Thursday’s route manifest. Place items curbside by 6:30 AM.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <p className="text-sm text-slate-600 font-medium">
              Select an item below to automatically add a work order to Thursday’s route manifest without calling the office:
            </p>

            <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
              {catalog.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    selectedItem?.name === item.name
                      ? "border-[#7A1900] bg-red-50/50 shadow-xs"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-slate-900">{item.name}</h5>
                      <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-black text-base text-slate-900">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {selectedItem && (
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#7A1900] hover:bg-[#581200] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <span>Pay ${selectedItem.price.toFixed(2)} with Pay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Instant Driver Manifest Sync • No phone calls needed</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
