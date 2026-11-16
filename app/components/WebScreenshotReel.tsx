"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Shot } from "../lib/assets";

const displayTime = 5000;

export function WebScreenshotReel({ shots, title }: { shots: Shot[]; title: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const viewportId = useId();
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const [slide, setSlide] = useState({ current: 0, previous: -1 });
  const hasControls = shots.length > 1;

  useEffect(() => {
    if (!hasControls) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => setPlaying(!motionPreference.matches);
    updatePlayback();
    motionPreference.addEventListener("change", updatePlayback);
    return () => motionPreference.removeEventListener("change", updatePlayback);
  }, [hasControls]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !hasControls) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [hasControls]);

  useEffect(() => {
    if (!hasControls || !playing || !inView) return;

    let timer: number;
    const schedule = () => {
      window.clearTimeout(timer);
      if (document.visibilityState === "visible") {
        timer = window.setTimeout(() => {
          setSlide(({ current }) => ({ current: (current + 1) % shots.length, previous: current }));
        }, displayTime);
      }
    };
    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [hasControls, inView, playing, shots.length, slide.current]);

  function browse(direction: -1 | 1) {
    setSlide(({ current }) => ({
      current: (current + direction + shots.length) % shots.length,
      previous: current,
    }));
  }

  const firstShot = shots[0];
  if (!firstShot) return null;

  const naturalAspect =
    firstShot.width && firstShot.height ? firstShot.width / firstShot.height : 16 / 10;
  const aspect = Math.max(naturalAspect, 4 / 3);

  return (
    <div className="web-reel">
      <div className="plate plate--web" style={{ aspectRatio: aspect.toFixed(4) }}>
        <div
          className="web-reel__viewport"
          id={viewportId}
          ref={viewportRef}
          role={hasControls ? "region" : undefined}
          aria-label={hasControls ? `${title} desktop screenshots` : undefined}
        >
          {shots.map((shot, index) => {
            const current = index === slide.current;
            let className = "web-reel__slide";
            if (current) className += slide.previous < 0 ? " is-initial" : " is-entering";
            else if (index === slide.previous) className += " is-leaving";

            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={shot.src}
                className={className}
                src={shot.src}
                alt={`${title}, desktop screenshot ${index + 1} of ${shots.length}`}
                aria-hidden={!current || undefined}
                width={shot.width}
                height={shot.height}
                loading="lazy"
                decoding="async"
              />
            );
          })}
          {hasControls && (
            <>
              <button
                type="button"
                className="web-reel__arrow web-reel__arrow--previous"
                aria-label="Previous screenshot"
                onClick={() => browse(-1)}
              />
              <button
                type="button"
                className="web-reel__arrow web-reel__arrow--next"
                aria-label="Next screenshot"
                onClick={() => browse(1)}
              />
            </>
          )}
        </div>
      </div>
      {hasControls && (
        <div className="web-reel__controls">
          <span className="label" aria-live={playing ? "off" : "polite"}>
            View {slide.current + 1} of {shots.length}
          </span>
          <button
            type="button"
            className="link"
            aria-controls={viewportId}
            onClick={() => setPlaying((current) => !current)}
          >
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </div>
  );
}
