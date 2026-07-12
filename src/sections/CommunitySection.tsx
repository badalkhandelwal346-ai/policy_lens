import React, { useState } from "react";
import { DISCUSSIONS } from "../data";
import { DiscussionThread, Reply } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, ArrowUp, ArrowDown, Sparkles, Send, Tag, Plus, CheckCircle, Info } from "lucide-react";

export default function CommunitySection() {
  const [threads, setThreads] = useState<DiscussionThread[]>(DISCUSSIONS);
  const [activeThreadId, setActiveThreadId] = useState<string | null>("thread-1");
  const [newQuestion, setNewQuestion] = useState("");
  const [newCategory, setNewCategory] = useState("technology");
  const [newReplyText, setNewReplyText] = useState("");

  // Handle Thread voting
  const handleVote = (threadId: string, delta: number) => {
    setThreads(threads.map(t => {
      if (t.id === threadId) {
        return { ...t, votes: t.votes + delta };
      }
      return t;
    }));
  };

  // Submit new thread question
  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const added: DiscussionThread = {
      id: `thread-${Date.now()}`,
      question: newQuestion,
      author: "Democracy_Advocate",
      time: "Just now",
      answers: 0,
      votes: 1,
      trending: false,
      category: newCategory,
      replies: []
    };

    setThreads([added, ...threads]);
    setNewQuestion("");
    setActiveThreadId(added.id); // open it immediately
  };

  // Submit reply to thread
  const handleSubmitReply = (e: React.FormEvent, threadId: string) => {
    e.preventDefault();
    if (!newReplyText.trim()) return;

    const addedReply: Reply = {
      id: `reply-${Date.now()}`,
      author: "Policy_Citizen",
      role: "Verified Civic Contributor",
      text: newReplyText,
      votes: 1,
      time: "Just now"
    };

    setThreads(threads.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          answers: t.answers + 1,
          replies: [...t.replies, addedReply]
        };
      }
      return t;
    }));

    setNewReplyText("");
  };

  return (
    <section className="relative py-16 px-4 md:px-8 max-w-7xl mx-auto" id="community-section">
      <div className="radial-glow top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5" />
      <div className="radial-glow bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/5" />

      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-semibold text-purple-300 uppercase tracking-widest">
          <MessageSquare className="h-3.5 w-3.5 animate-pulse" />
          <span>Sovereign Public Forum</span>
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mt-3">
          Reddit-Inspired Civic Discussions
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-2xl mx-auto">
          Audit upvoted structural queries, deliberate compliance codes, and query expert policy analysts directly inside the thread space.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="community-grid">
        
        {/* LEFT COLUMN: ACTIVE THREADS AND NEW QUESTION FORM */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Ask Question glass module */}
          <form 
            onSubmit={handleSubmitQuestion} 
            className="glass-card rounded-2xl p-5 border border-white/5 space-y-4"
            id="ask-question-form"
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-cyan-400" />
              <h3 className="font-display font-bold text-white text-sm">Post a New Legislative Query</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Is UPI transaction aggregation under threat by privacy board audits?"
                className="flex-1 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.04] border border-white/5 focus:border-cyan-500/40 outline-none rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 transition-colors"
                id="question-input"
              />
              <div className="flex gap-2">
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="bg-[#0c1220] border border-white/10 text-gray-300 rounded-xl text-xs px-2.5 py-2"
                  id="question-category-select"
                >
                  <option value="technology">Tech</option>
                  <option value="economy">Economy</option>
                  <option value="education">Education</option>
                  <option value="agriculture">Agriculture</option>
                </select>
                <button
                  type="submit"
                  disabled={!newQuestion.trim()}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl px-4 py-2 text-xs font-semibold disabled:opacity-45 hover:opacity-90 shrink-0 cursor-pointer shadow-md shadow-cyan-500/10"
                  id="submit-question-btn"
                >
                  Post
                </button>
              </div>
            </div>
          </form>

          {/* Discussion threads lists */}
          <div className="space-y-4" id="discussion-threads-list">
            {threads.map((thread) => {
              const isActive = activeThreadId === thread.id;
              return (
                <div
                  key={thread.id}
                  className={`rounded-2xl border transition-all duration-300 p-5 ${
                    isActive
                      ? "bg-[rgba(12,18,30,0.65)] border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.06)]"
                      : "bg-[rgba(12,18,30,0.3)] border-white/5 hover:border-white/10 hover:bg-[rgba(12,18,30,0.4)]"
                  }`}
                  id={`thread-card-${thread.id}`}
                >
                  <div className="flex gap-4">
                    {/* Votes panel side */}
                    <div className="flex flex-col items-center gap-1.5 justify-start pt-1 font-mono text-xs">
                      <button 
                        onClick={() => handleVote(thread.id, 1)}
                        className="text-gray-500 hover:text-cyan-400 p-1 rounded"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <span className="font-bold text-gray-300">{thread.votes}</span>
                      <button 
                        onClick={() => handleVote(thread.id, -1)}
                        className="text-gray-500 hover:text-cyan-400 p-1 rounded"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Main thread area */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-gray-500 mb-2">
                        <span className="text-cyan-400 font-bold uppercase tracking-wider px-1.5 py-0.5 bg-cyan-950/20 border border-cyan-500/15 rounded">
                          {thread.category}
                        </span>
                        {thread.trending && (
                          <span className="text-yellow-400 font-bold uppercase tracking-wider px-1.5 py-0.5 bg-yellow-950/20 border border-yellow-500/15 rounded flex items-center gap-0.5">
                            <Sparkles className="h-2.5 w-2.5" /> TRENDING
                          </span>
                        )}
                        <span>Posted by u/{thread.author}</span>
                        <span>•</span>
                        <span>{thread.time}</span>
                      </div>

                      <h4 
                        onClick={() => setActiveThreadId(isActive ? null : thread.id)}
                        className="text-sm md:text-base font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer leading-snug"
                      >
                        {thread.question}
                      </h4>

                      {/* Footer count stats */}
                      <div className="mt-4 flex gap-4 text-xs font-semibold text-gray-400">
                        <button
                          onClick={() => setActiveThreadId(isActive ? null : thread.id)}
                          className="flex items-center gap-1.5 hover:text-white"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>{thread.answers} Replies</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE THREAD DETAILED CONVERSATION PANEL */}
        <div className="lg:col-span-5 h-[580px] flex flex-col glass-card border border-white/5 rounded-2xl overflow-hidden" id="thread-conversation-drawer">
          {activeThreadId ? (
            (() => {
              const thread = threads.find(t => t.id === activeThreadId);
              if (!thread) return null;
              return (
                <div className="flex flex-col h-full bg-[#0c1220]/70">
                  
                  {/* Title Header */}
                  <div className="p-5 border-b border-white/5 bg-white/[0.01]">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold block mb-1">Deliberating Query</span>
                    <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-relaxed">
                      "{thread.question}"
                    </h4>
                  </div>

                  {/* Replies List scrollable */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {thread.replies.length > 0 ? (
                      thread.replies.map((reply) => (
                        <div key={reply.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-2 text-xs">
                          <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                            <div className="flex items-center gap-1.5">
                              <span className="text-gray-300 font-semibold">u/{reply.author}</span>
                              {reply.role && (
                                <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] font-bold uppercase tracking-wider px-1 rounded">
                                  {reply.role}
                                </span>
                              )}
                            </div>
                            <span>{reply.time}</span>
                          </div>
                          <p className="text-gray-300 leading-relaxed font-sans">{reply.text}</p>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                            <ArrowUp className="h-3.5 w-3.5" />
                            <span>{reply.votes} Upvotes</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-12">
                        <Info className="h-6 w-6 text-cyan-400 mb-1" />
                        <p className="text-xs font-semibold text-gray-400">No replies yet.</p>
                        <p className="text-[10px] text-gray-500 max-w-[200px] mt-0.5">Be the first to post an analytic assessment to this thread!</p>
                      </div>
                    )}
                  </div>

                  {/* Quick Post Reply Input Form */}
                  <form 
                    onSubmit={(e) => handleSubmitReply(e, thread.id)} 
                    className="p-3 bg-[#08111f] border-t border-white/5 flex gap-2"
                    id="submit-reply-form"
                  >
                    <input
                      type="text"
                      value={newReplyText}
                      onChange={(e) => setNewReplyText(e.target.value)}
                      placeholder="Contribute civic perspective..."
                      className="flex-1 bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.05] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-colors"
                      id="reply-input"
                    />
                    <button
                      type="submit"
                      disabled={!newReplyText.trim()}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white disabled:opacity-40 shrink-0"
                      id="submit-reply-btn"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>

                </div>
              );
            })()
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 p-8" id="no-active-thread">
              <MessageSquare className="h-8 w-8 text-cyan-500/50 mb-2 animate-bounce" />
              <p className="text-xs font-semibold text-gray-400">No Active Deliberation Selected</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Click on any discussion question title to open its comments timeline.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
