"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    id: "rpp",
    index: "01",
    eyebrow: "Production product · AI product engineering",
    title: "Retailer Pulse Platform",
    tagline: "Turning dealer data into decisions.",
    description:
      "A cross-platform dealer operations platform serving 450+ retail locations, bringing financial performance, CRM visibility, operational analytics, resources, and AI-assisted decision support into one product experience.",
    role: "Product definition → UX → Full-stack engineering → AI workflows → Launch",
    tags: ["Web", "iOS", "Android", "Analytics", "AI"],
    signal: "450+",
    signalLabel: "retail locations",
    visual: "pulse",
  },
  {
    id: "erp",
    index: "02",
    eyebrow: "Enterprise system · Product redesign · AI",
    title: "AI Manufacturing ERP",
    tagline: "From fragmented operations to an intelligent operating system.",
    description:
      "Designed around real factory workflows, the system connects materials, BOMs, routing, work orders, quality control, inventory, payroll, and management analytics into a structured operational platform.",
    role: "Process discovery → Data modeling → Product architecture → UX → AI workflows → Prototype",
    tags: ["Manufacturing", "ERP", "Systems design", "Workflow automation"],
    signal: "8",
    signalLabel: "connected domains",
    visual: "erp",
  },
];

const supportingProjects = [
  {
    index: "03",
    title: "Octavate",
    eyebrow: "Applied AI · Full-stack",
    tagline: "Making music intelligence conversational.",
    copy: "An AI-powered experience for exploring artist and market data through natural-language conversations, grounded in structured data covering 3,000+ artists.",
    meta: "Conversational AI · React · Python · Data",
    accent: "3,000+ artists",
  },
  {
    index: "04",
    title: "AI Jewelry Studio",
    eyebrow: "Product concept · AI-native UX",
    tagline: "A new interaction model for custom jewelry.",
    copy: "A product concept exploring how conversational AI, generative design, and human craftsmanship can transform an idea into a manufacturable custom piece.",
    meta: "Generative AI · Product design · Interaction",
    accent: "Idea → object",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand the system",
    copy: "Map how people, data, decisions, and operational constraints interact before proposing features.",
    detail: "Observe · Map · Question",
  },
  {
    number: "02",
    title: "Define the product",
    copy: "Turn fragmented requirements into clear workflows, information architecture, and product behavior.",
    detail: "Flows · States · Systems",
  },
  {
    number: "03",
    title: "Design the experience",
    copy: "Translate complex system behavior into interfaces that make the next decision feel obvious.",
    detail: "Hierarchy · Interaction · Feedback",
  },
  {
    number: "04",
    title: "Build across the stack",
    copy: "Keep product decisions connected to technical reality across frontend, backend, data, and APIs.",
    detail: "Frontend · Backend · Data",
  },
  {
    number: "05",
    title: "Add intelligence intentionally",
    copy: "Use AI to reduce cognitive load, detect exceptions, automate reasoning, and improve decisions.",
    detail: "Assist · Detect · Explain",
  },
  {
    number: "06",
    title: "Ship and learn",
    copy: "Treat launch as part of product development and refine the system through real-world feedback.",
    detail: "Launch · Measure · Refine",
  },
];

