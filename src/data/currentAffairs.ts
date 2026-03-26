export type CurrentAffairTopic = {
  date: string;
  title: string;
  content: string;
  category: string;
};

export type CurrentAffairMonth = {
  month: string;
  topics: CurrentAffairTopic[];
};

export const currentAffairsData: CurrentAffairMonth[] = [
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
        date: "2025-01-28",
        title: "Republic Day parade highlights women-led contingents",
        content:
          "The event featured themes of constitutional patriotism, defense modernization, and social inclusion.",
        category: "National",
      },
      {
        date: "2025-01-20",
        title: "Australian Open delivers major ranking outcomes",
        content:
          "Top-seeded performances shaped early-season global tennis narratives.",
        category: "Sports",
      },
      {
        date: "2025-01-13",
        title: "Constitution literacy campaign starts in universities",
        content:
          "Law and non-law institutions began public seminars on rights, duties, and federal structure basics.",
        category: "Polity",
      },
      {
        date: "2025-01-06",
        title: "Digital payments security advisory issued",
        content:
          "Regulators urged stronger authentication practices and fraud-reporting awareness for consumers.",
        category: "Economy",
      },
    ],
  },
];
