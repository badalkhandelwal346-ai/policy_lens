import { useState, useEffect } from "react";
import { TESTIMONIALS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="relative py-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden" id="testimonials-section">
      <div className="radial-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-400/5" />

      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-semibold text-cyan-300 uppercase tracking-widest">
          <Sparkles className="h-3 w-3 text-cyan-400" />
          <span>Professional Endorsements</span>
        </span>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight mt-3">
          Trusted By Experts & Academics
        </h2>
      </div>

      {/* Interactive Carousel Panel */}
      <div className="max-w-4xl mx-auto relative px-4 sm:px-12" id="testimonials-carousel-wrapper">
        
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          id="prev-testimonial-btn"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Testimonial Active Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl glass-card border border-white/5 p-6 md:p-10 shadow-xl bg-gradient-to-br from-white/[0.02] to-transparent relative flex flex-col md:flex-row gap-6 md:gap-10 items-center"
            id={`testimonial-card-${activeIdx}`}
          >
            {/* Absolute quotation mark decoration */}
            <Quote className="absolute right-8 top-8 h-16 w-16 text-white/[0.015] pointer-events-none" />

            {/* Photo Avatar */}
            <div className="relative shrink-0 flex flex-col items-center">
              <div className="h-20 w-20 rounded-2xl overflow-hidden border border-cyan-500/30 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <img
                  src={TESTIMONIALS[activeIdx].avatar}
                  alt={TESTIMONIALS[activeIdx].name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>
              <span className="mt-3 font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest bg-cyan-950/45 px-2 py-0.5 border border-cyan-500/20 rounded">
                Focus: {TESTIMONIALS[activeIdx].policyFocus}
              </span>
            </div>

            {/* Review text */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-gray-300 text-sm md:text-base leading-relaxed italic">
                "{TESTIMONIALS[activeIdx].review}"
              </p>
              
              <div className="mt-6">
                <h4 className="font-display font-bold text-white text-base">
                  {TESTIMONIALS[activeIdx].name}
                </h4>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">
                  {TESTIMONIALS[activeIdx].role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          id="next-testimonial-btn"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dot Indices */}
        <div className="flex justify-center gap-1.5 mt-6" id="testimonials-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIdx === i ? "w-6 bg-cyan-400" : "w-1.5 bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
