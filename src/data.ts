import { Policy, Category, DiscussionThread, Testimonial } from "./types";

export const CATEGORIES: Category[] = [
  { id: "economy", title: "Economy", iconName: "TrendingUp", count: 18, gradient: "from-blue-500 to-indigo-500" },
  { id: "education", title: "Education", iconName: "BookOpen", count: 12, gradient: "from-purple-500 to-pink-500" },
  { id: "healthcare", title: "Healthcare", iconName: "HeartPulse", count: 15, gradient: "from-rose-500 to-orange-500" },
  { id: "technology", title: "Technology", iconName: "Cpu", count: 22, gradient: "from-cyan-500 to-blue-500" },
  { id: "agriculture", title: "Agriculture", iconName: "Sprout", count: 10, gradient: "from-emerald-500 to-teal-500" },
  { id: "environment", title: "Environment", iconName: "Leaf", count: 14, gradient: "from-green-500 to-emerald-600" },
  { id: "law", title: "Law & Justice", iconName: "Scale", count: 9, gradient: "from-amber-500 to-orange-500" },
  { id: "defence", title: "Defence", iconName: "Shield", count: 7, gradient: "from-slate-500 to-zinc-600" }
];

export const POLICIES: Policy[] = [
  {
    id: "ai-act",
    title: "Global Artificial Intelligence Act",
    category: "technology",
    badge: "Tech Regulation",
    difficulty: "Hard",
    readTime: "8 min",
    description: "The world's first comprehensive legal framework on AI, classifying systems by risk levels and introducing strict transparency requirements for generative AI.",
    fullContent: "The Artificial Intelligence Act is a landmark regulation designed to ensure that AI systems used in the public and private sectors are safe, transparent, traceable, non-discriminatory, and environmentally friendly. It establishes a risk-based classification system ranging from 'Minimal Risk' to 'Unacceptable Risk' (which are outright banned). Generative AI providers must disclose training data summaries and label AI-generated content to prevent misinformation.",
    pros: [
      "Protects fundamental human rights from intrusive surveillance and biometrics.",
      "Establishes a global benchmark for AI safety, creating legal certainty.",
      "Encourages responsible innovation through sandboxes for early-stage startups."
    ],
    cons: [
      "High compliance costs could burden European and global startup ecosystems.",
      "Vague definitions of 'General Purpose AI' may lead to regulatory overreach.",
      "Risk of slower deployment of frontier AI systems compared to unregulated markets."
    ],
    status: "Approved",
    budget: "$340 Million (Regulatory & Oversight Cost)",
    affectedGroups: ["AI Developers", "Enterprise Businesses", "General Citizens", "Government Agencies"],
    implementationYear: "2026",
    timeline: [
      { title: "Proposal", date: "April 2021", desc: "European Commission presents the draft proposal.", status: "completed" },
      { title: "Committee Review", date: "June 2023", desc: "Parliamentary committees negotiate risk definitions.", status: "completed" },
      { title: "Debate", date: "December 2023", desc: "Trilogue sessions finalize oversight rules.", status: "completed" },
      { title: "Approval", date: "March 2024", desc: "European Parliament votes overwhelmingly in favor.", status: "completed" },
      { title: "Implementation", date: "Mid 2025 - 2026", desc: "Phased enforcement of risk codes and transparency requirements.", status: "current" },
      { title: "Full Compliance", date: "2027", desc: "Sanctions and penalties come into full effect for non-compliance.", status: "upcoming" }
    ],
    stakeholders: [
      { name: "Government Agencies", role: "Enforcers", impact: "High regulation oversight burden and coordination across borders.", sentiment: "supportive", x: 150, y: 100 },
      { name: "Tech Enterprises", role: "AI Developers", impact: "Strict safety audits, potential loss of speed to market.", sentiment: "opposed", x: 450, y: 100 },
      { name: "End Consumers / Citizens", role: "Beneficiaries", impact: "Enhanced transparency, safety, and protection against bias.", sentiment: "supportive", x: 300, y: 320 },
      { name: "Research Academics", role: "Advisors", impact: "Access to safer public datasets, clear standards for ethical testing.", sentiment: "neutral", x: 100, y: 250 },
      { name: "VC & Startup Ecosystem", role: "Investors", impact: "Increased barrier to entry for smaller AI applications.", sentiment: "opposed", x: 500, y: 250 }
    ]
  },
  {
    id: "data-protection",
    title: "Digital Personal Data Protection Act",
    category: "technology",
    badge: "Privacy",
    difficulty: "Medium",
    readTime: "6 min",
    description: "A comprehensive digital privacy framework outlining individuals' rights over personal data and obligations of tech firms to secure and process information.",
    fullContent: "This regulation introduces the concept of the 'Data Principal' (the individual) and 'Data Fiduciary' (the organization collecting data). It strictly enforces consent-based data collection, demands clean data deletion policies, and creates the Data Protection Board to resolve grievances and levy hefty penalties on data breaches.",
    pros: [
      "Gives citizens complete control, right to correction, and right to erase personal records.",
      "Establishes absolute transparency regarding what data is stored and how it is shared.",
      "Imposes steep financial penalties up to $30M, holding large organizations accountable."
    ],
    cons: [
      "Broad national security exemptions could grant governments excessive surveillance leeway.",
      "Localization and international transfer rules could disrupt multi-national tech operations.",
      "Firms might experience friction in legacy code migration and active customer consent models."
    ],
    status: "Implemented",
    budget: "$120 Million (Operational Board Setup)",
    affectedGroups: ["Mobile App Developers", "Social Media Platforms", "General Citizens", "Data Protection Officers"],
    implementationYear: "2024",
    timeline: [
      { title: "Proposal", date: "August 2022", desc: "Draft released for comprehensive public consultation.", status: "completed" },
      { title: "Committee Review", date: "Jan 2023", desc: "Joint parliamentary review refines penalties and exemptions.", status: "completed" },
      { title: "Debate", date: "March 2023", desc: "Fierce debates on state exemptions and sovereign overrides.", status: "completed" },
      { title: "Approval", date: "August 2023", desc: "Passed by both houses of Parliament.", status: "completed" },
      { title: "Implementation", date: "January 2024", desc: "Rules notified and Data Protection Board established.", status: "completed" },
      { title: "Current Status", date: "Ongoing", desc: "Compliance audits underway for major social networks.", status: "current" }
    ],
    stakeholders: [
      { name: "Digital Citizens", role: "Principals", impact: "Unprecedented privacy control and digital autonomy.", sentiment: "supportive", x: 300, y: 320 },
      { name: "Ad-Tech Companies", role: "Fiduciaries", impact: "Must redesign cookies, marketing pipelines, and storage engines.", sentiment: "opposed", x: 450, y: 120 },
      { name: "Government Regulators", role: "Oversight Board", impact: "Power to levy fines, audit servers, and issue take-downs.", sentiment: "supportive", x: 150, y: 120 },
      { name: "Corporate Legal Firms", role: "Advisors", impact: "Surge in corporate compliance demand and risk consulting.", sentiment: "neutral", x: 480, y: 280 }
    ]
  },
  {
    id: "nep",
    title: "National Education Policy (NEP)",
    category: "education",
    badge: "Education Reform",
    difficulty: "Medium",
    readTime: "7 min",
    description: "A visionary transformation replacing the 10+2 system with a 5+3+3+4 framework, integrating digital literacy, critical thinking, and flexible multi-disciplinary degrees.",
    fullContent: "The policy introduces early childhood care, replaces rigid streaming (Science vs. Arts) with a flexible system where a student can study Physics with Fashion Designing, and promotes mother-tongue instruction in early years alongside multi-disciplinary higher educational institutions.",
    pros: [
      "Breaks cognitive silos by allowing liberal arts and core sciences to merge.",
      "Integrates coding, vocational skills, and physical education early in school.",
      "Establishes multiple entry and exit points in undergraduate degrees with credit banks."
    ],
    cons: [
      "Highly decentralized states might clash with national curriculum frameworks.",
      "Massive upgrade costs for digital infrastructure in rural public schools.",
      "Retraining millions of teachers to shift from rote learning to qualitative grading is slow."
    ],
    status: "Implemented",
    budget: "6% of GDP (Target Expenditure)",
    affectedGroups: ["Students", "Teachers", "School Administrators", "Universities", "State Education Boards"],
    implementationYear: "2020 (Phased to 2030)",
    timeline: [
      { title: "Proposal", date: "May 2019", desc: "Draft NEP prepared by Kasturirangan committee.", status: "completed" },
      { title: "Committee", date: "Dec 2019", desc: "Collected over 200,000 suggestions from gram panchayats.", status: "completed" },
      { title: "Debate", date: "July 2020", desc: "Cabinet approvals and curriculum planning debates.", status: "completed" },
      { title: "Approval", date: "August 2020", desc: "National Policy officially approved by federal cabinet.", status: "completed" },
      { title: "Implementation", date: "2021 - 2025", desc: "Gradual state adoption, textbook revisions, credit bank setup.", status: "current" },
      { title: "Target Fully Realized", date: "2030", desc: "Universal adult literacy and full multi-disciplinary model.", status: "upcoming" }
    ],
    stakeholders: [
      { name: "Federal Ministry", role: "Policymaker", impact: "Standardizes high-level standards, funds digital repositories.", sentiment: "supportive", x: 150, y: 100 },
      { name: "Rural Public Schools", role: "Executors", impact: "Struggle with digital infrastructure and textbook shortages.", sentiment: "opposed", x: 450, y: 280 },
      { name: "Urban Private Academies", role: "Executors", impact: "Fast transition, premium digital modules, early training.", sentiment: "supportive", x: 450, y: 100 },
      { name: "Students & Parents", role: "Beneficiaries", impact: "Less exam stress, multi-disciplinary choice, flexible timeline.", sentiment: "supportive", x: 300, y: 320 },
      { name: "State Governments", role: "Decentralized Autonomy", impact: "Clash on language mandates and regional history representations.", sentiment: "neutral", x: 120, y: 250 }
    ]
  },
  {
    id: "gst",
    title: "Goods and Services Tax (GST)",
    category: "economy",
    badge: "Tax Reform",
    difficulty: "Hard",
    readTime: "9 min",
    description: "An extensive indirect tax structure that merged multiple state and federal taxes into a single, comprehensive unified system to eliminate tax cascading.",
    fullContent: "The GST structure operates on dynamic tax slabs (5%, 12%, 18%, 28%) and mandates an online compliance portal. It leverages the Input Tax Credit (ITC) mechanism, forcing vendors to declare transactions to prevent black-market loops and simplify supply chains.",
    pros: [
      "Creates a frictionless, unified national market, cutting shipping checkposts.",
      "Eliminates 'tax-on-tax' cascading, lowering systemic transport overheads.",
      "Increases tax compliance and compliance audit trails through digital invoicing."
    ],
    cons: [
      "Extremely complex compliance and monthly return filing for small businesses.",
      "Sovereign states lose direct power to modify tax rates based on regional emergencies.",
      "Frequent slab changes create pricing uncertainties for intermediate suppliers."
    ],
    status: "Implemented",
    budget: "$420 Billion (Annual Indirect Tax Collection)",
    affectedGroups: ["Small Businesses", "Consumers", "Tax Consultants", "Logistics Firms"],
    implementationYear: "2017",
    timeline: [
      { title: "Proposal", date: "August 2006", desc: "Proposal tabled to implement a unified indirect tax.", status: "completed" },
      { title: "Committee Review", date: "March 2011", desc: "Constitutional amendment bill sent to finance standing committee.", status: "completed" },
      { title: "Debate", date: "August 2016", desc: "Passed by Senate and ratified by state legislatures.", status: "completed" },
      { title: "Approval", date: "April 2017", desc: "Four supplementary GST bills approved by Parliament.", status: "completed" },
      { title: "Implementation", date: "July 2017", desc: "Historic midnight launch in central hall of Parliament.", status: "completed" },
      { title: "Current Status", date: "Ongoing", desc: "Monthly GST council meetings adjust slabs and ITC rules.", status: "current" }
    ],
    stakeholders: [
      { name: "GST Council", role: "Governing Board", impact: "Formulates rates and decides state allocations.", sentiment: "supportive", x: 150, y: 100 },
      { name: "Small Retailers", role: "Filers", impact: "Heavy burden of digital book-keeping and compliance services.", sentiment: "opposed", x: 450, y: 100 },
      { name: "Logistics & Transport", role: "Operators", impact: "Faster shipping, no border tax barriers, optimized routes.", sentiment: "supportive", x: 300, y: 320 },
      { name: "General Consumers", role: "Tax Payers", impact: "Cheaper services, clear receipts, but expensive luxury goods.", sentiment: "neutral", x: 120, y: 250 },
      { name: "State Treasuries", role: "Revenues", impact: "Guaranteed compensations but lost tax autonomy.", sentiment: "neutral", x: 480, y: 250 }
    ]
  },
  {
    id: "digital-india",
    title: "Digital India Mission",
    category: "technology",
    badge: "Digital Infrastructure",
    difficulty: "Easy",
    readTime: "5 min",
    description: "A flagship program designed to transition the entire nation into a digitally empowered society and knowledge economy by expanding high-speed internet and digital services.",
    fullContent: "This initiative acts as the umbrella for massive public goods like the Unified Payments Interface (UPI), Aadhaar biometric authentication, Digilocker paperless folders, and rural optical fiber networks (BharatNet).",
    pros: [
      "Enabled the world's largest real-time, zero-fee mobile micro-payment system (UPI).",
      "Direct Benefit Transfers (DBT) directly bypassed middlemen, saving billions from leakages.",
      "Massive reduction in corporate bureaucracy through paperless cloud certifications."
    ],
    cons: [
      "Severe digital divide—rural elderly populations struggle with digital interfaces.",
      "Centralization of biometric and financial registries poses massive cyber-attack risks.",
      "Issues with state-sanctioned digital surveillance and biometric mismatch lockouts."
    ],
    status: "Implemented",
    budget: "$15 Billion (Total Infrastructure Investment)",
    affectedGroups: ["Citizens", "Fintech Startups", "Rural Communities", "Banks"],
    implementationYear: "2015",
    timeline: [
      { title: "Proposal", date: "August 2014", desc: "Concept developed by National IT department.", status: "completed" },
      { title: "Committee Review", date: "Jan 2015", desc: "Socio-economic committees analyze identity & privacy.", status: "completed" },
      { title: "Debate", date: "May 2015", desc: "Federal clearance and coordination with telecom carriers.", status: "completed" },
      { title: "Approval", date: "July 2015", desc: "Launched officially with nine primary pillars.", status: "completed" },
      { title: "Implementation", date: "2016 - 2024", desc: "UPI explosion, 4G rollouts, BharatNet rural linkings.", status: "completed" },
      { title: "Current Status", date: "Active Evolution", desc: "Focusing on AI localization and 5G/6G hyper-connectivity.", status: "current" }
    ],
    stakeholders: [
      { name: "Department of Telecom", role: "Enablers", impact: "Laid millions of kilometers of high-speed optical fiber.", sentiment: "supportive", x: 150, y: 100 },
      { name: "Fintech Startups", role: "Beneficiaries", impact: "Boom in micro-lending, payments, and low-cost online banking.", sentiment: "supportive", x: 450, y: 100 },
      { name: "Rural Citizens", role: "Beneficiaries", impact: "Direct subsidy deposits but suffer from spotty connection.", sentiment: "neutral", x: 300, y: 320 },
      { name: "Cyber-Security Orgs", role: "Watchdogs", impact: "Defending large-scale registries from international threats.", sentiment: "neutral", x: 100, y: 250 }
    ]
  },
  {
    id: "farm-bills",
    title: "Agricultural Trade & Pricing Framework",
    category: "agriculture",
    badge: "Agri Reform",
    difficulty: "Hard",
    readTime: "10 min",
    description: "An ambitious legislative package aiming to deregulate farm markets, allow private contracts outside regulated APMC mandis, and encourage corporate investments.",
    fullContent: "Commonly known as the Farm Bills, this policy intended to allow farmers to trade directly with large food processors and retail chains, bypassing government-regulated wholesale yards. However, it faced massive protests from farmer unions fearing the dilution of MSP (Minimum Support Price) safeguards, leading to a complete repeal.",
    pros: [
      "Attracts heavy private investment in temperature-controlled warehouses and modern supply chains.",
      "Allows farmers to negotiate higher prices directly with premium bulk purchasers.",
      "Reduces structural waste by bypassing regional agent commissions and state checkposts."
    ],
    cons: [
      "Fears of complete corporate monopoly leaving small land-holders without legal leverage.",
      "Dilution of the Minimum Support Price (MSP) system could leave farmers vulnerable to market crashes.",
      "Loss of mandi tax revenues which states used for agricultural roads and rural development."
    ],
    status: "Proposed", // Repealed but kept for simulation/educational debate
    budget: "$8.5 Billion (Projected Private Sector Inflows)",
    affectedGroups: ["Farmers", "Agri-Corporations", "Mandi Brokers", "State Governments"],
    implementationYear: "2020 (Repealed 2021)",
    timeline: [
      { title: "Proposal", date: "June 2020", desc: "Promulgated as ordinances during the pandemic lockdown.", status: "completed" },
      { title: "Committee Review", date: "August 2020", desc: "Fast-tracked with limited standing committee review.", status: "completed" },
      { title: "Debate & Passage", date: "September 2020", desc: "Heated debates in Parliament, passed via voice vote.", status: "completed" },
      { title: "Protests", date: "Nov 2020 - Nov 2021", desc: "Year-long massive sit-in protests on national borders.", status: "completed" },
      { title: "Repeal Approval", date: "November 2021", desc: "Prime Minister announces repeal of all three bills.", status: "completed" },
      { title: "Status Today", date: "Educational Debate", desc: "Currently suspended, debate remains active for regional variants.", status: "current" }
    ],
    stakeholders: [
      { name: "Farmer Unions", role: "Protesters", impact: "Resolute resistance, secured MSP guarantees, prevented repeal.", sentiment: "opposed", x: 120, y: 320 },
      { name: "Agri-Conglomerates", role: "Investors", impact: "Forced to scale back direct contract-farming supply chains.", sentiment: "supportive", x: 450, y: 100 },
      { name: "Federal Ministry", role: "Proponent", impact: "Suffered political setback, looking for local state alternatives.", sentiment: "supportive", x: 150, y: 100 },
      { name: "Mandi Agents / Middlemen", role: "Brokers", impact: "Saved commissions and preserved their local credit networks.", sentiment: "opposed", x: 450, y: 250 },
      { name: "Consumer Associations", role: "Public", impact: "Stable food prices but missed efficient supply chain cuts.", sentiment: "neutral", x: 280, y: 210 }
    ]
  }
];

