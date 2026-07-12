import { useState } from "react";
import { POLICIES } from "../data";
import { Policy } from "../types";
import { motion } from "motion/react";
import { Columns, ArrowLeftRight, Check, X, Shield, Users, Activity, HelpCircle } from "lucide-react";

export default function CompareSection() {
  const [policyAId, setPolicyAId] = useState(POLICIES[0].id);
  const [policyBId, setPolicyBId] = useState(POLICIES[1].id);
  const [isCompared, setIsCompared] = useState(true);

  const policyA = POLICIES.find((p) => p.id === policyAId) || POLICIES[0];
  const policyB = POLICIES.find((p) => p.id === policyBId) || POLICIES[1];

  const handleCompare = () => {
    setIsCompared(true);
  };

  return (
    <section className="relative py-16 px-4 md:px-8 max-w-7xl mx-auto" id="compare-section">
      <div className="radial-glow top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/5" />
      <div className="radial-glow bottom-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/5" />

      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-semibold text-blue-300 uppercase tracking-widest">
          <Columns className="h-3.5 w-3.5" />
          <span>Policy Comparison Matrix</span>
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mt-3">
          Compare National Frameworks Side-By-Side
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-2xl mx-auto">
          Audit systemic trade-offs, target cohorts, budgetary pressures, and implementation tracks across independent government actions.
        </p>
      </div>

      {/* Selector Row */}
      <div className="glass-card rounded-2xl p-6 border border-white/5 mb-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          
          {/* Policy A Dropdown */}
          <div className="md:col-span-5 flex flex-col gap-2">
            <label className="text-[11px] font-bold font-mono text-cyan-400 uppercase tracking-widest">Select Policy Alpha</label>
            <select
              value={policyAId}
              onChange={(e) => setPolicyAId(e.target.value)}
              className="w-full bg-[#0c1220] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
              id="compare-selector-a"
            >
              {POLICIES.map((p) => (
                <option key={p.id} value={p.id} disabled={p.id === policyBId}>
                  {p.title} ({p.badge})
                </option>
              ))}
            </select>
          </div>

          {/* VS Divider Icon */}
          <div className="md:col-span-1 flex justify-center text-gray-500 py-2 md:py-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/5 text-cyan-400 font-bold">
              <ArrowLeftRight className="h-4 w-4" />
            </div>
          </div>

          {/* Policy B Dropdown */}
          <div className="md:col-span-5 flex flex-col gap-2">
            <label className="text-[11px] font-bold font-mono text-cyan-400 uppercase tracking-widest">Select Policy Beta</label>
            <select
              value={policyBId}
              onChange={(e) => setPolicyBId(e.target.value)}
              className="w-full bg-[#0c1220] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
              id="compare-selector-b"
            >
              {POLICIES.map((p) => (
                <option key={p.id} value={p.id} disabled={p.id === policyAId}>
                  {p.title} ({p.badge})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Action button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleCompare}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
            id="compare-submit-btn"
          >
            Compute Comparison Grid
          </button>
        </div>
      </div>

      {/* Comparison Grid Results */}
      {isCompared && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl glass-card overflow-hidden border border-white/5 shadow-2xl"
          id="comparison-table-wrapper"
        >
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-white/[0.02] border-b border-white/5 text-center font-display">
            <div className="md:col-span-4 p-5 text-left text-xs uppercase font-mono font-semibold tracking-wider text-gray-400 flex items-center">
              Comparative Metrics
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-cyan-400 font-bold text-sm">
              {policyA.title}
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-emerald-400 font-bold text-sm">
              {policyB.title}
            </div>
          </div>

          {/* Category Metric */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/5 text-sm">
            <div className="md:col-span-4 p-5 font-semibold text-gray-300">
              Regulatory Scope
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-gray-200">
              <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full text-xs font-semibold">
                {policyA.badge}
              </span>
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-gray-200">
              <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold">
                {policyB.badge}
              </span>
            </div>
          </div>

          {/* Difficulty Metric */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/5 text-sm">
            <div className="md:col-span-4 p-5 font-semibold text-gray-300">
              Cognitive Complexity
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-gray-200 font-mono">
              {policyA.difficulty}
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-gray-200 font-mono">
              {policyB.difficulty}
            </div>
          </div>

          {/* Enacted Budget Metric */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/5 text-sm">
            <div className="md:col-span-4 p-5 font-semibold text-gray-300">
              Budgetary Volume / Cost
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-cyan-300 font-mono font-medium">
              {policyA.budget}
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-emerald-300 font-mono font-medium">
              {policyB.budget}
            </div>
          </div>

          {/* Affected Groups Metric */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/5 text-sm">
            <div className="md:col-span-4 p-5 font-semibold text-gray-300">
              Target Cohorts & Affected Groups
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-gray-300 flex flex-wrap gap-1">
              {policyA.affectedGroups.map((group, idx) => (
                <span key={idx} className="bg-white/5 rounded px-2 py-0.5 text-xs">
                  {group}
                </span>
              ))}
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-gray-300 flex flex-wrap gap-1">
              {policyB.affectedGroups.map((group, idx) => (
                <span key={idx} className="bg-white/5 rounded px-2 py-0.5 text-xs">
                  {group}
                </span>
              ))}
            </div>
          </div>

          {/* Enacted Year Metric */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/5 text-sm">
            <div className="md:col-span-4 p-5 font-semibold text-gray-300">
              Execution / Launch Year
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-gray-300 font-mono">
              {policyA.implementationYear}
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-gray-300 font-mono">
              {policyB.implementationYear}
            </div>
          </div>

          {/* Direct Pros Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/5 text-sm">
            <div className="md:col-span-4 p-5 font-semibold text-gray-300">
              Core Advantages
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-gray-300 space-y-2.5">
              {policyA.pros.map((pro, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span className="text-xs leading-relaxed">{pro}</span>
                </div>
              ))}
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-gray-300 space-y-2.5">
              {policyB.pros.map((pro, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span className="text-xs leading-relaxed">{pro}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Cons Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/5 text-sm">
            <div className="md:col-span-4 p-5 font-semibold text-gray-300">
              Risks & Systemic Concerns
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-gray-300 space-y-2.5">
              {policyA.cons.map((con, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-red-400 font-bold shrink-0">✗</span>
                  <span className="text-xs leading-relaxed">{con}</span>
                </div>
              ))}
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-gray-300 space-y-2.5">
              {policyB.cons.map((con, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-red-400 font-bold shrink-0">✗</span>
                  <span className="text-xs leading-relaxed">{con}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Status Metric */}
          <div className="grid grid-cols-1 md:grid-cols-12 text-sm">
            <div className="md:col-span-4 p-5 font-semibold text-gray-300">
              Sovereign Progress Status
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-gray-300 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-semibold text-white">{policyA.status}</span>
            </div>
            <div className="md:col-span-4 p-5 border-l border-white/5 text-gray-300 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">{policyB.status}</span>
            </div>
          </div>

        </motion.div>
      )}
    </section>
  );
}
