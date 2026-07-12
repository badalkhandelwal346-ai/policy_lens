import { Zap } from "lucide-react";

export default function LiveTicker() {
  const updates = [
    "AI Act Approved by Council",
    "PM-JAY Coverage Expanded to Seniors",
    "GST Council Proposes Rate Consolidation",
    "Digital India Mission Launches 6G Sub-Committee",
    "NEP 2020 Adopted by 4 More States",
    "Data Protection Board Notifies First Audit Standards",
    "Green Hydrogen Subsidy Allocations Released",
    "UCC Panel Submits Draft Recommendations"
  ];

  // Duplicate items twice to ensure gapless infinite loop
  const doubleUpdates = [...updates, ...updates, ...updates];

  return (
    <div className="relative w-full border-y border-[rgba(255,255,255,0.06)] bg-[rgba(12,18,30,0.4)] backdrop-blur-md py-3.5 overflow-hidden z-20">
      {/* Visual fading gradient mask to make scroll feel fluid */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#08111F] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#08111F] to-transparent z-10 pointer-events-none" />

      <div className="animate-ticker flex whitespace-nowrap items-center">
        {doubleUpdates.map((text, i) => (
          <div key={i} className="inline-flex items-center mx-8 gap-3 shrink-0">
            <Zap className="h-4.5 w-4.5 text-cyan-400 fill-cyan-400/20" />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-gray-200">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