export const DISCUSSIONS: DiscussionThread[] = [
  {
    id: "thread-1",
    question: "Is the AI Act going to kill European machine learning startups?",
    author: "Elena_Dev",
    time: "3 hours ago",
    answers: 14,
    votes: 42,
    trending: true,
    category: "technology",
    replies: [
      { id: "r1", author: "Marc_VC", role: "Investor", text: "Compliance costs for 'General Purpose AI' models will be massive. Startups will likely migrate to Delaware or Singapore to train their foundation weights.", votes: 19, time: "2 hours ago" },
      { id: "r2", author: "Dieter_EU", role: "Regulator", text: "The regulation includes sandbox provisions specifically for SMEs. It prevents bias and liability which would cost startups more in class-action lawsuits later.", votes: 24, time: "1 hour ago" },
      { id: "r3", author: "DeepMind_Alum", role: "Researcher", text: "The fine-tuning transparency clause is the hardest part. How do you audit open-source weights legally?", votes: 11, time: "45 mins ago" }
    ]
  },
  {
    id: "thread-2",
    question: "How can small-scale local retailers adapt to the complex monthly filing under GST?",
    author: "Rajesh_Sons",
    time: "1 day ago",
    answers: 28,
    votes: 110,
    trending: true,
    category: "economy",
    replies: [
      { id: "r4", author: "TaxExpert_Amit", role: "Chartered Accountant", text: "Look into the Composition Scheme. If your turnover is under $150k, you file quarterly with a low flat rate. Saves 90% of the administrative stress.", votes: 56, time: "18 hours ago" },
      { id: "r5", author: "Suresh_Grocers", role: "Shop Owner", text: "Even with the Composition scheme, matching ITC invoices is a nightmare. Large distributors refuse to sell to us unless we are fully registered.", votes: 41, time: "15 hours ago" }
    ]
  },
  {
    id: "thread-3",
    question: "Should early child education (preschool) be state-funded and standard under NEP?",
    author: "Edu_Innovator",
    time: "2 days ago",
    answers: 9,
    votes: 23,
    trending: false,
    category: "education",
    replies: [
      { id: "r6", author: "Dr_Mehta", role: "Child Psychologist", text: "Cognitive growth between age 3-6 is the fastest. NEP framing it as foundational stage is perfect, but state centers lack basic learning kits.", votes: 18, time: "1 day ago" }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Siddharth Sharma",
    role: "Senior Policy Analyst, Center for Digital Governance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    review: "PolicyLens completely bypasses the typical media noise. The interactive stakeholder network gave our research team visual clarity on the AI Act that would take days of report reading to synthesize.",
    policyFocus: "AI Act & GDPR"
  },
  {
    id: "t2",
    name: "Amina Al-Mansoor",
    role: "Director of Legal Compliance, FinTech Horizon",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    review: "The comparison tool is incredibly rigorous. We used the side-by-side comparison between regional privacy bills to brief our executive board before entering the South Asian markets.",
    policyFocus: "Digital Personal Data Protection"
  },
  {
    id: "t3",
    name: "Marcus Aurelius Vance",
    role: "Assistant Professor of Public Policy, Stanford",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    review: "My students use the AI Policy Simulator weekly. Sliding tax and inflation modifiers and watching the generative economic impact metrics updates has completely revolutionized my macroeconomics seminars.",
    policyFocus: "NEP & Indirect Tax Slabs"
  }
];
