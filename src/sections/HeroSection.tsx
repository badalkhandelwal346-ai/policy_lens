import { Sparkles, ArrowRight, BookOpen, Layers, Milestone, Users, Cpu, FileText, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import FloatingCards from "../components/FloatingCards";

interface HeroSectionProps {
  onExploreClick: () => void;
  onAssistantClick: () => void;
}

export default function HeroSection({ onExploreClick, onAssistantClick }: HeroSectionProps) {
  const features = [
    { text: "Real-life examples", icon: BookOpen },
    { text: "Stakeholder analysis", icon: Users },
    { text: "Timelines", icon: Milestone },
    { text: "Interactive diagrams", icon: Layers },
    { text: "AI explanations", icon: Cpu },
    { text: "Pros & Cons", icon: FileText },
    { text: "Expert insights", icon: Sparkles },
    { text: "Trusted sources", icon: CheckCircle }
  ];

  return (
    <section className="relative min-h-[calc(100vh-72px)] w-full flex items-center justify-center pt-16 pb-20 px-4 overflow-hidden" id="hero-section">
      {/* Background Engineering Grids & Glowing circles */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Radial ambient glow orbs */}
      <div className="radial-glow top-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-500/10" />
      <div className="radial-glow bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10" />
      <div className="radial-glow top-1/3 right-1/3 w-[400px] h-[400px] bg-purple-500/8" />

      {/* Floating interactive card nodes (desktop version sits inside this) */}
      <FloatingCards />

      <div className="relative z-20 max-w-5xl mx-auto text-center px-4">
        {/* Animated Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-300 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
          id="hero-badge"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>V1.4: Multi-Dimensional Legislative Analytics</span>
        </motion.div>

        {/* Major Display Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[36px] sm:text-[48px] md:text-[72px] font-extrabold tracking-tight text-white leading-[1.1]"
          id="hero-heading"
        >
          Understand Policies, <br />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Not Just The News.
          </span>
        </motion.h1>

        {/* Responsive, Elegant Subtitle Features Grid */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
          id="hero-subtitle"
        >
          Democratizing governance. Explain, map, and simulate every government policy, national framework, and fiscal bill in real-time using modern parameters:
        </motion.p>

        {/* Feature Tags list */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto"
          id="hero-features-grid"
        >
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="flex items-center gap-2.5 rounded-xl bg-white/[0.02] border border-white/5 px-4 py-2.5 text-left text-xs text-gray-300 backdrop-blur-sm hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-400/10 text-cyan-400">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium font-sans truncate">{item.text}</span>
              </div>
            );
          })}
        </motion.div>

        {/* CTA Buttons row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          id="hero-cta-container"
        >
          {/* Primary CTA */}
          <button
            onClick={onExploreClick}
            className="group w-full sm:w-auto relative flex h-13 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 text-base font-semibold text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-95"
            id="primary-cta-btn"
          >
            <span>Explore Policies</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onAssistantClick}
            className="group w-full sm:w-auto flex h-13 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/8 px-8 text-base font-semibold text-white backdrop-blur-md hover:bg-white/[0.06] hover:border-cyan-500/20 shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95"
            id="secondary-cta-btn"
          >
            <Sparkles className="mr-2 h-4 w-4 text-cyan-400 animate-pulse group-hover:scale-110 transition-transform" />
            <span>Try AI Assistant</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
