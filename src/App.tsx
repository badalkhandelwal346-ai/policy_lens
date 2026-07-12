import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LiveTicker from "./components/LiveTicker";
import Chatbot from "./components/Chatbot";

// Import Sections
import HeroSection from "./sections/HeroSection";
import StatsSection from "./sections/StatsSection";
import ExplorePoliciesSection from "./sections/ExplorePoliciesSection";
import CompareSection from "./sections/CompareSection";
import SimulatorSection from "./sections/SimulatorSection";
import CommunitySection from "./sections/CommunitySection";
import TestimonialsSection from "./sections/TestimonialsSection";

// Icons for About View
import { Sparkles, Shield, Scale, HelpCircle, FileText, CheckCircle } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  
  // Parallax coordinates state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse move parallax listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized offset from center of screen (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Back to top scroll whenever navigation switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  return (
    <div className="relative min-h-screen w-full bg-[#08111F] text-white font-sans overflow-x-hidden selection:bg-cyan-500/30 selection:text-white" id="policylens-app-root">
      
      {/* ==================================================
          STATIC BACKGROUND GRID & PARALLAX BLURRED ORBS
          ================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Soft engineering background grid */}
        <div className="absolute inset-0 geometric-grid" />
        
        {/* Parallax Glowing Circle A: Cyan */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0)`,
            transition: "transform 0.4s cubic-bezier(0.1, 1, 0.3, 1)"
          }}
          className="absolute top-[10%] left-[15%] w-[450px] h-[450px] rounded-full bg-cyan-500/6 blur-[120px]"
        />

        {/* Parallax Glowing Circle B: Blue */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px, 0)`,
            transition: "transform 0.4s cubic-bezier(0.1, 1, 0.3, 1)"
          }}
          className="absolute top-[45%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[140px]"
        />

        {/* Parallax Glowing Circle C: Purple */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px, 0)`,
            transition: "transform 0.4s cubic-bezier(0.1, 1, 0.3, 1)"
          }}
          className="absolute bottom-[15%] left-[20%] w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px]"
        />

        {/* Parallax Glowing Circle D: Emerald */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * -1}px, ${mousePos.y * -1}px, 0)`,
            transition: "transform 0.4s cubic-bezier(0.1, 1, 0.3, 1)"
          }}
          className="absolute bottom-[5%] right-[25%] w-[350px] h-[350px] rounded-full bg-emerald-500/4 blur-[100px]"
        />

      </div>

      {/* ==================================================
          STICKY 72px GLASS NAVIGATION BAR
          ================================================== */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ==================================================
          INFINITE LEGISLATIVE LIVE TICKER
          ================================================== */}
      <LiveTicker />

      {/* ==================================================
          MASTER TRANSITIONAL CONTENT FRAME
          ================================================== */}
      <main className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            
            {/* View: Home / Dashboard */}
            {activeTab === "home" && (
              <div id="home-view-wrapper">
                <HeroSection 
                  onExploreClick={() => setActiveTab("explore")} 
                  onAssistantClick={() => setActiveTab("simulator")} 
                />
                <StatsSection />
                <TestimonialsSection />
              </div>
            )}

            {/* View: Explore Policy Database */}
            {activeTab === "explore" && (
              <div id="explore-view-wrapper">
                <ExplorePoliciesSection />
              </div>
            )}

            {/* View: Compare Policy matrix */}
            {activeTab === "compare" && (
              <div id="compare-view-wrapper">
                <CompareSection />
              </div>
            )}

            {/* View: Policy Simulator */}
            {activeTab === "simulator" && (
              <div id="simulator-view-wrapper">
                <SimulatorSection />
              </div>
            )}

            {/* View: Community Forums */}
            {activeTab === "community" && (
              <div id="community-view-wrapper">
                <CommunitySection />
              </div>
            )}

            {/* View: About & Technical assurances */}
            {activeTab === "about" && (
              <div id="about-view-wrapper" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-semibold text-cyan-300 uppercase tracking-widest">
                    <Sparkles className="h-3 w-3 text-cyan-400" />
                    <span>Algorithmic Assurance Charter</span>
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mt-3">
                    Policy Education Without Biased Echoes
                  </h2>
                  <p className="text-gray-400 text-sm mt-2 max-w-2xl mx-auto">
                    PolicyLens is a sandbox utility constructed to translate high-complexity legislation into digestible, visual, and simulated modules without commercial editorial slants.
                  </p>
                </div>

                {/* Bento assurances list */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Item 1: Neutral Grounding */}
                  <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                      <Scale className="h-5 w-5" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-white">Objective Analysis Protocols</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Our server models ingest legal text directly from registered government gazettes and parliamentary archives. No biased newspaper briefs, op-eds, or political blog comments are ever compiled into the baseline.
                    </p>
                  </div>

                  {/* Item 2: Safe Data Encryption */}
                  <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
                      <Shield className="h-5 w-5" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-white">Full-Stack Sandboxed Isolation</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Simulator metrics, slider parameters, and forum query replies are isolated locally within your active profile container, providing a perfectly secure research playground without logging your political insights.
                    </p>
                  </div>

                  {/* Item 3: Grounded Sources */}
                  <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-white">V1.4 Traceable References</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Every policy timeline dot and stakeholder node maps back to an official act clause or published legislative report. Click any detail module to inspect exact verification codes and citation registries.
                    </p>
                  </div>

                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* ==================================================
          FLOATING PERSISTENT AI CHATBOT SYSTEM
          ================================================== */}
      <Chatbot />

      {/* ==================================================
          LARGE SECURE BRAND FOOTER
          ================================================== */}
      <Footer />

    </div>
  );
}
