import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Arrow } from "../components/Arrow";
import { RevealObserver } from "../components/RevealObserver";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { Strings } from "../components/Strings";
import { Text } from "../components/Text";
import { landing, musician, musicianNavigation, pages, site, type Performance } from "../content";
import { href } from "../lib/paths";

export const metadata: Metadata = {
  title: pages.musician.title,
  description: pages.musician.description,
  alternates: { canonical: pages.musician.path },
  openGraph: {
    title: pages.musician.title,
    description: pages.musician.description,
    type: "website",
    url: pages.musician.path,
    siteName: site.name,
    images: [{ url: "og-musician.png", width: 1200, height: 630, alt: `${site.name}, pipa.` }],
  },
  twitter: {
    card: "summary_large_image",
    title: pages.musician.title,
    description: pages.musician.description,
    images: ["og-musician.png"],
  },
};

/** Staggers a group of elements: each waits a beat longer than the one before. */
const beat = (index: number) => ({ "--beat": index }) as CSSProperties;

/** Gathers the performance record into one group per year, keeping its order. */
function byYear(entries: Performance[]) {
  const groups: { year: number; entries: Performance[] }[] = [];
  for (const entry of entries) {
    const last = groups[groups.length - 1];
    if (last && last.year === entry.year) last.entries.push(entry);
    else groups.push({ year: entry.year, entries: [entry] });
  }
  return groups;
}

export default function Musician() {
  const toEngineer = { label: landing.engineer.title, href: href(pages.engineer.path) };
  const { profile, performance, creation, repertoire, recognition, contact } = musician;
  const years = byYear(performance.entries);
  const firstYear = years[years.length - 1].year;
  const lastYear = years[0].year;

  return (
    <div className="page page--musician" id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader
        name={site.name}
        home={href(pages.home.path)}
        links={musicianNavigation}
        crossover={toEngineer}
        external={{ label: contact.linkedinLabel, href: site.linkedin }}
      />

      <main id="main">
        <section className="hero" id="introduction" data-nav="">
          <div className="wrap">
            <div className="hero__masthead">
              <h1 className="hero__name" data-enter="" style={beat(0)}>
                {site.name}
              </h1>
              <p className="hero__tagline" data-enter="" style={beat(1)}>
                {musician.tagline.map((line) => (
                  <span key={line}>{line} </span>
                ))}
              </p>
            </div>

            {/* Where the engineer's page has four straight strings, this one has the ink in motion. */}
            <div className="hero__wave" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={href("/art/ink-wave.webp")} alt="" width={2000} height={667} />
            </div>

            <div className="hero__body">
              <div className="hero__intro" data-enter="" style={beat(3)}>
                <p className="hero__kicker label">
                  {musician.role} · {musician.instrument}{" "}
                  <span lang="zh-Hans" className="han">
                    {musician.instrumentNative}
                  </span>
                </p>
                <p className="lead">{musician.lead}</p>
                <p className="hero__supporting">{musician.supporting}</p>
                <div className="hero__actions">
                  <a className="button" href={musician.primaryAction.href}>
                    {musician.primaryAction.label}
                    <Arrow direction="down" />
                  </a>
                  <a className="link" href={musician.secondaryAction.href}>
                    {musician.secondaryAction.label}
                    <Arrow direction="down" />
                  </a>
                </div>
              </div>

              <dl className="facts" data-enter="" style={beat(4)}>
                {musician.facts.map((fact) => (
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

        <section className="section about" id="profile" aria-labelledby="profile-title">
          <div className="wrap">
            <Strings />
            <header className="section-head section-head--after-strings">
              <p className="label">{profile.label}</p>
            </header>
            <div className="about__grid">
              <h2 className="section-title about__title" id="profile-title" data-reveal="">
                {profile.title.map((line) => (
                  <span key={line}>{line} </span>
                ))}
              </h2>
              <div className="about__prose" data-reveal="">
                {profile.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="performance" aria-labelledby="performance-title">
          <div className="wrap">
            <header className="section-head">
              <h2 className="label" id="performance-title">
                {performance.label}
              </h2>
              <p className="label">
                {lastYear} — {firstYear}
              </p>
            </header>
            <ol className="years">
              {years.map((group) => (
                <li className="year" key={group.year} data-reveal="">
                  <h3 className="year__number">{group.year}</h3>
                  <ol className="year__entries">
                    {group.entries.map((entry) => (
                      <li className="entry" key={entry.text}>
                        <span className="entry__when label">{entry.when ?? ""}</span>
                        <p>
                          <Text>{entry.text}</Text>
                        </p>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="creation" data-nav="performance" aria-labelledby="creation-title">
          <div className="wrap">
            <header className="section-head">
              <h2 className="label" id="creation-title">
                {creation.label}
              </h2>
            </header>
            <ul className="creations">
              {creation.works.map((work, index) => (
                <li className="creation" key={work.title} data-reveal="" style={beat(index)}>
                  <p className="label">
                    {work.year} · {work.role}
                  </p>
                  <h3>
                    <Text>{work.title}</Text>
                  </h3>
                  <p>
                    <Text>{work.body}</Text>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="repertoire" aria-labelledby="repertoire-title">
          <div className="wrap">
            <header className="section-head">
              <h2 className="label" id="repertoire-title">
                {repertoire.label}
              </h2>
              <p className="label">{repertoire.pieces.length} pieces</p>
            </header>
            <ul className="pieces" data-reveal="">
              {repertoire.pieces.map((piece) => (
                <li className="piece" key={piece.title}>
                  <span className="piece__title">
                    <Text>{piece.title}</Text>
                  </span>
                  {piece.note && <span className="piece__note label">{piece.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="recognition" data-nav="repertoire" aria-labelledby="recognition-title">
          <div className="wrap">
            <header className="section-head">
              <h2 className="label" id="recognition-title">
                {recognition.label}
              </h2>
            </header>
            <div className="records">
              <div className="record" data-reveal="">
                <h3>{recognition.awardsLabel}</h3>
                <ul>
                  {recognition.awards.map((award) => (
                    <li key={award.text}>
                      <span className="label">{award.years}</span>
                      <p>{award.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="record" data-reveal="" style={beat(1)}>
                <h3>{recognition.ensemblesLabel}</h3>
                <ul>
                  {recognition.ensembles.map((ensemble) => (
                    <li key={ensemble.text}>
                      <span className="label">{ensemble.years}</span>
                      <p>
                        {ensemble.text}
                        {ensemble.url && (
                          <a className="record__link" href={ensemble.url} target="_blank" rel="noreferrer">
                            Website
                            <Arrow />
                          </a>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter crossover={toEngineer} />
      <RevealObserver />
    </div>
  );
}
