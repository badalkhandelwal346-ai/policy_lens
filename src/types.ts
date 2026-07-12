export interface TimelineEvent {
  title: string;
  date: string;
  desc: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface StakeholderNode {
  name: string;
  role: string;
  impact: string;
  sentiment: 'supportive' | 'opposed' | 'neutral';
  x: number; // For visualization positioning
  y: number;
}

export interface Policy {
  id: string;
  title: string;
  category: string;
  badge: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  readTime: string;
  description: string;
  fullContent?: string;
  pros: string[];
  cons: string[];
  status: 'Approved' | 'Proposed' | 'In Debate' | 'Implemented';
  timeline: TimelineEvent[];
  stakeholders: StakeholderNode[];
  budget: string;
  affectedGroups: string[];
  implementationYear: string;
}

export interface Category {
  id: string;
  title: string;
  iconName: string;
  count: number;
  gradient: string;
}

export interface SimulationResult {
  economicIndicator: number; // -100 to 100
  socialWellbeing: number; // -100 to 100
  publicApproval: number; // -100 to 100
  fiscalDeficitImpact: number; // -100 to 100
  shortSummary: string;
  analysisText: string;
}

export interface DiscussionThread {
  id: string;
  question: string;
  author: string;
  time: string;
  answers: number;
  votes: number;
  trending: boolean;
  category: string;
  replies: Reply[];
}

export interface Reply {
  id: string;
  author: string;
  role?: string;
  text: string;
  votes: number;
  time: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  review: string;
  policyFocus: string;
}
