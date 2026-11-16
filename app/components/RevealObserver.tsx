"use client";

import { useEffect } from "react";

/**
 * Lets anything marked with `data-reveal` ease into place as it scrolls into
 * view. Content is visible by default, so the page reads normally without
 * JavaScript; only things still below the fold are held back, and only for
 * people who haven't asked for reduced motion.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "in";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      element.dataset.reveal = "pending";
      observer.observe(element);
    });

    // Reaching the end of the page shows whatever is left, so nothing can stay hidden.
    const footer = document.querySelector("footer");
    const atEnd = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      document.querySelectorAll<HTMLElement>('[data-reveal="pending"]').forEach((element) => {
        element.dataset.reveal = "in";
      });
    });
    if (footer) atEnd.observe(footer);

    return () => {
      observer.disconnect();
      atEnd.disconnect();
    };
  }, []);

  return null;
}
