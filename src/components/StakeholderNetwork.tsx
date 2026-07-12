import { useState } from "react";
import { motion } from "motion/react";
import { StakeholderNode } from "../types";
import { Users, ShieldCheck, AlertCircle, HelpCircle } from "lucide-react";

interface StakeholderNetworkProps {
  stakeholders: StakeholderNode[];
  policyTitle: string;
}

export default function StakeholderNetwork({ stakeholders, policyTitle }: StakeholderNetworkProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<StakeholderNode | null>(null);

  // Setup visual connections.
  // We'll connect all nodes to the "Center" node if there is one, or draw cross links.
  // For a beautiful fully connected mesh, we can connect sequential nodes or connect everything to the center of the canvas.
  const centerX = 300;
  const centerY = 200;

  const getSentimentStyles = (sentiment: string) => {
    switch (sentiment) {
      case "supportive":
        return {
          glow: "rgba(16, 185, 129, 0.4)",
          border: "border-emerald-500",
          text: "text-emerald-400",
          bg: "bg-emerald-500/10",
        };
      case "opposed":
        return {
          glow: "rgba(239, 68, 68, 0.4)",
          border: "border-red-500",
          text: "text-red-400",
          bg: "bg-red-500/10",
        };
      default:
        return {
          glow: "rgba(156, 163, 175, 0.4)",
          border: "border-gray-400",
          text: "text-gray-300",
          bg: "bg-gray-400/10",
        };
    }
  };

  const handleNodeSelect = (node: StakeholderNode) => {
    setSelectedNode(selectedNode?.name === node.name ? null : node);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center" id="stakeholder-network-container">
      {/* Interactive Network Graph */}
      <div className="relative w-full md:w-[600px] h-[400px] bg-[rgba(12,18,30,0.4)] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden backdrop-blur-md">
        
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="absolute top-4 left-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Interactive Alliance Map</h4>
          <p className="text-[11px] text-gray-400">Click a node to inspect stakeholder friction points</p>
        </div>

        {/* Connections SVG layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="glowing-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connect nodes with animated dashed pathways */}
          {stakeholders.map((node, i) => {
            const isRelated = hoveredNode === node.name || hoveredNode === null;
            return (
              <g key={`link-${i}`}>
                {/* Background ambient path */}
                <path
                  d={`M ${centerX} ${centerY} L ${node.x} ${node.y}`}
                  stroke={hoveredNode === node.name ? "#06B6D4" : "rgba(255, 255, 255, 0.04)"}
                  strokeWidth={hoveredNode === node.name ? "2" : "1.2"}
                  transition="all 0.3s"
                />
                
                {/* Glowing flow animation line */}
                {hoveredNode === node.name && (
                  <path
                    d={`M ${centerX} ${centerY} L ${node.x} ${node.y}`}
                    stroke="url(#glowing-gradient)"
                    strokeWidth="2.5"
                    strokeDasharray="6, 6"
                    className="animate-[dash_10s_linear_infinite]"
                    style={{
                      strokeDashoffset: -100,
                      filter: "drop-shadow(0 0 4px #06B6D4)"
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Central Anchor Node (The Policy itself) */}
        <div
          style={{ left: centerX - 35, top: centerY - 35 }}
          className="absolute z-10 w-[70px] h-[70px] flex items-center justify-center rounded-full border border-cyan-400 bg-[#08111F] shadow-[0_0_20px_rgba(6,182,212,0.3)] select-none"
        >
          <div className="text-center px-1">
            <span className="block text-[8px] uppercase tracking-widest text-cyan-400 font-bold">Policy</span>
            <span className="block text-[9px] font-bold text-white leading-tight truncate max-w-[60px]">
              {policyTitle.split(" ")[0]}
            </span>
          </div>
        </div>

        {/* Dynamic Stakeholder Nodes */}
        {stakeholders.map((node, i) => {
          const styles = getSentimentStyles(node.sentiment);
          const isSelected = selectedNode?.name === node.name;
          const isHovered = hoveredNode === node.name;

          return (
            <motion.div
              key={node.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{ left: node.x - 24, top: node.y - 24 }}
              className={`absolute cursor-pointer rounded-full p-0.5 transition-all duration-300 hover:scale-110 z-20 ${
                isSelected ? "scale-110 border-2 border-cyan-400" : ""
              }`}
              onMouseEnter={() => setHoveredNode(node.name)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeSelect(node)}
              id={`stakeholder-node-${node.name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <div
                style={{
                  boxShadow: isHovered || isSelected ? `0 0 20px ${styles.glow}` : "none"
                }}
                className={`w-12 h-12 flex items-center justify-center rounded-full bg-[#08111F] border ${styles.border} transition-shadow duration-300`}
              >
                <Users className={`h-5 w-5 ${styles.text}`} />
              </div>
              
              {/* Floating Name Labels */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0d1527] border border-white/5 rounded px-2 py-0.5 text-[10px] text-gray-200 shadow-md">
                {node.name}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Node Details Card */}
      <div className="flex-1 w-full flex flex-col justify-center min-h-[300px]" id="stakeholder-detail-card">
        {selectedNode || stakeholders[0] ? (
          (() => {
            const node = selectedNode || stakeholders[0];
            const styles = getSentimentStyles(node.sentiment);
            return (
              <motion.div
                key={node.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-2xl p-6 border border-white/5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles.bg} ${styles.text}`}>
                      {node.sentiment === "supportive" && <ShieldCheck className="h-3 w-3" />}
                      {node.sentiment === "opposed" && <AlertCircle className="h-3 w-3" />}
                      {node.sentiment === "neutral" && <HelpCircle className="h-3 w-3" />}
                      {node.sentiment.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white mt-3">{node.name}</h3>
                    <p className="text-sm font-mono text-cyan-400">{node.role}</p>
                  </div>
                </div>

                <div className="mt-6 border-t border-[rgba(255,255,255,0.06)] pt-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Impact Assessment</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mt-2">
                    {node.impact}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                  <div className="text-xs text-gray-400">
                    <span className="font-semibold text-white">Consensus Note:</span> Select other nodes in the map to trace conflicts of interest with the rest of the ecosystem.
                  </div>
                </div>
              </motion.div>
            );
          })()
        ) : (
          <div className="glass-card rounded-2xl p-8 border border-white/5 text-center text-gray-400">
            Select a stakeholder node to examine their impact metrics.
          </div>
        )}
      </div>
    </div>
  );
}
