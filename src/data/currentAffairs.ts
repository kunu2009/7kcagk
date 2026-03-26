export type CurrentAffairTopic = {
  date: string;
  title: string;
  content: string;
  category: string;
  newsType: string;
  keyPoints: string[];
  whyItMatters: string;
  examFocus: string;
};

export type CurrentAffairMonth = {
  month: string;
  topics: CurrentAffairTopic[];
};

type RawCurrentAffairTopic = {
  date: string;
  title: string;
  content: string;
  category: string;
};

type RawCurrentAffairMonth = {
  month: string;
  topics: RawCurrentAffairTopic[];
};

function inferNewsType(category: string, title: string) {
  const t = title.toLowerCase();
  if (t.includes("supreme court") || t.includes("cji") || t.includes("legal") || t.includes("judicial") || category.toLowerCase() === "legal") {
    return "Judgment / Legal Update";
  }
  if (t.includes("budget") || category.toLowerCase() === "economy") {
    return "Economy & Budget";
  }
  if (t.includes("summit") || t.includes("cop") || t.includes("g7") || t.includes("g20") || t.includes("quad") || t.includes("brics")) {
    return "International Relations";
  }
  if (t.includes("mission") || t.includes("isro") || t.includes("digital") || t.includes("cyber") || t.includes("semiconductor") || category.toLowerCase() === "science & tech") {
    return "Science, Tech & Innovation";
  }
  if (t.includes("award") || t.includes("nobel") || t.includes("grammy") || category.toLowerCase() === "awards") {
    return "Awards & Honours";
  }
  if (t.includes("olympics") || t.includes("wimbledon") || t.includes("open") || t.includes("wpl") || category.toLowerCase() === "sports") {
    return "Sports Update";
  }
  if (t.includes("policy") || t.includes("framework") || category.toLowerCase() === "policy") {
    return "Policy & Governance";
  }
  return "National & Governance";
}

function inferWhyItMatters(category: string, newsType: string) {
  const c = category.toLowerCase();
  if (c === "legal" || newsType === "Judgment / Legal Update") {
    return "Important for legal aptitude: courts, constitutional interpretation, citizen rights, and justice-delivery reforms.";
  }
  if (c === "international") {
    return "High-value for current affairs: India’s global partnerships, multilateral platforms, and treaty-level discussions.";
  }
  if (c === "economy") {
    return "Frequently asked in exam prep: budget priorities, inflation, policy impact, and economic governance.";
  }
  if (c === "science & tech") {
    return "Useful for innovation-based questions, mission objectives, and self-reliance themes in strategic sectors.";
  }
  if (c === "sports") {
    return "Sports events are common short factual MCQs (event, host, year, and notable outcomes).";
  }
  return "Supports broad GK and CA accuracy through facts, institutions, and policy relevance.";
}

function inferExamFocus(month: string, title: string, category: string) {
  return `Exam focus: remember month (${month}), event title (${title}), and category (${category}) for direct MCQs.`;
}

function toKeyPoints(content: string) {
  const pieces = content
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3)
    .map((s) => (s.endsWith(".") ? s : `${s}.`));

  if (!pieces.length) {
    return ["Read this item once for context and once for factual recall."];
  }
  return pieces;
}

