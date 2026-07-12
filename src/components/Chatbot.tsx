import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hello! I am your PolicyLens AI Guide. Ask me anything about the AI Act, GST slabs, NEP education reforms, or other government policies. How can I help you learn today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Explain GST like I'm 15",
    "What is the EU AI Act?",
    "Why were Farm Bills repealed?",
    "How does NEP change school systems?"
  ];

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    if (!textToSend) setInput("");

    // Append user message
    const updatedMessages = [...messages, { role: "user" as const, text: query }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) {
        throw new Error("Chat server error");
      }

      const data = await response.json();
      setMessages([...updatedMessages, { role: "model", text: data.text }]);
    } catch (error) {
      console.error("Chatbot query error:", error);
      setMessages([
        ...updatedMessages,
        { role: "model", text: "I'm having trouble reaching the policy network server right now. Please verify your GEMINI_API_KEY environment variable is configured correctly and retry!" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Pulse Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 group"
          id="floating-ai-chat-btn"
        >
          {/* Pulsing ring outline */}
          <span className="absolute -inset-1.5 rounded-full border border-cyan-400/30 animate-ping opacity-60 pointer-events-none" />
          
          {isOpen ? (
            <X className="h-6 w-6 transition-transform duration-300" />
          ) : (
            <MessageSquare className="h-6 w-6 group-hover:rotate-6 transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 w-[380px] max-w-[calc(100vw-32px)] h-[540px] rounded-2xl glass-card flex flex-col shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10"
            id="chatbot-panel"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#0c121e]/90 to-cyan-950/20 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                  <Sparkles className="h-4.5 w-4.5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-white">PolicyLens AI Guide</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#08111f]/60">
              {messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={idx}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    id={`chat-msg-${idx}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                        isUser
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-tr-none"
                          : "bg-white/[0.04] border border-white/5 text-gray-200 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start" id="chat-loading-indicator">
                  <div className="max-w-[82%] rounded-2xl rounded-tl-none px-4 py-2.5 bg-white/[0.04] border border-white/5 text-gray-400 text-xs flex items-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" />
                    <span>Analyzing constitutional records...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Prompt suggestions if low on history */}
            {messages.length === 1 && (
              <div className="px-4 py-2 space-y-1.5 bg-[#08111f]/80 border-t border-white/5">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold block mb-1">Suggested inquiries:</span>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="text-[10px] font-medium text-cyan-300 hover:text-white bg-cyan-900/20 hover:bg-cyan-900/40 border border-cyan-500/20 rounded-lg px-2 py-1 text-left transition-colors duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[#0c1220] border-t border-white/5 flex gap-2"
              id="chat-form"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about details, budgets, impacts..."
                className="flex-1 bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.05] outline-none border border-white/5 focus:border-cyan-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 transition-colors"
                id="chat-input"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
                id="chat-submit-btn"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
