/**
 * All of the words on the site live here.
 * Edit this file to change copy; the layouts read from it.
 *
 *   1. The site and its three pages
 *   2. The landing page (two doors)
 *   3. The engineer page
 *   4. The musician page
 */

/* -------------------------------------------------------------------------
   1. The site and its three pages
   ------------------------------------------------------------------------- */

export const site = {
  name: "Kexun Liu",
  url: "https://sherryku.github.io/personal-portfolio/",
  linkedin: "https://www.linkedin.com/in/kexun-sherry-liu-aa28162b2/",
  jobTitle: "AI Business Application Developer",
  employer: "LionOBytes",
  school: "New York University",
};

/** Browser-tab titles and the descriptions used by search engines and link previews. */
export const pages = {
  home: {
    path: "/",
    title: "Kexun Liu — Musician and Engineer",
    description: "I find structure in sound, and poetry in systems.",
  },
  engineer: {
    path: "/engineer/",
    title: "Kexun Liu — Product Design, Frontend Engineering & AI",
    description:
      "I design and build digital products, bringing structure to complex workflows and care to the details people use every day.",
  },
  musician: {
    path: "/musician/",
    title: "Kexun Liu — Pipa",
    description:
      "A classically trained pipa virtuoso with more than 17 years of experience in traditional Chinese music.",
  },
};

export const footer = {
  line: "Made with clarity, curiosity, and care.",
};

/* -------------------------------------------------------------------------
   2. The landing page
   ------------------------------------------------------------------------- */

export const landing = {
  /** Each line ends in one word set in that side's ink: indigo for music, seal red for engineering. */
  statement: [
    { text: "I find structure in ", word: "sound,", ink: "indigo" },
    { text: "and poetry in ", word: "systems.", ink: "seal" },
  ],
  musician: { title: "Musician", topics: ["Performance", "Repertoire", "Creation"] },
  engineer: { title: "Engineer", topics: ["Product", "Systems", "AI"] },
  contactLabel: "Contact",
};

/* -------------------------------------------------------------------------
   3. The engineer page
   ------------------------------------------------------------------------- */

export const engineerNavigation = [
  { id: "work", label: "Work" },
  { id: "how-i-work", label: "How I work", wideOnly: true },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  tagline: ["A clear mind.", "A curious heart."],
  lead: "I design and build digital products, bringing structure to complex workflows and care to the details people use every day.",
  supporting: "My work spans product design, frontend engineering, and the possibilities of AI.",
  primaryAction: { label: "Explore my work", href: "#work" },
  secondaryAction: { label: "About me", href: "#about" },
};

/** The short list of facts beside the introduction. `href` is optional. */
export const facts: { term: string; value: string; detail?: string; href?: string }[] = [
  { term: "Now", value: "AI Business Application Developer", detail: "LionOBytes" },
  {
    term: "Shipped",
    value: "Retailer Pulse Platform",
    detail: "Web and mobile, serving 450+ retail stores",
    href: "#retailer-pulse",
  },
  {
    term: "Building",
    value: "Dealer-Facing AI Agent",
    detail: "Agent architecture and product experience",
    href: "#ai-agent",
  },
  { term: "Studied", value: "Computer Science and Mathematics", detail: "New York University" },
  { term: "Based", value: "New York–New Jersey area" },
];

export type Project = {
  /** Used for the page anchor and for the screenshot folder: public/work/<slug>/ */
  slug: string;
  index: string;
  title: string;
  thesis: string;
  overview: string;
  role: string;
  disciplines: string[];
  highlights?: string[];
  sections?: { heading: string; paragraphs: string[] }[];
  showScreenshots?: boolean;
  status?: string;
  metric?: { value: string; label: string };
  /** The first project is given the widest layout. */
  featured?: boolean;
  /**
   * The link is shown only once `href` is filled in,
   * so nothing leads to a case study that isn't written yet.
   */
  link: { label: string; href?: string };
};

