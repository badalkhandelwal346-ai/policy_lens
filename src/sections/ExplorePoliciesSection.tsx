import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { POLICIES, CATEGORIES } from "../data";
import { Policy } from "../types";
import StakeholderNetwork from "../components/StakeholderNetwork";
import { 
  Search, Mic, Sparkles, Filter, ChevronRight, X, ArrowRight,
  TrendingUp, BookOpen, HeartPulse, Cpu, Sprout, Leaf, Scale, Shield,
  CheckCircle, HelpCircle, Loader2, Info, BookOpenCheck, Sliders, Zap
} from "lucide-react";

// Helper to map category icons dynamically
const iconMap: { [key: string]: any } = {
  TrendingUp, BookOpen, HeartPulse, Cpu, Sprout, Leaf, Scale, Shield
};

export default function ExplorePoliciesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  // AI Search states
  const [aiInput, setAiInput] = useState("");
  const [aiPersona, setAiPersona] = useState<"Standard" | "15yo" | "Economic" | "Stakeholder">("Standard");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeSearchPolicy, setActiveSearchPolicy] = useState<string>("Global AI Act");

  // Filtering logic
  const filteredPolicies = POLICIES.filter((policy) => {
    const matchesSearch = policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          policy.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || policy.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || policy.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSuggestClick = (query: string, policyName: string) => {
    setAiInput(query);
    setActiveSearchPolicy(policyName);
    triggerAiExplain(query, policyName);
  };

  const triggerAiExplain = async (query: string, policy: string) => {
    const q = query || aiInput;
    const p = policy || activeSearchPolicy;
    if (!q.trim()) return;

    setIsAiLoading(true);
    setAiAnswer(null);

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          policy: p,
          query: q,
          persona: aiPersona
        })
      });

      if (!response.ok) {
        throw new Error("Explain API failed");
      }

      const data = await response.json();
      setAiAnswer(data.text);
    } catch (err) {
      console.error("AI Explain error:", err);
      setAiAnswer("Unable to coordinate with the PolicyLens AI center. Please check your system configuration (GEMINI_API_KEY) and try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Re-run explain when persona switches and there's a prompt
  useEffect(() => {
    if (aiInput && aiAnswer) {
      triggerAiExplain(aiInput, activeSearchPolicy);
    }
  }, [aiPersona]);

  return (
    <section className="relative py-16 px-4 md:px-8 max-w-7xl mx-auto" id="explore-section">
      
      {/* ==================================================
          AI SEARCH BAR (ASK ANYTHING SECTION)
          ================================================== */}
      <div className="mb-20 relative" id="ai-search-anchor">
        <div className="radial-glow top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-400/5" />
        
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-semibold text-cyan-300 uppercase tracking-widest"
          >
            <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
            <span>Generative AI Explainer</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mt-3">
            Ask Anything About Any Policy
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-2xl mx-auto">
            Leverage live server-side LLM models to digest complex legal structures in seconds. Choose your perspective below.
          </p>
        </div>

        {/* Search Bar Wrapper */}
        <div className="max-w-3xl mx-auto rounded-2xl p-1 bg-gradient-to-r from-blue-500/20 via-cyan-500/30 to-emerald-500/20 shadow-xl shadow-cyan-950/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              triggerAiExplain(aiInput, activeSearchPolicy);
            }}
            className="flex items-center gap-2 bg-[#0c1220]/95 backdrop-blur-md rounded-xl px-4 py-3"
            id="ai-search-form"
          >
            <Search className="h-5 w-5 text-gray-500 shrink-0" />
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Explain the Data Protection Act like I'm 15..."
              className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-gray-500"
              id="ai-search-input"
            />
            {/* Quick target policy picker */}
            <select
              value={activeSearchPolicy}
              onChange={(e) => setActiveSearchPolicy(e.target.value)}
              className="hidden sm:block bg-white/[0.04] border border-white/10 text-gray-300 rounded-lg text-xs px-2.5 py-1.5 focus:outline-none"
              id="ai-search-policy-picker"
            >
              {POLICIES.map(p => (
                <option key={p.id} value={p.title} className="bg-[#0c1220]">{p.badge}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => alert("Voice transcription requires microphone iframe permissions. Please type your query in the prompt box.")}
              className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors shrink-0"
              title="Voice Input"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              disabled={isAiLoading || !aiInput.trim()}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-lg px-4 py-1.5 text-xs font-semibold disabled:opacity-40 shrink-0 shadow-lg shadow-cyan-500/20"
              id="ai-search-submit-btn"
            >
              {isAiLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
              <span>Explain</span>
            </button>
          </form>
        </div>

        {/* Suggestion Chips */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-2xl mx-auto" id="suggestion-chips-container">
          <span className="text-xs text-gray-500 font-medium py-1">Try suggestions:</span>
          <button
            onClick={() => handleSuggestClick("Explain GST like I'm 15 years old", "Goods and Services Tax (GST)")}
            className="text-xs font-medium text-gray-400 hover:text-cyan-300 bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-950/10 px-3 py-1 rounded-full transition-all"
          >
            Explain GST like I'm 15
          </button>
          <button
            onClick={() => handleSuggestClick("Summarize the main provisions and stakeholder opposition of the Farm Bills", "Agricultural Trade & Pricing Framework")}
            className="text-xs font-medium text-gray-400 hover:text-cyan-300 bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-950/10 px-3 py-1 rounded-full transition-all"
          >
            Farm Bills Opposition
          </button>
          <button
            onClick={() => handleSuggestClick("What is the Uniform Civil Code and why is it debated?", "Global Artificial Intelligence Act")}
            className="text-xs font-medium text-gray-400 hover:text-cyan-300 bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-950/10 px-3 py-1 rounded-full transition-all"
          >
            What is UCC?
          </button>
          <button
            onClick={() => handleSuggestClick("Describe how NEP transforms the undergraduate college degree structure", "National Education Policy (NEP)")}
            className="text-xs font-medium text-gray-400 hover:text-cyan-300 bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-950/10 px-3 py-1 rounded-full transition-all"
          >
            Education Policy reforms
          </button>
          <button
            onClick={() => handleSuggestClick("What are the 4 risk levels defined in the AI Act?", "Global Artificial Intelligence Act")}
            className="text-xs font-medium text-gray-400 hover:text-cyan-300 bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-950/10 px-3 py-1 rounded-full transition-all"
          >
            AI Act Risk Tiers
          </button>
        </div>

        {/* AI Answer Container */}
        <AnimatePresence>
          {(aiAnswer || isAiLoading) && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-8 max-w-3xl mx-auto rounded-2xl glass-card border border-cyan-500/20 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.1)]"
              id="ai-answer-container"
            >
              {/* Persona Selector Panel */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-gradient-to-r from-cyan-950/30 to-blue-950/20 border-b border-white/5">
                <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                  Perspective:
                </span>
                <div className="flex gap-1">
                  {(["Standard", "15yo", "Economic", "Stakeholder"] as const).map((persona) => (
                    <button
                      key={persona}
                      onClick={() => setAiPersona(persona)}
                      disabled={isAiLoading}
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-md transition-all ${
                        aiPersona === persona
                          ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
                          : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      {persona === "Standard" && "Comprehensive"}
                      {persona === "15yo" && "Simplifier (15yo)"}
                      {persona === "Economic" && "Finance/GDP"}
                      {persona === "Stakeholder" && "Alliances"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Response Block */}
              <div className="p-6 bg-[#0c1220]/75 min-h-[120px] relative">
                {isAiLoading ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
                    <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest animate-pulse">Consulting sovereign archives...</span>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-200 text-sm leading-relaxed prose prose-invert max-w-none"
                  >
                    <div className="flex items-start gap-3 bg-cyan-950/20 border border-cyan-500/10 rounded-xl p-4.5 mb-5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-cyan-400/10 text-cyan-400">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold text-cyan-300 uppercase tracking-wider">AI-Grounded Analysis ({activeSearchPolicy})</span>
                        <span className="text-xs text-gray-400">Synthesized using deep neural structural mappings of the official bill draft.</span>
                      </div>
                    </div>

                    {/* Pre-format raw markdown block clearly */}
                    <div className="whitespace-pre-wrap font-sans text-gray-300 text-xs sm:text-sm pl-2 space-y-2 border-l border-white/5">
                      {aiAnswer}
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                      <span>VERIFICATION CODE: POL-889X</span>
                      <span>GENAI-FLASH-3.5-GROUNDED</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==================================================
          MAIN DIRECTORY CONTROLS
          ================================================== */}
      <div className="mb-8" id="explore-directory-header">
        <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
          <BookOpenCheck className="h-5 w-5 text-cyan-400" />
          Active Policy Directory
        </h3>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-[rgba(12,18,30,0.3)] border border-white/5 rounded-2xl p-4 backdrop-blur-md">
          {/* Categories Horizontal flow */}
          <div className="flex flex-wrap gap-1.5" id="category-filter-chips">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`text-xs font-medium px-3.5 py-2 rounded-xl border transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                  : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white"
              }`}
            >
              All Topics
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-medium px-3.5 py-2 rounded-xl border flex items-center gap-1.5 transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                    : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <span>{cat.title}</span>
                <span className="text-[10px] opacity-60 font-mono bg-white/5 rounded px-1">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Search Input Filter */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter active laws..."
              className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.05] border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-cyan-500/30 transition-colors"
              id="directory-filter-input"
            />
          </div>
        </div>
      </div>

      {/* ==================================================
          POLICY CARDS GRID
          ================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="policy-cards-grid">
        {filteredPolicies.map((policy) => (
          <motion.div
            key={policy.id}
            layoutId={`card-container-${policy.id}`}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative rounded-2xl glass-card flex flex-col border border-white/5 overflow-hidden transition-all duration-300 hover:border-cyan-500/20 hover:shadow-[0_10px_30px_rgba(6,182,212,0.08)] bg-gradient-to-b from-white/[0.02] to-transparent"
            id={`policy-card-${policy.id}`}
          >
            {/* Visual Cover Header */}
            <div className="h-3.5 w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-400 opacity-60" />

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-cyan-400/10 border border-cyan-500/20 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-cyan-300 uppercase">
                  {policy.badge}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-gray-400">
                    {policy.readTime} read
                  </span>
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    policy.status === 'Implemented' || policy.status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`} />
                </div>
              </div>

              <h4 className="mt-4 font-display text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                {policy.title}
              </h4>

              <p className="mt-2 text-xs text-gray-400 leading-relaxed flex-1">
                {policy.description}
              </p>

              {/* Micro specs row */}
              <div className="mt-4 grid grid-cols-2 gap-2 border-y border-white/5 py-3 text-[11px] font-mono">
                <div>
                  <span className="text-gray-500 block">Difficulty</span>
                  <span className={`font-semibold ${
                    policy.difficulty === 'Hard' ? 'text-red-400' : policy.difficulty === 'Medium' ? 'text-yellow-400' : 'text-emerald-400'
                  }`}>
                    {policy.difficulty}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Sovereign Status</span>
                  <span className="text-gray-300 font-semibold">{policy.status}</span>
                </div>
              </div>

              {/* Pros Cons Peep */}
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-1.5">
                  <span className="h-4 w-4 shrink-0 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span className="text-[11px] text-gray-400 truncate">{policy.pros[0]}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="h-4 w-4 shrink-0 rounded bg-red-500/10 text-red-400 flex items-center justify-center text-[10px] font-bold">✗</span>
                  <span className="text-[11px] text-gray-400 truncate">{policy.cons[0]}</span>
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={() => setSelectedPolicy(policy)}
                className="mt-6 flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/30 text-xs font-semibold text-gray-200 hover:text-white transition-all cursor-pointer group/btn"
                id={`policy-card-learn-more-${policy.id}`}
              >
                <span>Learn More / Interactive Analytics</span>
                <ChevronRight className="h-4 w-4 text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}

        {filteredPolicies.length === 0 && (
          <div className="col-span-full py-12 text-center glass-card border border-dashed border-white/10 rounded-2xl p-8" id="no-policies-found">
            <Info className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
            <p className="text-gray-300 text-sm font-semibold">No policies match your search queries.</p>
            <p className="text-gray-500 text-xs mt-1">Try resetting the topic filter chips above to search the full database.</p>
          </div>
        )}
      </div>

      {/* ==================================================
          EXPANDABLE MODAL DETAIL VIEW (INTERACTIVE DRAWER)
          ================================================== */}
      <AnimatePresence>
        {selectedPolicy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex justify-center items-start p-4 md:p-8"
            id="policy-detail-overlay"
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              className="w-full max-w-5xl bg-[#08111f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative mt-4 mb-8"
              id="policy-detail-modal"
            >
              {/* Cover Ribbon */}
              <div className="h-3 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedPolicy(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                id="close-detail-modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Body */}
              <div className="p-6 md:p-10 space-y-10">
                
                {/* 1. Header Information */}
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="rounded-full bg-cyan-400/10 border border-cyan-500/20 px-3 py-0.5 text-[10px] font-bold tracking-wider text-cyan-300 uppercase">
                      {selectedPolicy.badge}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">Difficulty: {selectedPolicy.difficulty}</span>
                    <span className="text-xs text-gray-500 font-mono">•</span>
                    <span className="text-xs text-gray-500 font-mono">Fiscal Budget: {selectedPolicy.budget}</span>
                    <span className="text-xs text-gray-500 font-mono">•</span>
                    <span className="text-xs text-gray-500 font-mono">Enacted: {selectedPolicy.implementationYear}</span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-display font-extrabold text-white mt-4 tracking-tight">
                    {selectedPolicy.title}
                  </h2>
                  
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-4 max-w-4xl border-l-2 border-cyan-500/40 pl-4">
                    {selectedPolicy.fullContent || selectedPolicy.description}
                  </p>
                </div>

                {/* 2. Interactive Horizontal Timeline Track */}
                <div className="border-t border-white/5 pt-8">
                  <h3 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
                    <Zap className="h-4.5 w-4.5 text-cyan-400" />
                    Legislative Timeline Progress
                  </h3>

                  {/* Horizontal Scroll wrapper */}
                  <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin">
                    <div className="flex min-w-[800px] justify-between relative py-6">
                      {/* Timeline center line */}
                      <div className="absolute top-12 left-0 right-0 h-0.5 bg-white/[0.04]" />
                      
                      {selectedPolicy.timeline.map((event, i) => (
                        <div key={i} className="flex-1 px-3 relative z-10 text-center flex flex-col items-center">
                          {/* Circle node indicator */}
                          <div className={`h-11 w-11 rounded-full flex items-center justify-center border-2 mb-4 bg-[#08111f] ${
                            event.status === "completed" 
                              ? "border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                              : event.status === "current"
                              ? "border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse"
                              : "border-gray-600 text-gray-500"
                          }`}>
                            <span className="text-[10px] font-bold font-mono">{i + 1}</span>
                          </div>
                          
                          <span className="block text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{event.date}</span>
                          <span className="block text-xs font-bold text-white mt-1">{event.title}</span>
                          <span className="block text-[11px] text-gray-400 leading-normal mt-1 max-w-[150px] mx-auto">{event.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Interactive Stakeholder Alliance Network Map */}
                <div className="border-t border-white/5 pt-8">
                  <h3 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                    <Sliders className="h-4.5 w-4.5 text-cyan-400" />
                    Interactive Stakeholder Impact Network
                  </h3>
                  <p className="text-gray-400 text-xs mb-6 max-w-2xl">
                    Trace the alliance alignments and potential friction points between various sector groups regarding this policy. Click a node inside the map to trigger detailed assessments.
                  </p>
                  
                  <StakeholderNetwork 
                    stakeholders={selectedPolicy.stakeholders} 
                    policyTitle={selectedPolicy.title} 
                  />
                </div>

                {/* 4. Pros and Cons comparison cards */}
                <div className="border-t border-white/5 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pros (Green Glass Card) */}
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/5 p-6 shadow-md">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <h4 className="font-display text-base font-bold text-emerald-300">Advantages & Direct Merits</h4>
                      </div>
                      <ul className="space-y-3">
                        {selectedPolicy.pros.map((pro, i) => (
                          <li key={i} className="text-gray-300 text-xs leading-relaxed flex items-start gap-2.5">
                            <span className="font-bold text-emerald-400 mt-0.5">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons (Red Glass Card) */}
                    <div className="rounded-2xl border border-red-500/20 bg-red-950/5 p-6 shadow-md">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                          <Info className="h-5 w-5" />
                        </div>
                        <h4 className="font-display text-base font-bold text-red-300">Risks, Concerns & Friction points</h4>
                      </div>
                      <ul className="space-y-3">
                        {selectedPolicy.cons.map((con, i) => (
                          <li key={i} className="text-gray-300 text-xs leading-relaxed flex items-start gap-2.5">
                            <span className="font-bold text-red-400 mt-0.5">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 5. Educational Flowchart Visual Explanation */}
                <div className="border-t border-white/5 pt-8 pb-4">
                  <h3 className="text-lg font-display font-bold text-white mb-4">Educational Impact Flowchart</h3>
                  <div className="rounded-2xl bg-white/[0.01] border border-white/5 p-6 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto py-4">
                      
                      <div className="rounded-xl border border-white/10 bg-[#0d1425] p-4 w-full sm:w-48 text-center shadow-sm">
                        <span className="block text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-widest">Enactment</span>
                        <p className="text-xs font-semibold text-white mt-1">Sovereign Bill is Notified</p>
                      </div>

                      <div className="text-cyan-400 font-bold rotate-90 sm:rotate-0">→</div>

                      <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/15 p-4 w-full sm:w-48 text-center shadow-sm relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-black text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">Active Process</div>
                        <span className="block text-[10px] font-mono text-cyan-300 uppercase font-bold tracking-widest">Compliance</span>
                        <p className="text-xs font-semibold text-white mt-1">Regulatory Audits Issued</p>
                      </div>

                      <div className="text-cyan-400 font-bold rotate-90 sm:rotate-0">→</div>

                      <div className="rounded-xl border border-white/10 bg-[#0d1425] p-4 w-full sm:w-48 text-center shadow-sm">
                        <span className="block text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest">Consensus</span>
                        <p className="text-xs font-semibold text-white mt-1">Citizen Feedback Logs</p>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Drawer Control */}
              <div className="px-10 py-5 bg-[#0c1220] border-t border-white/5 flex flex-wrap gap-4 justify-between items-center">
                <span className="text-xs text-gray-500 font-mono">POLICYLENS SECURE ENCRYPTED MODULE V1.4</span>
                <button
                  onClick={() => setSelectedPolicy(null)}
                  className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Close Analytics Panel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
