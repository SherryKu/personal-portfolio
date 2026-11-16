import type { CSSProperties } from "react";
import { Arrow } from "./components/Arrow";
import { FretDiagram } from "./components/FretDiagram";
import { LandingCursor } from "./components/LandingCursor";
import { StageStrings, StringsMark } from "./components/Strings";
import { footer, landing, pages, site } from "./content";
import { href } from "./lib/paths";

/** Staggers the opening: each part appears a beat after the one before. */
const beat = (index: number) => ({ "--beat": index }) as CSSProperties;

/**
 * The landing page: one sheet of paper with two doors.
 *
 * On the left, ink that flows (the musician). On the right, the same lines
 * pulled straight and measured (the engineer). They meet at one red point in
 * the middle. Each half is a link to its own page.
 */
export default function Landing() {
  return (
    <div className="landing" id="top">
      <header className="landing__header">
        <div className="wrap">
          <span className="brand">
            <StringsMark />
            <span>{site.name}</span>
          </span>
          <a className="landing__contact" href={site.linkedin} target="_blank" rel="noreferrer">
            {landing.contactLabel}
            <Arrow />
          </a>
        </div>
      </header>

      <main className="landing__stage">
        <h1 className="landing__statement" data-enter="" style={beat(0)}>
          {landing.statement.map((line) => (
            <span key={line.word}>
              {line.text}
              <em className={`ink-${line.ink}`}>{line.word}</em>{" "}
            </span>
          ))}
        </h1>

        <a className="door door--musician" href={href(pages.musician.path)}>
          <div className="door__art" aria-hidden="true" data-enter="" style={beat(2)}>
            <svg className="landing__sun" viewBox="0 0 140 140" focusable="false">
              <defs>
                <linearGradient id="sun-fade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#c8502f" stopOpacity="0.95" />
                  <stop offset="0.62" stopColor="#c8502f" stopOpacity="0.75" />
                  <stop offset="1" stopColor="#c8502f" stopOpacity="0.2" />
                </linearGradient>
                {/* A wet edge, pigment that pools unevenly, and a little paper tooth. */}
                <filter id="sun-brush" x="-30%" y="-30%" width="160%" height="160%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="4" result="warp" />
                  <feDisplacementMap in="SourceGraphic" in2="warp" scale="16" result="shape" />
                  <feGaussianBlur in="shape" stdDeviation="1.2" result="soft" />
                  <feTurbulence type="fractalNoise" baseFrequency="0.02 0.034" numOctaves="4" seed="21" result="pool" />
                  <feColorMatrix in="pool" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.5 0.06" result="density" />
                  <feComposite in="soft" in2="density" operator="in" result="washed" />
                  <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="9" result="grain" />
                  <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.75 1.28" result="tooth" />
                  <feComposite in="washed" in2="tooth" operator="in" />
                </filter>
              </defs>
              <circle cx="70" cy="70" r="50" fill="url(#sun-fade)" filter="url(#sun-brush)" />
            </svg>
            {/* The ink is art, not content: it carries nothing a reader needs, so it has no description. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="landing__wave" src={href("/art/ink-wave.webp")} alt="" width={2000} height={667} />
          </div>
          <div className="door__label" data-enter="" style={beat(4)}>
            <span className="door__title">{landing.musician.title}</span>
            <span className="door__rule" />
            <span className="door__topics">{landing.musician.topics.join("  /  ")}</span>
          </div>
        </a>

        <a className="door door--engineer" href={href(pages.engineer.path)}>
          <div className="door__art" aria-hidden="true" data-enter="" style={beat(3)}>
            <FretDiagram />
            <StageStrings className="landing__strings" />
          </div>
          <div className="door__label" data-enter="" style={beat(5)}>
            <span className="door__title">{landing.engineer.title}</span>
            <span className="door__rule" />
            <span className="door__topics">{landing.engineer.topics.join("  /  ")}</span>
          </div>
        </a>

        <svg className="landing__centre" viewBox="0 0 200 900" aria-hidden="true" focusable="false" data-enter="" style={beat(1)}>
          <path className="hair" d="M78 345H122" />
          <path className="hair faint" d="M100 372V452M100 608V790" />
          <circle className="hair dashed" cx="100" cy="530" r="70" />
          <rect className="node" x="95.5" y="525.5" width="9" height="9" />
        </svg>

        <p className="landing__colophon" data-enter="" style={beat(6)}>
          {footer.line}
        </p>
      </main>

      <LandingCursor />
    </div>
  );
}