export const projects: Project[] = [
  {
    slug: "retailer-pulse",
    index: "01",
    title: "Retailer Pulse Platform",
    thesis: "Giving dealers a clearer view of what they earn.",
    overview:
      "A web and mobile portal serving 450+ retail stores, with access to performance metrics, financials, documents, and support.",
    role: "I led the frontend work from requirements and product design through implementation and delivery. My work focused on self-service financial reporting for dealers and monthly commission workflows for revenue operations.",
    sections: [
      {
        heading: "Finance module",
        paragraphs: [
          "Shipped P&L and commission overview and detail pages. Replacing mock data with the live commission API gave dealers direct access to their earnings and cut back-and-forth on commission inquiries by 63%.",
        ],
      },
      {
        heading: "Workbook sync",
        paragraphs: [
          "Designed a connect, sync, and export workflow with labeled columns, normalized API responses, and a history of every sync job. Revenue operations can load and trace monthly commission workbooks, cutting manual spreadsheet prep from four hours to five minutes per month.",
        ],
      },
    ],
    disciplines: ["Product Design", "Frontend Engineering", "Web & Mobile"],
    metric: { value: "450+", label: "retail stores served" },
    featured: true,
    link: { label: "View case study" },
  },
  {
    slug: "ai-agent",
    index: "02",
    title: "Dealer-Facing AI Agent",
    thesis: "Self-service answers from portal data.",
    overview:
      "Dealers can ask about commissions, P&L, and activations in plain language.",
    role: "I lead the agent architecture, product design, and evaluation.",
    sections: [
      {
        heading: "Agent capabilities",
        paragraphs: [
          "The agent uses existing APIs, GraphQL queries, and reports to explain earnings changes. It hands unresolved questions to support with a pre-filled ticket and chat history. The goal is 75% fewer support tickets.",
        ],
      },
      {
        heading: "Security and trust",
        paragraphs: [
          "Tools enforce tenant and role permissions, filter hidden audit fields, and require confirmation before writes. Answers cite source records.",
        ],
      },
    ],
    disciplines: ["Agent Architecture", "Product Design", "AI Evaluation"],
    showScreenshots: false,
    status: "In development",
    link: { label: "Explore the approach" },
  },
  {
    slug: "c120-viewer",
    index: "03",
    title: "C120 Oil Pump Viewer",
    thesis: "See how the pump fits together and moves.",
    overview:
      "An interactive 3D visualization of the Hengniu C120 oil pump. Separate the assembly with an exploded-view slider or switch to the rotor animation to see how the gears mesh.",
    role: "I built a Three.js web component with selectable parts, rotor kinematics, and solid, see-through, and cross-section views.",
    disciplines: ["Three.js", "Web Components", "3D Visualization"],
    link: { label: "Open interactive 3D viewer", href: "/work/c120-viewer/demo/index.html?lang=en&explode=0.65" },
  },
  {
    slug: "octavate",
    index: "04",
    title: "Octavate",
    thesis: "Artist analytics and label insights for music teams.",
    overview:
      "A production AI music intelligence platform with real-time artist analytics and label insights across 3,000+ curated records.",
    role: "Full-Stack Software Engineer Intern · May–September 2025",
    highlights: [
      "Built the platform with Vite, React, Node.js, and Flask microservices.",
      "Implemented Google OAuth 2.0 and JWT session management, reducing onboarding friction by 80%.",
      "Used GPT function calling in multi-turn conversations to automate 60% of manual query steps.",
      "Persisted chat history across services and sessions, reducing retrieval latency by 40%.",
      "Added interactive Spline models and GSAP animations, increasing average time on page by 35%.",
    ],
    disciplines: ["Full-Stack Engineering", "AI Workflows", "Data Visualization"],
    metric: { value: "3,000+", label: "curated records" },
    link: { label: "Explore product preview" },
  },
];

export const process = {
  label: "How I Work",
  title: "From understanding to making.",
  steps: [
    {
      title: "Understand the work.",
      body: "I begin with the people, decisions, and constraints behind a request. Understanding the workflow helps me define what the product needs to do.",
    },
    {
      title: "Give complexity a clear form.",
      body: "I turn requirements into interfaces, interactions, and reusable patterns, with attention to hierarchy, context, and detail.",
    },
    {
      title: "Build, question, refine.",
      body: "I implement what I design, using AI coding tools throughout development. I review the result, test the experience, and refine it through feedback.",
    },
  ],
};

