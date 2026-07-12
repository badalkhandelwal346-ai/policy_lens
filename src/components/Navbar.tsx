import { useState } from "react";
import { Sparkles, Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "explore", label: "Explore Policies" },
    { id: "compare", label: "Compare Policies" },
    { id: "simulator", label: "AI Simulator" },
    { id: "community", label: "Community" },
    { id: "about", label: "About" },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 h-[72px] w-full border-b border-[rgba(255,255,255,0.06)] bg-[rgba(12,18,30,0.72)] px-4 backdrop-blur-[20px] transition-all duration-300 md:px-8">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
        {/* Left Side: Logo */}
        <div 
          onClick={() => handleNavClick("home")} 
          className="flex cursor-pointer items-center gap-3 group"
          id="navbar-logo"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#08111F]">
              <Sparkles className="h-5 w-5 text-cyan-400 group-hover:animate-pulse" />
            </div>
            {/* Absolute accent ring glow */}
            <div className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 blur transition duration-300 group-hover:opacity-60" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-400">
            Policy<span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Lens</span>
          </span>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 font-sans text-sm font-medium transition-all duration-300 hover:text-white ${
                  isActive ? "text-cyan-400" : "text-gray-400"
                }`}
                id={`nav-item-${item.id}`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side: Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-gray-400 hover:bg-[rgba(255,255,255,0.06)] hover:text-white transition-colors duration-200"
            aria-label="Toggle theme"
            id="theme-toggle"
          >
            {isDarkMode ? <Moon className="h-4 w-4 text-cyan-400" /> : <Sun className="h-4 w-4 text-yellow-400" />}
          </button>

          {/* Login button */}
          <button 
            onClick={() => alert("Simulated Auth: Authentication is fully client-side. PolicyLens profiles will load upon signing up.")} 
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
            id="login-btn"
          >
            Login
          </button>

          {/* Gradient Sign Up */}
          <button
            onClick={() => alert("Welcome to PolicyLens! Your sandbox education account is initialized.")}
            className="relative flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 px-5 text-sm font-medium text-white shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] active:scale-95"
            id="signup-btn"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Mini Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-gray-400"
            id="theme-toggle-mobile"
          >
            {isDarkMode ? <Moon className="h-4 w-4 text-cyan-400" /> : <Sun className="h-4 w-4 text-yellow-400" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-gray-300 hover:text-white"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-[72px] z-40 border-b border-[rgba(255,255,255,0.08)] bg-[#0c121e]/95 px-6 py-8 backdrop-blur-xl lg:hidden"
            id="mobile-nav-panel"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left font-display text-lg font-medium py-2 transition-all ${
                      isActive ? "text-cyan-400 pl-2 border-l-2 border-cyan-400" : "text-gray-300"
                    }`}
                    id={`mobile-nav-item-${item.id}`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="mt-4 flex flex-col gap-3 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    alert("Simulated Auth");
                  }}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] py-3 text-center text-sm font-medium text-gray-300"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    alert("Welcome to PolicyLens Sandbox!");
                  }}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 py-3 text-center text-sm font-medium text-white shadow-lg shadow-cyan-500/20"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
