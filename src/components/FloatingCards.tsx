import { motion } from "motion/react";
import { TrendingUp, Cpu, BookOpen, ShieldCheck, HelpCircle } from "lucide-react";

interface CardData {
  title: string;
  badge: string;
  icon: any;
  metric: string;
  color: string;
  delay: number;
  xOffset: string;
  yOffset: string;
}

const CARDS: CardData[] = [
  {
    title: "AI Act Approved",
    badge: "Risk-based Code",
    icon: Cpu,
    metric: "4 Tier Class",
    color: "from-cyan-500/20 to-blue-500/10",
    delay: 0,
    xOffset: "left-[5%]",
    yOffset: "top-[15%]"
  },
  {
    title: "GST Unified Market",
    badge: "Economy",
    icon: TrendingUp,
    metric: "18% Avg Slab",
    color: "from-blue-500/20 to-indigo-500/10",
    delay: 1.5,
    xOffset: "right-[6%]",
    yOffset: "top-[12%]"
  },
  {
    title: "NEP Curriculums",
    badge: "Education",
    icon: BookOpen,
    metric: "5+3+3+4 Stage",
    color: "from-purple-500/20 to-pink-500/10",
    delay: 0.8,
    xOffset: "left-[8%]",
    yOffset: "top-[58%]"
  },
  {
    title: "Digital India Subsidies",
    badge: "Infrastructure",
    icon: ShieldCheck,
    metric: "UPI Micro-Tx",
    color: "from-emerald-500/20 to-teal-500/10",
    delay: 2.2,
    xOffset: "right-[8%]",
    yOffset: "top-[55%]"
  }
];

export default function FloatingCards() {
  return (
    <>
      {/* Desktop absolute elements */}
      <div className="absolute inset-0 hidden xl:block pointer-events-none z-10 overflow-hidden">
        {CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: [0, -16, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: i * 0.2 },
                y: {
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: card.delay,
                },
              }}
              className={`absolute ${card.xOffset} ${card.yOffset} w-64 rounded-2xl glass-card p-5 shadow-[0_8px_32px_0_rgba(12,18,30,0.3)] backdrop-blur-md border border-white/5 pointer-events-auto`}
              id={`floating-card-${i}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/[0.02] rounded-2xl pointer-events-none" />
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-white/[0.04] border border-white/5 px-2.5 py-0.5 text-[10px] font-medium text-gray-400">
                  {card.badge}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <h3 className="mt-4 font-display text-sm font-semibold text-white">
                {card.title}
              </h3>

              <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-[11px] text-gray-400">Metric Status</span>
                <span className="text-xs font-mono font-medium text-cyan-300">
                  {card.metric}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tablet & Mobile responsive fallback grid */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:hidden max-w-2xl mx-auto px-4 relative z-20">
        {CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl glass-card p-4 flex items-center gap-4 border border-white/5"
              id={`floating-card-mob-${i}`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 font-medium px-2 py-0.5 bg-white/[0.04] rounded-full">
                    {card.badge}
                  </span>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">
                    {card.metric}
                  </span>
                </div>
                <h3 className="mt-1 text-sm font-semibold text-white truncate">
                  {card.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