export const about = {
  label: "About",
  title: ["Precision in thought.", "Sensitivity in practice."],
  paragraphs: [
    "I’m Kexun, an AI Business Application Developer at LionOBytes and a graduate of New York University, where I studied Computer Science and Mathematics.",
    "My work brings together understanding a business problem, shaping the product, and building the interface. I enjoy following an idea through these stages, staying close to both its underlying logic and the people who will use it.",
    "Music has been part of my life since childhood. Years of playing the pipa have shaped my attention to rhythm, phrasing, and the patient work of refinement. That attention carries into how I design and build.",
  ],
  closing: "I find beauty in a well-built system, a carefully chosen word, and a note that lingers.",
  resumeLabel: "View résumé",
};

export const beyond = {
  label: "Beyond the Work",
  title: "A few things that keep me curious.",
  interests: [
    {
      title: "Music",
      body: "A lifelong practice in listening, interpretation, and expression.",
      link: { label: "The musician’s page", path: "/musician/" },
    },
    {
      title: "Art & Literature",
      body: "An interest in how a painting, a poem, or an ancient inscription can bring another person’s world into view.",
    },
    {
      title: "Design",
      body: "An ongoing attention to proportion, material, space, and the small choices that give something its character.",
    },
  ] as { title: string; body: string; link?: { label: string; path: string } }[],
};

export const contact = {
  label: "Contact",
  title: "Let’s make something thoughtful.",
  body: "I’m interested in opportunities across product engineering, AI applications, and solutions engineering—work that brings technical depth and thoughtful design together.",
  location: "Based in the New York–New Jersey area.",
  linkedinLabel: "LinkedIn",
  resumeLabel: "View résumé",
};

/* -------------------------------------------------------------------------
   4. The musician page
   ------------------------------------------------------------------------- */

export const musicianNavigation = [
  { id: "profile", label: "Profile" },
  { id: "performance", label: "Performance" },
  { id: "repertoire", label: "Repertoire", wideOnly: true },
  { id: "contact", label: "Contact" },
];

export type Performance = { year: number; when?: string; text: string };

