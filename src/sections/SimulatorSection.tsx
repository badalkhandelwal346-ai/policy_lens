import { useState, useEffect } from "react";
import { POLICIES } from "../data";
import { SimulationResult } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, Sparkles, Loader2, Play, RefreshCw, BarChart2, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function SimulatorSection() {
  const [selectedPolicyTitle, setSelectedPolicyTitle] = useState(POLICIES[0].title);
  
  // Slider states
  const [budget, setBudget] = useState(10);
  const [taxes, setTaxes] = useState(5);
  const [education, setEducation] = useState(15);
  const [healthcare, setHealthcare] = useState(12);
  const [inflation, setInflation] = useState(4);

  // Simulation results
  const [result, setResult] = useState<SimulationResult>({
    economicIndicator: 15,
    socialWellbeing: 35,
    publicApproval: 48,
    fiscalDeficitImpact: -10,
    shortSummary: "Initial balanced baseline projection configured.",
    analysisText: "* **Stable Growth Paths**: A moderate tax base funds fundamental social frameworks without crushing enterprise initiatives.\n* **Deficit Caution**: Spending must remain anchored by recurring receipts to avoid inflationary spirals.\n* **Approval Balance**: Broad civic support achieved through steady infrastructure reinvestments."
  });
  const [isLoading, setIsLoading] = useState(false);

  const runSimulation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          policy: selectedPolicyTitle,
          sliders: {
            budget,
            taxes,
            education,
            healthcare,
            inflation
          }
        })
      });

      if (!response.ok) {
        throw new Error("Simulation server failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Simulation error:", err);
      // Fallback calculations in case of api error
      setResult({
        economicIndicator: Math.min(100, Math.max(-100, budget * 1.5 - taxes * 2)),
        socialWellbeing: Math.min(100, Math.max(-100, education * 2 + healthcare * 2.5 - inflation * 3)),
        publicApproval: Math.min(100, Math.max(-100, education * 1.5 + healthcare * 1.5 - taxes * 1.8)),
        fiscalDeficitImpact: Math.min(100, Math.max(-100, taxes * 3.5 - budget * 2.5)),
        shortSummary: "Fallback structural simulation computed on client due to API timeout.",
        analysisText: "* **Tax Pressures**: Adjusting corporate levies triggers proportional shifts in hiring pipelines.\n* **Welfare Gains**: Healthcare and educational spending display highly compound long-run social multipliers.\n* **Inflationary friction**: Deficit financing via currency pressure compromises consumer basket purchasing power."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Run simulation on mount
  useEffect(() => {
    runSimulation();
  }, []);

  const handleReset = () => {
    setBudget(10);
    setTaxes(5);
    setEducation(15);
    setHealthcare(12);
    setInflation(4);
  };

  return (
    <section className="relative py-16 px-4 md:px-8 max-w-7xl mx-auto" id="simulator-section">
      <div className="radial-glow top-0 right-1/4 w-[500px] h-[300px] bg-cyan-500/5" />
      <div className="radial-glow bottom-0 left-1/4 w-[500px] h-[300px] bg-purple-500/5" />

      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-semibold text-cyan-300 uppercase tracking-widest">
          <Sliders className="h-3.5 w-3.5" />
          <span>Interactive Sandbox Engine</span>
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mt-3">
          What Happens If This Policy Changes?
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-2xl mx-auto">
          Adjust fiscal and social inputs dynamically to trigger macro-economic projections computed by our server-side AI policy models.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="simulator-container">
        
        {/* LEFT COLUMN: GRANULAR CONTROLS */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-white/5 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h3 className="font-display font-bold text-white text-base">Modulation Deck</h3>
              <p className="text-[11px] text-gray-400">Tweak social indicators and public assets</p>
            </div>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all"
              title="Reset Sliders"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Active Target Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold font-mono text-cyan-400 uppercase tracking-widest">Simulation Baseline Target</label>
            <select
              value={selectedPolicyTitle}
              onChange={(e) => setSelectedPolicyTitle(e.target.value)}
              className="w-full bg-[#0c1220] border border-white/10 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-cyan-500"
              id="simulator-policy-select"
            >
              {POLICIES.map((p) => (
                <option key={p.id} value={p.title}>{p.title}</option>
              ))}
            </select>
          </div>

          {/* Slider 1: Budget */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-gray-300">Budget Allocation</span>
              <span className="font-mono text-cyan-400 font-bold">{(budget >= 0 ? "+" : "") + budget}%</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              onMouseUp={runSimulation}
              onTouchEnd={runSimulation}
              className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              id="slider-budget"
            />
            <div className="flex justify-between text-[9px] text-gray-500 font-mono">
              <span>-50% Cuts</span>
              <span>Baseline</span>
              <span>+50% Inflows</span>
            </div>
          </div>

          {/* Slider 2: Taxes */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-gray-300">Tax rate adjustment</span>
              <span className="font-mono text-cyan-400 font-bold">{(taxes >= 0 ? "+" : "") + taxes}%</span>
            </div>
            <input
              type="range"
              min="-20"
              max="20"
              value={taxes}
              onChange={(e) => setTaxes(parseInt(e.target.value))}
              onMouseUp={runSimulation}
              onTouchEnd={runSimulation}
              className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              id="slider-taxes"
            />
            <div className="flex justify-between text-[9px] text-gray-500 font-mono">
              <span>-20% Slash</span>
              <span>Baseline</span>
              <span>+20% Surcharges</span>
            </div>
          </div>

          {/* Slider 3: Education */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-gray-300">Education spending</span>
              <span className="font-mono text-cyan-400 font-bold">{(education >= 0 ? "+" : "") + education}%</span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              value={education}
              onChange={(e) => setEducation(parseInt(e.target.value))}
              onMouseUp={runSimulation}
              onTouchEnd={runSimulation}
              className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              id="slider-education"
            />
            <div className="flex justify-between text-[9px] text-gray-500 font-mono">
              <span>-30% Reduction</span>
              <span>Baseline</span>
              <span>+30% Infusion</span>
            </div>
          </div>

          {/* Slider 4: Healthcare */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-gray-300">Healthcare support</span>
              <span className="font-mono text-cyan-400 font-bold">{(healthcare >= 0 ? "+" : "") + healthcare}%</span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              value={healthcare}
              onChange={(e) => setHealthcare(parseInt(e.target.value))}
              onMouseUp={runSimulation}
              onTouchEnd={runSimulation}
              className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              id="slider-healthcare"
            />
            <div className="flex justify-between text-[9px] text-gray-500 font-mono">
              <span>-30% Reduction</span>
              <span>Baseline</span>
              <span>+30% Support</span>
            </div>
          </div>

          {/* Slider 5: Inflation */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-gray-300">Target inflation pressure</span>
              <span className="font-mono text-cyan-400 font-bold">{inflation}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={inflation}
              onChange={(e) => setInflation(parseInt(e.target.value))}
              onMouseUp={runSimulation}
              onTouchEnd={runSimulation}
              className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              id="slider-inflation"
            />
            <div className="flex justify-between text-[9px] text-gray-500 font-mono">
              <span>0% Flat deflation</span>
              <span>Target 4%</span>
              <span>15% Hyperinflation</span>
            </div>
          </div>

          {/* Trigger button manual */}
          <button
            onClick={runSimulation}
            disabled={isLoading}
            className="w-full h-11 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 flex items-center justify-center gap-2 text-xs font-semibold text-cyan-300 transition-all cursor-pointer"
            id="simulator-run-btn"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-cyan-400" /> : <Play className="h-4 w-4 text-cyan-400" />}
            <span>Manual Re-Compute Simulation</span>
          </button>
        </div>

        {/* RIGHT COLUMN: PROJECTIONS & AI GAUGES */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Projection Indicator Dashboard */}
          <div className="grid grid-cols-2 gap-4" id="projection-indicators-grid">
            
            {/* Economic Outlook Outlook */}
            <div className="glass-card rounded-2xl p-5 border border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent">
              <span className="text-[10px] font-bold font-mono text-gray-500 uppercase tracking-widest">Economic Outlook</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-white">{result.economicIndicator}%</span>
                <span className={`text-[10px] font-bold font-mono ${result.economicIndicator >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {result.economicIndicator >= 0 ? "SURGE" : "RECESSIVE"}
                </span>
              </div>
              <div className="mt-4 w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${result.economicIndicator >= 0 ? "bg-cyan-500" : "bg-red-500"}`} 
                  style={{ width: `${Math.abs(result.economicIndicator)}%` }} 
                />
              </div>
            </div>

            {/* Social Well-being Indicator */}
            <div className="glass-card rounded-2xl p-5 border border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent">
              <span className="text-[10px] font-bold font-mono text-gray-500 uppercase tracking-widest">Social Well-being Index</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-white">{result.socialWellbeing}%</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">HEALTHY</span>
              </div>
              <div className="mt-4 w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-emerald-400 transition-all duration-1000" 
                  style={{ width: `${Math.abs(result.socialWellbeing)}%` }} 
                />
              </div>
            </div>

            {/* Public Approval Indicator */}
            <div className="glass-card rounded-2xl p-5 border border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent">
              <span className="text-[10px] font-bold font-mono text-gray-500 uppercase tracking-widest">Public Approval Index</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-white">{result.publicApproval}%</span>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">STABLE</span>
              </div>
              <div className="mt-4 w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-cyan-400 transition-all duration-1000" 
                  style={{ width: `${Math.abs(result.publicApproval)}%` }} 
                />
              </div>
            </div>

            {/* Fiscal Deficit Index */}
            <div className="glass-card rounded-2xl p-5 border border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent">
              <span className="text-[10px] font-bold font-mono text-gray-500 uppercase tracking-widest">Budget Deficit pressure</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-white">{(result.fiscalDeficitImpact >= 0 ? "+" : "") + result.fiscalDeficitImpact}%</span>
                <span className={`text-[10px] font-bold font-mono ${result.fiscalDeficitImpact <= 0 ? "text-emerald-400" : "text-amber-500"}`}>
                  {result.fiscalDeficitImpact <= 0 ? "SURPLUS EFFECT" : "DEFICIT DEBT"}
                </span>
              </div>
              <div className="mt-4 w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${result.fiscalDeficitImpact <= 0 ? "bg-emerald-400" : "bg-amber-500"}`} 
                  style={{ width: `${Math.abs(result.fiscalDeficitImpact)}%` }} 
                />
              </div>
            </div>

          </div>

          {/* AI-Generated Explanations Panel */}
          <div className="glass-card rounded-2xl border border-cyan-500/20 overflow-hidden flex-1 relative flex flex-col" id="simulator-terminal">
            <div className="px-5 py-3 bg-cyan-950/20 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
                Live AI Scenario Assessment
              </span>
              <span className="text-[9px] font-mono text-gray-500">SYSTEM COORD: S-0089A</span>
            </div>

            <div className="p-6 bg-[#0c1220]/75 flex-1 relative min-h-[220px]">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0c1220]/90 z-10"
                  >
                    <Loader2 className="h-7 w-7 animate-spin text-cyan-400" />
                    <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest animate-pulse">Modeling multi-sector matrices...</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="space-y-4" id="simulation-output-text">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold block mb-1">Headline Projection Impact</span>
                  <p className="text-xs sm:text-sm font-semibold text-gray-100 leading-relaxed">
                    "{result.shortSummary}"
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 font-bold block mb-2">Detailed Socio-Economic Assessment</span>
                  <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-gray-300 leading-relaxed space-y-3 pl-1">
                    {/* Render analysisText with list bullet points */}
                    <div dangerouslySetInnerHTML={{ 
                      __html: result.analysisText
                        .replace(/\* \*\*(.*?)\*\*/g, '<strong class="text-cyan-300">$1</strong>')
                        .replace(/\* /g, '<div class="flex items-start gap-2.5 mb-2"><span class="text-cyan-400 font-bold">•</span><span>')
                        .replace(/\n/g, '</span></div>') + '</span></div>'
                    }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-white/5 bg-[#0c1220] flex justify-between text-[9px] font-mono text-gray-500">
              <span>STABILITY TOLERANCE: ±3.45%</span>
              <span>GENAI-FLASH-3.5 INTEGRATION</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
