import { motion } from "motion/react";
import { BookOpen, Users, LayoutGrid, CheckCircle } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      value: "240+",
      label: "Policies Explained",
      subtext: "Comprehensive legal & socio-economic breakdowns",
      icon: BookOpen,
      glow: "group-hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]",
      iconColor: "text-blue-400"
    },
    {
      value: "1.8M",
      label: "Monthly Readers",
      subtext: "Academics, policymakers, students & citizens",
      icon: Users,
      glow: "group-hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]",
      iconColor: "text-cyan-400"
    },
    {
      value: "14",
      label: "Categories",
      subtext: "From deep tech regulations to rural farming reforms",
      icon: LayoutGrid,
      glow: "group-hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]",
      iconColor: "text-purple-400"
    },
    {
      value: "98%",
      label: "Verified Sources",
      subtext: "Grounded in raw bills, drafts, and sovereign journals",
      icon: CheckCircle,
      glow: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]",
      iconColor: "text-emerald-400"
    }
  ];

  return (
    <section className="relative py-16 px-4 md:px-8 bg-[#08111f]/40" id="stats-section">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`group relative rounded-2xl glass-card p-6 border border-white/5 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 ${stat.glow}`}
                id={`stat-card-${idx}`}
              >
                {/* Accent lighting strip */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 ${stat.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400/70 font-semibold">Live Metric</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-display text-4xl font-extrabold text-white tracking-tight leading-none">
                    {stat.value}
                  </span>
                  <span className="mt-2 text-sm font-semibold text-gray-200">
                    {stat.label}
                  </span>
                  <span className="mt-1 text-xs text-gray-400 leading-normal">
                    {stat.subtext}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