export const musician = {
  role: "Musician",
  instrument: "Pipa",
  instrumentNative: "琵琶",
  tagline: ["I find structure", "in sound."],
  lead: "A classically trained pipa virtuoso with more than 17 years of experience in traditional Chinese music.",
  supporting:
    "Equally adept on Chinese and Western plucked-string instruments—including pipa, ruan, liuqin, and guitar—Kexun delivers a versatile, cross-cultural sound.",
  primaryAction: { label: "See performances", href: "#performance" },
  secondaryAction: { label: "Read the profile", href: "#profile" },

  /** The short list of facts beside the introduction. */
  facts: [
    {
      term: "Stages",
      value: "Carnegie Hall, Lincoln Center, United Nations Headquarters",
      detail: "Princeton University, The Newark Museum of Art",
    },
    {
      term: "Honors",
      value: "Silver Prize, national “Dunhuang Cup” competition",
      detail: "Grade 10, the highest level of the national pipa examination",
    },
    {
      term: "Ensembles",
      value: "The Chinese Music Ensemble of New York",
      detail: "Celadon Stars World Orchestra",
    },
    { term: "Training", value: "Prof. Zhen Zeng and Qian Jing", detail: "Studying since age six" },
    { term: "Based", value: "New York–New Jersey area" },
  ] as { term: string; value: string; detail?: string; href?: string }[],

  profile: {
    label: "Profile",
    /** A phrase from the biography, set large beside it. */
    title: ["A versatile,", "cross-cultural sound."],
    paragraphs: [
      "Kexun Liu is a classically trained pipa virtuoso with more than 17 years of experience in traditional Chinese music. She began her studies at age six with Prof. Zhen Zeng—Chair of the Chongqing Pipa Society and Distinguished Professor at Southwest University—and Qian Jing, Board Member of the Pipa & Ruan Committee of the China Nationalities Orchestra Society.",
      "In 2015 Kexun passed the Grade 10 national amateur pipa examination (the highest level) and captured the Silver Prize at the prestigious national “Dunhuang Cup” competition. She later received a full-tuition scholarship offer from the Bard US–China Music Institute and, in 2025, earned a B.A. in Mathematics & Computer Science from New York University.",
      "Equally adept on Chinese and Western plucked-string instruments—including pipa, ruan, liuqin, and guitar—Kexun delivers a versatile, cross-cultural sound. Her performance experience spans Carnegie Hall, Lincoln Center, the United Nations Headquarters, Princeton University, and The Newark Museum of Art, reflecting her commitment to both artistic excellence and cross-cultural engagement.",
    ],
  },

  /** Newest first. `when` is optional; entries without it are listed by year only. */
  performance: {
    label: "Performance",
    entries: [
      {
        year: 2026,
        when: "October",
        text: "Invited to perform at the 77th Anniversary Celebration of the Founding of the People’s Republic of China, hosted by the Consulate General of China in New York, presenting traditional Chinese repertoire including Flowers and Full Moon (花好月圆).",
      },
      {
        year: 2026,
        when: "September",
        text: "Served as lead pipa performer for Moonlit Night on the Spring River (春江花月夜) at One Journey, Many Hearts (明月共笙歌), a Mid-Autumn Festival concert presented by Celadon Stars.",
      },
      {
        year: 2026,
        when: "September",
        text: "Performed the traditional Chinese masterpiece Moonlit Night on the Spring River (春江花月夜) at the Mid-Autumn Festival Concert hosted by Princeton University.",
      },
      {
        year: 2026,
        when: "May",
        text: "Performed at Carnegie Hall as part of the Chinese Music Ensemble of New York’s 65th Anniversary Spring Concert, In Praise of the Golden Years (不负华年).",
      },
      {
        year: 2026,
        when: "February",
        text: "Invited to perform at Princeton University’s Spring Festival celebration, collaborating with music professor Vince Di Mura on Blue and White Porcelain (青花瓷), Edelweiss (雪绒花), and Juebie Shu (诀别书), exploring traditional Chinese instrumentation across musical styles.",
      },
      {
        year: 2026,
        when: "February",
        text: "Invited as a guest artist for Lunar New Year Community Day at The Newark Museum of Art, introducing traditional Chinese music and cultural heritage to the local community through live performance.",
      },
      {
        year: 2025,
        when: "December",
        text: "Presented a solo pipa performance of Give Me a Rose (送我一朵玫瑰花) at Classical Chinese Musical Instruments and Performance, a New Year cultural program hosted by Plainsboro Public Library, New Jersey.",
      },
      {
        year: 2025,
        when: "November",
        text: "Invited to perform at the 18th Edison Chinese Chorus Golden Autumn Concert, serving as lead pipa performer for the third movement of the Yellow River Cantata, The Yellow River’s Waters Come Down from Heaven (黄河之水天上来).",
      },
      {
        year: 2025,
        when: "October",
        text: "Organized and led an ensemble performance of Water-Cloud Moon (水云间·月) at Mid-Autumn Day in Poetry at the United Nations Headquarters, hosted by the China–US Culture and Arts Foundation.",
      },
      {
        year: 2025,
        when: "October",
        text: "Performed with the Chinese Music Ensemble of New York at its 65th Anniversary Fall Concert, In Praise of the Golden Years (不负华年), at Tribeca Theater, New York.",
      },
      {
        year: 2025,
        when: "September",
        text: "Organized and led ensemble performances of Water Dragon Chant (水龙吟) and Water-Cloud Moon (水云间·月) at the National Day Celebration hosted by the Consulate General of China in New York.",
      },
      {
        year: 2025,
        when: "July",
        text: "Performed with the Celadon Stars World Orchestra at the 6th Big Apple Music Festival at Carnegie Hall, New York.",
      },
      {
        year: 2025,
        when: "April",
        text: "Featured pipa soloist at the 80th Anniversary Concert of the Yellow River Cantata at Lincoln Center, performing Ambush on Ten Sides (十面埋伏) and leading Movement III, The Yellow River’s Waters Come Down from Heaven (黄河之水天上来).",
      },
      {
        year: 2024,
        when: "April",
        text: "Invited as a featured guest artist at a cultural exchange event co-hosted by the Consulate General of China in New York and NYU’s Institute of International Education, performing Han Dan (菡萏).",
      },
      {
        year: 2024,
        when: "April",
        text: "Directed and performed Han Dan (菡萏), a Chinese fusion production combining traditional music and contemporary dance, at NYU GALA.",
      },
      {
        year: 2022,
        text: "Collaborated with the band Desert Island on a contemporary rock adaptation of Goodbye Jack (再见杰克) at NYU GALA.",
      },
      {
        year: 2018,
        text: "Performed with the Chongqing Chinese Orchestra in the Sheng Man Hua Biao (声漫华表) concert.",
      },
    ] as Performance[],
  },

  /** Pieces named in the performance record above. */
  repertoire: {
    label: "Repertoire",
    pieces: [
      { title: "Ambush on Ten Sides", note: "Pipa classic" },
      { title: "Moonlit Night on the Spring River (春江花月夜)", note: "Traditional Chinese masterpiece" },
      {
        title: "The Yellow River’s Waters Come Down from Heaven (黄河之水天上来)",
        note: "Yellow River Cantata, Movement III",
      },
      { title: "Flowers and Full Moon (花好月圆)", note: "Traditional Chinese repertoire" },
      { title: "Blue and White Porcelain (青花瓷)" },
      { title: "Edelweiss (雪绒花)" },
      { title: "Give Me a Rose (送我一朵玫瑰花)", note: "Solo pipa" },
      { title: "Han Dan (菡萏)", note: "Chinese fusion, with contemporary dance" },
      { title: "Water Dragon Chant" },
      { title: "Water-Cloud Moon" },
      { title: "Goodbye Jack (再见杰克)", note: "Modern rock adaptation" },
    ] as { title: string; note?: string }[],
  },

  creation: {
    label: "Creation",
    works: [
      {
        year: "2024",
        title: "Han Dan (菡萏)",
        role: "Director and performer",
        body: "A Chinese fusion piece combining traditional music and contemporary dance. Later performed at a cultural exchange event co-hosted by the Consulate General of China in New York and NYU’s Institute of International Education.",
      },
      {
        year: "2025",
        title: "Water Dragon Chant and Water-Cloud Moon",
        role: "Director and ensemble lead",
        body: "Directed and led the team in both performances at the National Day Reception, at the invitation of the Chinese Consulate General in New York.",
      },
      {
        year: "2022",
        title: "Goodbye Jack (再见杰克)",
        role: "Collaboration with Desert Island",
        body: "A modern rock adaptation, made with the band Desert Island.",
      },
    ],
  },

  recognition: {
    label: "Awards and ensembles",
    awardsLabel: "Awards",
    ensemblesLabel: "Ensembles",
    awards: [
      {
        years: "2017",
        text: "National Silver Medal, Amateur Group (Youth), 3rd “Dunhuang Cup” Pipa Solo Competition",
      },
      { years: "2015–2020", text: "First Prize, Chongqing Municipal Student Arts Festival (multiple years)" },
    ],
    ensembles: [
      {
        years: "2025–Present",
        text: "Pipa Player, The Chinese Music Ensemble of New York, New York, NY",
        url: "https://www.chinesemusicensemble.org/",
      },
      { years: "2025–Present", text: "Key Musician, Celadon Stars World Orchestra, New York, NY" },
      {
        years: "2014–2020",
        text: "Ensemble Leader & Principal Pipa, Chongqing Nankai High School Chinese Orchestra, Chongqing, China",
      },
    ] as { years: string; text: string; url?: string }[],
  },

  contact: {
    label: "Contact",
    title: "Performances and collaborations.",
    body: "For performances, collaborations, and cultural programs.",
    location: "Based in the New York–New Jersey area.",
    linkedinLabel: "LinkedIn",
  },
};