function ProjectVisual({ type }: { type: string }) {
  if (type === "pulse") {
    return (
      <div className="product-visual pulse-visual" aria-label="Retailer Pulse decision-support interface abstraction">
        <div className="visual-toolbar">
          <span>Retailer Pulse / Performance</span>
          <span className="live-dot">Live signal</span>
        </div>
        <div className="pulse-layout">
          <div className="pulse-chart">
            <div className="chart-label">Sales performance</div>
            <div className="bar-group" aria-hidden="true">
              {[42, 61, 52, 74, 67, 86, 78, 94].map((height, index) => (
                <span key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="chart-axis"><span>May</span><span>Now</span></div>
          </div>
          <div className="insight-stack">
            <div className="insight-card emphasis">
              <span>Opportunity detected</span>
              <strong>+14%</strong>
              <small>vs. peer benchmark</small>
            </div>
            <div className="insight-card">
              <span>AI opportunity brief</span>
              <p>Lead response is improving. Review three stores with unusual conversion gaps.</p>
              <small>View recommended attention →</small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-visual erp-visual" aria-label="Manufacturing ERP system map abstraction">
      <div className="visual-toolbar">
        <span>Factory operating model</span>
        <span>8 connected domains</span>
      </div>
      <div className="system-map">
        <div className="system-node primary-node"><small>Core</small><strong>Work order</strong></div>
        <div className="system-node node-a">Materials</div>
        <div className="system-node node-b">BOM</div>
        <div className="system-node node-c">Routing</div>
        <div className="system-node node-d">Production</div>
        <div className="system-node node-e">QC</div>
        <div className="system-node node-f">Inventory</div>
        <div className="system-node node-g">Payroll</div>
        <div className="system-connection connection-a" aria-hidden="true" />
        <div className="system-connection connection-b" aria-hidden="true" />
        <div className="system-connection connection-c" aria-hidden="true" />
        <div className="system-connection connection-d" aria-hidden="true" />
      </div>
      <div className="system-footer"><span>Structured operations</span><span>Exception detection</span><span>Decision support</span></div>
    </div>
  );
}

export default function Home() {
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeSection, setActiveSection] = useState("work");

  useEffect(() => {
    const root = document.documentElement;
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      root.style.setProperty("--scroll-progress", `${progress}%`);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateProgress);
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const handleHeroPointer = (event: React.MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--pointer-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--pointer-y", y.toFixed(3));
  };

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label="Kexun Sherry Liu, home">
          Kexun <span>(Sherry)</span> Liu
        </a>
        <nav aria-label="Primary navigation">
          {["work", "process", "about"].map((item) => (
            <a key={item} href={`#${item}`} className={activeSection === item ? "active" : ""}>
              {item === "process" ? "How I work" : item}
            </a>
          ))}
        </nav>
        <a className="nav-contact" href="https://www.linkedin.com/in/kexun-sherry-liu-aa28162b2/" target="_blank" rel="noreferrer">
          Connect <span>↗</span>
        </a>
      </header>

      <main>
        <section className="hero" id="top" onMouseMove={handleHeroPointer}>
          <div className="hero-registration" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="hero-kicker hero-enter delay-1">
            <span>AI Product Engineer</span>
            <span>New York, NY</span>
          </div>
          <h1 className="hero-title" aria-label="I turn complex workflows into intelligent products.">
            <span className="hero-line hero-enter delay-2">I turn complex workflows into</span>
            <em className="hero-line hero-enter delay-3">intelligent products.</em>
          </h1>
          <div className="hero-bottom hero-enter delay-4">
            <p>
              I work across <strong>product, design, engineering, and applied AI</strong> to transform ambiguous business problems into intuitive software systems.
            </p>
            <a className="editorial-link" href="#work"><span>Explore selected work</span><span>↘</span></a>
          </div>
          <div className="hero-capabilities hero-enter delay-5">
            <span>Product engineering</span>
            <span>Applied AI</span>
            <span>Full-stack</span>
            <span>Systems design</span>
          </div>
        </section>

        <section className="proof-strip reveal" aria-label="Selected proof points">
          <div><strong>450+</strong><span>Retail locations served</span></div>
          <div><strong>3</strong><span>Production platforms</span></div>
          <div><strong>3,000+</strong><span>Artists in structured data</span></div>
          <div><strong>0→1</strong><span>Definition through launch</span></div>
        </section>

        <section className="work-section" id="work">
          <header className="section-intro reveal">
            <span className="section-label">Selected work / 01—04</span>
            <p>Four products. Four different signals of how I think, design, and build.</p>
          </header>

          <div className="flagship-list">
            {projects.map((project) => (
              <article className="flagship-project reveal" id={project.id} key={project.id}>
                <div className="project-index">{project.index}</div>
                <div className="project-story">
                  <p className="project-eyebrow">{project.eyebrow}</p>
                  <h2>{project.title}</h2>
                  <p className="project-tagline">{project.tagline}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-role"><span>My role</span><strong>{project.role}</strong></div>
                  <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <div className="project-output">
                  <div className="project-signal"><strong>{project.signal}</strong><span>{project.signalLabel}</span></div>
                  <ProjectVisual type={project.visual} />
                  <a className="case-link" href={`#${project.id}-note`}><span>View case study overview</span><span>→</span></a>
                </div>
                <div className="case-note" id={`${project.id}-note`}>
                  <span>{project.index} / Product signal</span>
                  <p>{project.id === "rpp" ? "I can define, build, and ship a real product across platforms." : "I can understand operational complexity and turn it into a coherent system."}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="supporting-grid">
            {supportingProjects.map((project) => (
              <article className="supporting-card reveal" key={project.title}>
                <div className="supporting-top"><span>{project.index}</span><span>{project.eyebrow}</span></div>
                <h3>{project.title}</h3>
                <p className="supporting-tagline">{project.tagline}</p>
                <p>{project.copy}</p>
                <div className="supporting-bottom"><span>{project.meta}</span><strong>{project.accent}</strong></div>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section" id="process">
          <header className="section-intro reveal">
            <span className="section-label">How I work / 01—06</span>
            <p>Product judgment stays connected to technical reality.</p>
          </header>
          <div className="process-layout reveal">
            <div className="process-list" role="tablist" aria-label="Product engineering process">
              {processSteps.map((step, index) => (
                <button
                  key={step.number}
                  type="button"
                  role="tab"
                  aria-selected={activeProcess === index}
                  onClick={() => setActiveProcess(index)}
                  onMouseEnter={() => setActiveProcess(index)}
                >
                  <span>{step.number}</span><strong>{step.title}</strong><span>↗</span>
                </button>
              ))}
            </div>
            <div className="process-detail" role="tabpanel" aria-live="polite">
              <div className="process-orbit" aria-hidden="true"><span /><span /><span /></div>
              <span className="process-number">{processSteps[activeProcess].number} / 06</span>
              <h3>{processSteps[activeProcess].title}</h3>
              <p>{processSteps[activeProcess].copy}</p>
              <span className="process-meta">{processSteps[activeProcess].detail}</span>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-heading reveal">
            <span className="section-label">About</span>
            <h2>Engineer by training.<br /><em>Product thinker by instinct.</em></h2>
          </div>
          <div className="about-copy reveal">
            <p>I’m an AI Product Engineer with a background in Computer Science and Mathematics from NYU.</p>
            <p>I’m most interested in products where the challenge is not simply implementing a predefined feature, but understanding a complex problem and determining what the product should actually do.</p>
            <p>My work sits at the intersection of product thinking, systems design, software engineering, and applied AI.</p>
          </div>
          <div className="about-principle reveal">
            <span>Current focus</span>
            <strong>Use AI to build better products—not AI for its own sake.</strong>
          </div>
        </section>

        <section className="contact-section reveal">
          <span className="section-label">Open to the next complex problem</span>
          <h2>Let’s build something<br /><em>useful and intelligent.</em></h2>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/kexun-sherry-liu-aa28162b2/" target="_blank" rel="noreferrer"><span>LinkedIn</span><span>↗</span></a>
            <a href="https://github.com/SherryKu" target="_blank" rel="noreferrer"><span>GitHub</span><span>↗</span></a>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 Kexun (Sherry) Liu</span>
        <span>AI Product Engineer · New York</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
