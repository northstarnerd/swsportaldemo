"use client";

import React, { useState } from "react";
import { Info, X } from "lucide-react";

interface FeatureBubbleProps {
  title: string;
  description: string;
  benefit: string;
  position?: "top" | "bottom" | "left" | "right";
  visible: boolean;
}

export function FeatureBubble({
  title,
  description,
  benefit,
  position = "top",
  visible,
}: FeatureBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!visible) return null;

  return (
    <div className="relative inline-flex items-center z-20">
      {/* Subtle Tiny Info Dot */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        title={`Pitch note: ${title}`}
        className="w-4 h-4 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer ml-1"
      >
        <Info className="w-2.5 h-2.5" />
      </button>

      {/* Popover Callout */}
      {isOpen && (
        <div
          className={`absolute ${
            position === "top"
              ? "bottom-full mb-2 left-0"
              : position === "bottom"
              ? "top-full mt-2 left-0"
              : position === "right"
              ? "left-full ml-2 top-0"
              : "right-full mr-2 top-0"
          } w-72 bg-slate-900 text-white rounded-2xl p-3.5 shadow-2xl border border-slate-700 z-50 text-left animate-fade-in`}
        >
          <div className="flex items-start justify-between gap-2 pb-1.5 border-b border-slate-800">
            <span className="font-bold text-xs text-slate-200">
              💡 {title}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {description}
          </p>

          <div className="mt-2 bg-slate-800/80 rounded-xl p-2.5 text-xs text-slate-300">
            <strong className="text-amber-400">💼 Value to SWS:</strong> {benefit}
          </div>
        </div>
      )}
    </div>
  );
}