const rawCurrentAffairsData: RawCurrentAffairMonth[] = [
  {
    month: "March 2026",
    topics: [
      {
        date: "2026-03-27",
        title: "Supreme Court clarifies AI-data consent standards",
        content:
          "In a privacy-focused hearing, the Supreme Court reiterated that meaningful consent must be specific, informed, and revocable for large-scale digital platforms. The observation is highly relevant for legal current affairs and constitutional rights under Article 21.",
        category: "Legal",
      },
      {
        date: "2026-03-21",
        title: "India advances Samudrayaan testing milestones",
        content:
          "Deep-sea mission preparations moved ahead with habitat and life-support validation. Exam point: strategic significance of blue economy, marine resources, and scientific self-reliance.",
        category: "Science & Tech",
      },
      {
        date: "2026-03-14",
        title: "Election Commission announces voter awareness drive",
        content:
          "A nationwide campaign was launched for first-time voters focusing on digital enrollment and ethical voting participation. Useful for polity and governance-oriented MCQs.",
        category: "National",
      },
      {
        date: "2026-03-06",
        title: "India signs regional disaster-response cooperation framework",
        content:
          "Member countries agreed to data sharing, rapid logistics corridors, and early-warning coordination for climate disasters. Important for international relations and environment coverage.",
        category: "International",
      },
    ],
  },
  {
    month: "February 2026",
    topics: [
      {
        date: "2026-02-28",
        title: "Union Budget 2026-27: legal education and skilling boost",
        content:
          "Budget provisions announced higher outlays for digital universities, legal aid clinics, and youth employability. Remember budget themes and sector-wise allocations for exam prep.",
        category: "Economy",
      },
      {
        date: "2026-02-22",
        title: "Milan-Cortina Winter Olympics closes",
        content:
          "The event concluded with emphasis on green sports infrastructure and athlete safety protocols. Sports + environment linkage is a common current-affairs pattern.",
        category: "Sports",
      },
      {
        date: "2026-02-15",
        title: "National cyber resilience policy draft released",
        content:
          "The draft policy highlights critical infrastructure protection, cybercrime reporting standards, and legal accountability in digital ecosystems.",
        category: "Policy",
      },
      {
        date: "2026-02-07",
        title: "India-led startup legal compliance platform launched",
        content:
          "A digital platform was rolled out to simplify registrations, filings, and compliance advisories for startups. Relevant to governance and digital public infrastructure.",
        category: "Economy",
      },
    ],
  },
  {
    month: "January 2026",
    topics: [
      {
        date: "2026-01-30",
        title: "New CJI stresses pendency reduction roadmap",
        content:
          "In administrative review meetings, emphasis was laid on digital courts, case prioritization, and technology-backed judicial efficiency.",
        category: "Appointments",
      },
      {
        date: "2026-01-22",
        title: "Pravasi Bharatiya Divas highlights diaspora partnerships",
        content:
          "Discussions focused on innovation, investment channels, and knowledge transfer from global Indian communities to domestic sectors.",
        category: "National",
      },
      {
        date: "2026-01-16",
        title: "National legal aid awareness week observed",
        content:
          "Campaigns emphasized access to justice, free legal services, and rights literacy in rural and semi-urban regions.",
        category: "Legal",
      },
      {
        date: "2026-01-08",
        title: "India announces expanded semiconductor collaboration",
        content:
          "Cross-border collaboration in chip manufacturing and workforce training was announced to strengthen strategic technology capacity.",
        category: "Science & Tech",
      },
    ],
  },
  {
    month: "December 2025",
    topics: [
      {
        date: "2025-12-29",
        title: "COP30 outcomes: stronger forest conservation commitments",
        content:
          "Negotiators agreed on expanded reporting norms for forest conservation and financing pathways for vulnerable economies.",
        category: "International",
      },
      {
        date: "2025-12-23",
        title: "Sahitya Akademi awards celebrate multilingual literature",
        content:
          "The awards highlighted literary contributions in multiple Indian languages and renewed focus on translation ecosystems.",
        category: "Awards",
      },
      {
        date: "2025-12-15",
        title: "Supreme Court expands hearing access through hybrid courts",
        content:
          "Hybrid proceedings received procedural clarity to improve access and reduce travel burdens for litigants and advocates.",
        category: "Legal",
      },
      {
        date: "2025-12-07",
        title: "National clean air action review released",
        content:
          "The review reported progress in emissions monitoring and city-level mitigation but called for faster enforcement.",
        category: "Environment",
      },
    ],
  },
  {
    month: "November 2025",
    topics: [
      {
        date: "2025-11-27",
        title: "G20 summit emphasizes debt sustainability frameworks",
        content:
          "Leaders discussed restructuring pathways, climate finance integration, and safeguards for low-income economies.",
        category: "International",
      },
      {
        date: "2025-11-21",
        title: "ISRO's Shukrayaan-1 mission updates announced",
        content:
          "Mission planners released scientific objectives around atmospheric chemistry and surface imaging of Venus.",
        category: "Science & Tech",
      },
      {
        date: "2025-11-14",
        title: "National Constitution Day outreach begins",
        content:
          "Institutions launched civic literacy events on fundamental rights, duties, and constitutional values.",
        category: "Polity",
      },
      {
        date: "2025-11-06",
        title: "Central bank reports inflation moderation trend",
        content:
          "Food-price management and supply-side interventions were cited as key contributors to easing inflation pressure.",
        category: "Economy",
      },
    ],
  },
  {
    month: "October 2025",
    topics: [
      {
        date: "2025-10-28",
        title: "Nobel announcements spotlight science and diplomacy",
        content:
          "Prize selections renewed discussions on global peacebuilding, breakthrough research, and social impact innovation.",
        category: "Awards",
      },
      {
        date: "2025-10-20",
        title: "Review of new criminal laws enters implementation phase-2",
        content:
          "Training modules for police, prosecution, and trial courts were expanded for smoother adoption of the new legal framework.",
        category: "Legal",
      },
      {
        date: "2025-10-12",
        title: "India scales digital public grievance platform",
        content:
          "A redesigned grievance portal added multilingual tracking and escalation features for service delivery accountability.",
        category: "Governance",
      },
      {
        date: "2025-10-04",
        title: "World teachers policy forum hosts India session",
        content:
          "Policy dialogue focused on teacher training, digital pedagogy, and assessment reforms.",
        category: "Education",
      },
    ],
  },
  {
    month: "September 2025",
    topics: [
      {
        date: "2025-09-26",
        title: "Quad leaders reaffirm Indo-Pacific cooperation",
        content:
          "Maritime security, resilient supply chains, and emerging technology governance remained core agenda points.",
        category: "International",
      },
      {
        date: "2025-09-19",
        title: "Asian Games preparations include sustainability charter",
        content:
          "Organizers announced carbon-conscious infrastructure planning and athlete welfare standards.",
        category: "Sports",
      },
      {
        date: "2025-09-11",
        title: "National legal literacy camps expanded to districts",
        content:
          "District-level camps covered cyber fraud rights, consumer law basics, and legal aid access routes.",
        category: "Legal",
      },
      {
        date: "2025-09-03",
        title: "Women-led SHG export support package launched",
        content:
          "A new package aimed to improve market access, branding, and logistics for women entrepreneurs.",
        category: "Economy",
      },
    ],
  },
  {
    month: "August 2025",
    topics: [
      {
        date: "2025-08-25",
        title: "Independence month governance outreach programs",
        content:
          "Public institutions conducted village-level awareness drives on welfare rights and digital access.",
        category: "National",
      },
      {
        date: "2025-08-18",
        title: "BRICS finance dialogue discusses local currency trade",
        content:
          "Participants examined settlement mechanisms and cross-border payment interoperability.",
        category: "International",
      },
      {
        date: "2025-08-12",
        title: "National startup policy amendments proposed",
        content:
          "Draft changes include compliance simplification, angel taxation clarity, and incubation incentives.",
        category: "Policy",
      },
      {
        date: "2025-08-05",
        title: "River restoration mission phase update",
        content:
          "State reports highlighted sewage treatment progress and urban-river monitoring systems.",
        category: "Environment",
      },
    ],
  },
  {
    month: "July 2025",
    topics: [
      {
        date: "2025-07-27",
        title: "Wimbledon season wraps with ranking shake-up",
        content:
          "Grand Slam outcomes influenced season standings and sparked conversation on sports science preparation.",
        category: "Sports",
      },
      {
        date: "2025-07-21",
        title: "NEP five-year review reports competency gains",
        content:
          "The review highlighted foundational literacy outcomes, digital classroom usage, and skilling pathways.",
        category: "Education",
      },
      {
        date: "2025-07-13",
        title: "Parliament committee discusses court infrastructure",
        content:
          "Recommendations included e-filing expansion, video evidence management, and case-flow digitization.",
        category: "Legal",
      },
      {
        date: "2025-07-06",
        title: "National nutrition mission publishes progress dashboard",
        content:
          "District-level indicators showed improvement in service coverage and data-based targeting.",
        category: "National",
      },
    ],
  },
  {
    month: "June 2025",
    topics: [
      {
        date: "2025-06-25",
        title: "G7 summit outlines AI safety cooperation",
        content:
          "Member states discussed model transparency, risk governance, and responsible innovation pathways.",
        category: "International",
      },
      {
        date: "2025-06-17",
        title: "World Environment Day campaigns scaled",
        content:
          "States launched anti-plastic drives, waste segregation plans, and youth climate volunteering projects.",
        category: "Environment",
      },
      {
        date: "2025-06-10",
        title: "India's logistics policy implementation review",
        content:
          "Review focused on multimodal connectivity, freight efficiency, and digital tracking systems.",
        category: "Economy",
      },
      {
        date: "2025-06-03",
        title: "National legal services authority outreach report",
        content:
          "The report emphasized pre-litigation mediation and rights awareness in underserved communities.",
        category: "Legal",
      },
    ],
  },
  {
    month: "May 2025",
    topics: [
      {
        date: "2025-05-28",
        title: "French Open 2025 enters final rounds",
        content:
          "Major matchups drew focus on endurance, clay-court strategy, and global tennis rankings.",
        category: "Sports",
      },
      {
        date: "2025-05-20",
        title: "World Health Assembly adopts preparedness protocols",
        content:
          "Delegates endorsed stronger surveillance, equitable access mechanisms, and public-health financing norms.",
        category: "International",
      },
      {
        date: "2025-05-13",
        title: "Urban air-quality index policy revision proposed",
        content:
          "The revision recommends tighter source attribution and real-time public disclosure standards.",
        category: "Environment",
      },
      {
        date: "2025-05-06",
        title: "Consumer rights awareness digital campaign launched",
        content:
          "The campaign includes modules on e-commerce refunds, misleading ads, and grievance redress timelines.",
        category: "Governance",
      },
    ],
  },
  {
    month: "April 2025",
    topics: [
      {
        date: "2025-04-29",
        title: "RBI policy keeps repo stance data-dependent",
        content:
          "Policy commentary emphasized balancing inflation control with growth support amid global uncertainties.",
        category: "Economy",
      },
      {
        date: "2025-04-22",
        title: "Earth Day 2025 mobilizes corporate net-zero plans",
        content:
          "Major firms announced transition roadmaps around renewable energy and emission auditing systems.",
        category: "Environment",
      },
      {
        date: "2025-04-15",
        title: "Judicial internship reforms discussed",
        content:
          "Recommendations proposed structured clerkship pathways and skills-based legal training modules.",
        category: "Legal",
      },
      {
        date: "2025-04-08",
        title: "National digital health records interoperability update",
        content:
          "Authorities published standards to improve secure data exchange across healthcare providers.",
        category: "Science & Tech",
      },
    ],
  },
  {
    month: "March 2025",
    topics: [
      {
        date: "2025-03-27",
        title: "Academy Awards spotlight global storytelling",
        content:
          "The ceremony highlighted independent cinema trends and cross-border creative collaborations.",
        category: "Awards",
      },
      {
        date: "2025-03-19",
        title: "WPL season concludes with tactical cricket innovations",
        content:
          "Teams showcased data-driven bowling plans and improved fielding standards in crunch moments.",
        category: "Sports",
      },
      {
        date: "2025-03-12",
        title: "Parliamentary legal reform dialogue expands",
        content:
          "Committees debated implementation timelines, capacity building, and citizen-facing communication.",
        category: "Legal",
      },
      {
        date: "2025-03-05",
        title: "State-level startup policy convergence report released",
        content:
          "The report identified best practices in incubation, patent support, and innovation procurement.",
        category: "Economy",
      },
    ],
  },
  {
    month: "February 2025",
    topics: [
      {
        date: "2025-02-26",
        title: "Union Budget 2025-26 emphasizes infra and jobs",
        content:
          "Capital expenditure, logistics expansion, and manufacturing-linked skilling were key policy highlights.",
        category: "Economy",
      },
      {
        date: "2025-02-18",
        title: "Grammy awards celebrate global music influence",
        content:
          "The ceremony reflected cross-genre collaboration and digital-era artist distribution patterns.",
        category: "Awards",
      },
      {
        date: "2025-02-11",
        title: "National mediation framework consultation launched",
        content:
          "Public consultation sought to strengthen institutional mediation and reduce civil-case pendency.",
        category: "Legal",
      },
      {
        date: "2025-02-04",
        title: "Science outreach mission for school labs announced",
        content:
          "Program priorities include practical STEM kits, teacher mentoring, and regional innovation fairs.",
        category: "Science & Tech",
      },
    ],
  },
  {
    month: "January 2025",
    topics: [
      {
        date: "2025-01-30",
        title: "Judicial capacity roadmap discussed at national conference",
        content:
          "A national conference on judicial administration emphasized reducing pendency through digital case-flow systems, virtual hearing support, and targeted court infrastructure upgrades.",
        category: "Legal",
      },
      {
        date: "2025-01-29",
        title: "Public health data interoperability standards updated",
        content:
          "Authorities published new implementation guidance for interoperable health records, consent-linked access, and institutional accountability for secure data exchange.",
        category: "Science & Tech",
      },
      {
        date: "2025-01-28",
        title: "Republic Day parade highlights women-led contingents",
        content:
          "The event featured themes of constitutional patriotism, defense modernization, and social inclusion, with notable focus on women-led units and indigenous capability.",
        category: "National",
      },
      {
        date: "2025-01-27",
        title: "Rural legal awareness drives scaled across districts",
        content:
          "Legal literacy camps were expanded to cover rights awareness, legal aid access, and grievance mechanisms for underserved populations in district clusters.",
        category: "Legal",
      },
      {
        date: "2025-01-26",
        title: "Constitutional values outreach marked on Republic Day",
        content:
          "Educational institutions and civic bodies hosted constitutional awareness sessions covering rights, duties, federal design, and democratic participation.",
        category: "Polity",
      },
      {
        date: "2025-01-25",
        title: "National voter enrollment campaign enters university phase",
        content:
          "Election officials expanded first-time voter enrollment and digital verification support in colleges, focusing on accuracy and participation.",
        category: "National",
      },
      {
        date: "2025-01-24",
        title: "State startup facilitation portals receive compliance upgrades",
        content:
          "Multiple states introduced simplified filing workflows, legal templates, and timeline-based compliance reminders for early-stage enterprises.",
        category: "Economy",
      },
      {
        date: "2025-01-23",
        title: "Inter-ministerial panel reviews cybercrime reporting framework",
        content:
          "The review focused on response-time benchmarks, digital evidence handling, and victim-support pathways in cyber fraud cases.",
        category: "Policy",
      },
      {
        date: "2025-01-22",
        title: "Pravasi Bharatiya engagement sessions stress innovation links",
        content:
          "Sessions explored diaspora-led capital, mentorship channels, and strategic knowledge partnerships for domestic industry and education sectors.",
        category: "National",
      },
      {
        date: "2025-01-21",
        title: "National mediation ecosystem consultation progresses",
        content:
          "Stakeholders discussed institutional mediation capacity, pre-litigation settlement models, and training architecture for dispute resolution professionals.",
        category: "Legal",
      },
      {
        date: "2025-01-20",
        title: "Australian Open delivers major ranking outcomes",
        content:
          "Top-seeded performances shaped early-season global tennis narratives, with focus on consistency, tactical depth, and ranking impacts.",
        category: "Sports",
      },
      {
        date: "2025-01-19",
        title: "Urban mobility policy pilots expanded in metro corridors",
        content:
          "Pilot plans emphasized multimodal integration, smart-ticketing interoperability, and commuter safety benchmarks.",
        category: "Governance",
      },
      {
        date: "2025-01-18",
        title: "Women-led SHG market access program receives logistics support",
        content:
          "Program upgrades included digital cataloging, packaging compliance, and route optimization support for last-mile delivery channels.",
        category: "Economy",
      },
      {
        date: "2025-01-17",
        title: "Green municipal financing workshop held for local bodies",
        content:
          "City administrators reviewed climate budgeting, green bonds, and transparent project-monitoring frameworks for urban resilience.",
        category: "Environment",
      },
      {
        date: "2025-01-16",
        title: "Legal aid week focuses on rights-based service delivery",
        content:
          "Awareness activities highlighted legal aid eligibility, helpline access, and procedural support for vulnerable communities.",
        category: "Legal",
      },
      {
        date: "2025-01-15",
        title: "National skilling dashboard integrates industry demand data",
        content:
          "Updated dashboards mapped local skill demand with training pathways to improve employability and placement planning.",
        category: "Economy",
      },
      {
        date: "2025-01-14",
        title: "Digital governance standards released for grievance redress",
        content:
          "Guidelines emphasized multilingual submissions, escalation timelines, and audit trails for improved citizen service accountability.",
        category: "Governance",
      },
      {
        date: "2025-01-13",
        title: "Constitution literacy campaign starts in universities",
        content:
          "Law and non-law institutions began public seminars on rights, duties, and federal structure basics, boosting constitutional awareness among youth.",
        category: "Polity",
      },
      {
        date: "2025-01-12",
        title: "National science communication initiative launched for schools",
        content:
          "New modules for practical STEM engagement were introduced to improve conceptual learning and innovation orientation.",
        category: "Science & Tech",
      },
      {
        date: "2025-01-11",
        title: "High-level review on inflation-sensitive commodities held",
        content:
          "The review assessed supply-chain bottlenecks, storage efficiency, and market intervention triggers for essential commodities.",
        category: "Economy",
      },
      {
        date: "2025-01-10",
        title: "District court digitization progress report released",
        content:
          "The report highlighted e-filing adoption, hybrid hearing readiness, and phased rollout priorities for record digitization.",
        category: "Legal",
      },
      {
        date: "2025-01-09",
        title: "Diaspora day discussions emphasize innovation partnerships",
        content:
          "Policy sessions explored cross-border startup collaboration, R&D mentorship, and investment facilitation channels.",
        category: "International",
      },
      {
        date: "2025-01-08",
        title: "Semiconductor workforce initiative announced",
        content:
          "A capacity-building initiative was launched for chip design and fabrication-linked technical skills in strategic institutes.",
        category: "Science & Tech",
      },
      {
        date: "2025-01-07",
        title: "National mission on clean rivers reviews city action plans",
        content:
          "Review meetings assessed sewage treatment milestones, quality monitoring data, and implementation bottlenecks.",
        category: "Environment",
      },
      {
        date: "2025-01-06",
        title: "Digital payments security advisory issued",
        content:
          "Regulators urged stronger authentication practices, fraud-reporting awareness, and digital transaction hygiene for consumers.",
        category: "Economy",
      },
      {
        date: "2025-01-05",
        title: "National road safety enforcement week begins",
        content:
          "Authorities launched integrated awareness and enforcement drives with real-time monitoring and high-risk corridor mapping.",
        category: "National",
      },
      {
        date: "2025-01-04",
        title: "Policy dialogue on data protection compliance held",
        content:
          "Stakeholders reviewed consent architecture, fiduciary obligations, and enforcement considerations for digital platforms.",
        category: "Policy",
      },
      {
        date: "2025-01-03",
        title: "Higher education quality index update released",
        content:
          "The update tracked outcomes in accreditation quality, research engagement, and student support systems.",
        category: "Education",
      },
      {
        date: "2025-01-02",
        title: "National logistics platform adds multimodal tracking",
        content:
          "Platform enhancements enabled better shipment visibility across rail-road-port networks and improved delivery predictability.",
        category: "Economy",
      },
      {
        date: "2025-01-01",
        title: "New year governance brief outlines reform priorities",
        content:
          "The annual governance brief highlighted priorities in justice delivery, service digitization, skilling, and institutional coordination.",
        category: "Governance",
      },
    ],
  },
];

export const currentAffairsData: CurrentAffairMonth[] = rawCurrentAffairsData.map((monthBlock) => ({
  ...monthBlock,
  topics: monthBlock.topics.map((topic) => {
    const newsType = inferNewsType(topic.category, topic.title);
    return {
      ...topic,
      newsType,
      keyPoints: toKeyPoints(topic.content),
      whyItMatters: inferWhyItMatters(topic.category, newsType),
      examFocus: inferExamFocus(monthBlock.month, topic.title, topic.category),
    };
  }),
}));
