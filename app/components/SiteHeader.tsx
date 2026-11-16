"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Arrow";
import { StringsMark } from "./Strings";

type NavLink = { id: string; label: string; wideOnly?: boolean };
type OutLink = { label: string; href: string };

export function SiteHeader({
  name,
  home,
  links,
  crossover,
  external,
}: {
  name: string;
  /** Where the name leads: the landing page with its two doors. */
  home: string;
  links: NavLink[];
  /** The way across to the other side of the site (musician or engineer). */
  crossover: OutLink;
  external: OutLink;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const header = headerRef.current;

    // A hairline appears under the header once the page has moved.
    const markScrolled = () => {
      if (header) header.dataset.scrolled = String(window.scrollY > 12);
    };
    markScrolled();
    window.addEventListener("scroll", markScrolled, { passive: true });

    // The section crossing the middle of the screen is the current one.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = entry.target as HTMLElement;
          setCurrent(section.dataset.nav ?? section.id);
        }
      },
      { rootMargin: "-42% 0px -54% 0px" },
    );
    document.querySelectorAll("main > section[id]").forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", markScrolled);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="wrap site-header__inner">
        <a className="brand" href={home} aria-label={`${name}, home`}>
          <StringsMark />
          <span>{name}</span>
        </a>
        <nav className="site-nav" aria-label="Sections">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={link.wideOnly ? "wide-only" : undefined}
              aria-current={current === link.id ? "location" : undefined}
            >
              {link.label}
            </a>
          ))}
          <a className="site-nav__crossover wide-only" href={crossover.href}>
            {crossover.label}
          </a>
          <a className="site-nav__external wide-only" href={external.href} target="_blank" rel="noreferrer">
            {external.label}
            <Arrow />
          </a>
        </nav>
      </div>
    </header>
  );
}
