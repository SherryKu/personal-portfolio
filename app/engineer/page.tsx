import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Arrow } from "../components/Arrow";
import { OctavatePreview } from "../components/OctavatePreview";
import { ProjectEntry } from "../components/ProjectEntry";
import { RevealObserver } from "../components/RevealObserver";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { Strings } from "../components/Strings";
import {
  about,
  beyond,
  contact,
  engineerNavigation,
  facts,
  hero,
  landing,
  pages,
  process,
  projects,
  site,
} from "../content";
import { findResume } from "../lib/assets";
import { href } from "../lib/paths";

export const metadata: Metadata = {
  title: pages.engineer.title,
  description: pages.engineer.description,
  alternates: { canonical: pages.engineer.path },
  openGraph: {
    title: pages.engineer.title,
    description: pages.engineer.description,
    type: "website",
    url: pages.engineer.path,
    siteName: site.name,
    images: [{ url: "og-engineer.png", width: 1200, height: 630, alt: `${site.name}. A clear mind. A curious heart.` }],
  },
  twitter: {
    card: "summary_large_image",
    title: pages.engineer.title,
    description: pages.engineer.description,
    images: ["og-engineer.png"],
  },
};

/** Staggers a group of elements: each waits a beat longer than the one before. */
const beat = (index: number) => ({ "--beat": index }) as CSSProperties;

export default function Engineer() {
  // The résumé links appear once a résumé PDF exists in /public.
  const resume = findResume();
  const headerLink = resume ? { label: "Résumé", href: resume } : { label: "LinkedIn", href: site.linkedin };
  const toMusician = { label: landing.musician.title, href: href(pages.musician.path) };

  return (
    <div className="page page--engineer" id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader
        name={site.name}
        home={href(pages.home.path)}
        links={engineerNavigation}
        crossover={toMusician}
        external={headerLink}
      />

      <main id="main">
        <section className="hero" id="introduction" data-nav="">
          <div className="wrap">
            <div className="hero__masthead">
              <h1 className="hero__name" data-enter="" style={beat(0)}>
                {site.name}
              </h1>
              <p className="hero__tagline" data-enter="" style={beat(1)}>
                {hero.tagline.map((line) => (
                  <span key={line}>{line} </span>
                ))}
              </p>
            </div>

            <Strings intro bridge />

            <div className="hero__body">
              <div className="hero__intro" data-enter="" style={beat(3)}>
                <p className="lead">{hero.lead}</p>
                <p className="hero__supporting">{hero.supporting}</p>
                <div className="hero__actions">
                  <a className="button" href={hero.primaryAction.href}>
                    {hero.primaryAction.label}
                    <Arrow direction="down" />
                  </a>
                  <a className="link" href={hero.secondaryAction.href}>
                    {hero.secondaryAction.label}
                    <Arrow direction="down" />
                  </a>
                </div>
              </div>

              <dl className="facts" data-enter="" style={beat(4)}>
                {facts.map((fact) => (
                  <div className="fact" key={fact.term}>
                    <dt className="label">{fact.term}</dt>
                    <dd>
                      {fact.href ? <a href={fact.href}>{fact.value}</a> : fact.value}
                      {fact.detail && <span>{fact.detail}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="section work" id="work" aria-labelledby="work-title">
          <div className="wrap">
            <header className="section-head">
              <h2 className="label" id="work-title">
                Selected Work
              </h2>
              <p className="label" aria-hidden="true">
                01 — {String(projects.length).padStart(2, "0")}
              </p>
            </header>
            <div className="projects">
              {projects.map((project) => (
                <ProjectEntry
                  key={project.slug}
                  project={project}
                  preview={project.slug === "octavate" ? <OctavatePreview /> : undefined}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="how-i-work" aria-labelledby="process-title">
          <div className="wrap">
            <header className="section-head">
              <p className="label">{process.label}</p>
            </header>
            <h2 className="section-title" id="process-title" data-reveal="">
              {process.title}
            </h2>
            <ol className="steps">
              {process.steps.map((step, index) => (
                <li className="step" key={step.title} data-reveal="" style={beat(index)}>
                  <span className="step__number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="wrap">
            <Strings />
            <header className="section-head section-head--after-strings">
              <p className="label">{about.label}</p>
            </header>
            <div className="about__grid">
              <h2 className="section-title about__title" id="about-title" data-reveal="">
                {about.title.map((line) => (
                  <span key={line}>{line} </span>
                ))}
              </h2>
              <div className="about__prose" data-reveal="">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="about__closing">{about.closing}</p>
                {resume && (
                  <a className="link" href={resume} target="_blank" rel="noreferrer">
                    {about.resumeLabel}
                    <Arrow />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section beyond" id="beyond" data-nav="about" aria-labelledby="beyond-title">
          <div className="wrap">
            <header className="section-head">
              <p className="label">{beyond.label}</p>
            </header>
            <h2 className="section-title" id="beyond-title" data-reveal="">
              {beyond.title}
            </h2>
            <ul className="interests">
              {beyond.interests.map((interest, index) => (
                <li className="interest" key={interest.title} data-reveal="" style={beat(index)}>
                  <h3>{interest.title}</h3>
                  <p>{interest.body}</p>
                  {interest.link && (
                    <a className="link link--crossover" href={href(interest.link.path)}>
                      {interest.link.label}
                      <Arrow direction="right" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap">
            <header className="section-head">
              <p className="label">{contact.label}</p>
            </header>
            <div className="contact__grid">
              <h2 className="contact__title" id="contact-title" data-reveal="">
                {contact.title}
              </h2>
              <div className="contact__details" data-reveal="">
                <p>{contact.body}</p>
                <p>{contact.location}</p>
                <ul className="contact__links">
                  <li>
                    <a href={site.linkedin} target="_blank" rel="noreferrer">
                      {contact.linkedinLabel}
                      <Arrow />
                    </a>
                  </li>
                  {resume && (
                    <li>
                      <a href={resume} target="_blank" rel="noreferrer">
                        {contact.resumeLabel}
                        <Arrow />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter crossover={toMusician} />
      <RevealObserver />
    </div>
  );
}
