import React from "react";
import { Sparkles, Send, Github, Twitter, Linkedin, HelpCircle } from "lucide-react";

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Subscribed successfully! You have been logged onto the PolicyLens weekly legislative newsletter.");
  };

  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#08111f] pt-16 pb-8 px-4 md:px-8 relative z-20" id="footer">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5 shadow-md">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#08111F]">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                Policy<span className="text-cyan-400">Lens</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              The premium generative AI education sandbox designed to break down regulatory walls, model societal impacts, and map civic alliances neutrally.
            </p>
            <div className="flex items-center gap-3 text-gray-500 mt-2" id="footer-social-icons">
              <button className="p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 hover:text-white transition-colors" title="Twitter">
                <Twitter className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 hover:text-white transition-colors" title="Github">
                <Github className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 hover:text-white transition-colors" title="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 font-mono">Platform</h5>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><button className="hover:text-white transition-colors">Explain Module</button></li>
              <li><button className="hover:text-white transition-colors">Compare Matrix</button></li>
              <li><button className="hover:text-white transition-colors">Simulator Sandbox</button></li>
              <li><button className="hover:text-white transition-colors">Alliance Networks</button></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 font-mono">Resources</h5>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><button className="hover:text-white transition-colors">Sovereign Archives</button></li>
              <li><button className="hover:text-white transition-colors">API documentation</button></li>
              <li><button className="hover:text-white transition-colors">Verified Sources</button></li>
              <li><button className="hover:text-white transition-colors">Educational Guides</button></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 font-mono">Legislative Updates</h5>
            <p className="text-xs text-gray-400 leading-normal mb-2">
              Receive raw notified rules and summary briefs regarding active bills directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2" id="footer-newsletter-form">
              <input
                type="email"
                required
                placeholder="citizen@policylens.org"
                className="flex-1 bg-white/[0.02] hover:bg-white/[0.03] border border-white/5 focus:border-cyan-500/20 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 outline-none"
                id="footer-email-input"
              />
              <button
                type="submit"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 cursor-pointer"
                id="footer-subscribe-btn"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-[rgba(255,255,255,0.06)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 font-mono">
          <span>© 2026 PolicyLens Platform. All research verified by sovereign gazette registries.</span>
          <div className="flex gap-4">
            <button className="hover:text-white transition-colors">Privacy Charter</button>
            <button className="hover:text-white transition-colors">Verification Protocol</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
