"use client";

import { useEffect, useRef, type RefObject } from "react";
import { bundlePaths } from "../lib/bundle";

/**
 * Four strings, after the pipa: the one recurring mark on the site.
 * Drawn thinnest to thickest, with the first string in the page's accent ink.
 *
 * They sit still by default. A pointer crossing a string plucks it, and each
 * set gives one soft note when it arrives. Anyone who has asked their device
 * for reduced motion gets four still lines.
 */

// Thicker strings move slower and ring longer.
const VOICES = [
  { frequency: 9.4, decay: 0.5 },
  { frequency: 8.4, decay: 0.6 },
  { frequency: 7.4, decay: 0.72 },
  { frequency: 6.4, decay: 0.86 },
];

type Geometry = {
  /** Size of the drawing, in its own units. */
  width: number;
  height: number;
  /** Where the free, pluckable part of each string begins. */
  freeFrom: number;
  restingY: (index: number) => number;
};

/** A plain rule across the page: used in headers, between sections and in the footer. */
const RULE: Geometry = {
  width: 1000,
  height: 34,
  freeFrom: 0,
  restingY: (index) => 8.5 + index * 6,
};

/**
 * On the landing page the four strings gather to a single point at the
 * central node. They leave it together, open out as they rise, and level
 * out just before the nut, then run straight off the right edge.
 */
const STAGE_GAP = 6.5;
const STAGE: Geometry = {
  width: 760,
  height: 112,
  freeFrom: 236,
  restingY: (index) => 12 + index * STAGE_GAP,
};
const STAGE_NODE_Y = 102;
const STAGE_LEVEL = STAGE.restingY(0) + STAGE_GAP * 1.5;

/**
 * Where a set of strings sits inside its own drawing, published on the element
 * so the page-to-page transition can pick the bundle up exactly where it is.
 * See "The string bridge" in app/layout.tsx.
 */
const STAGE_PLACE = JSON.stringify({
  w: STAGE.width,
  x0: 0,
  y0: STAGE_NODE_Y,
  x1: STAGE.freeFrom,
  yc: STAGE_LEVEL,
  gap: STAGE_GAP,
  spread: 0,
});
const RULE_PLACE = JSON.stringify({
  w: RULE.width,
  x0: 0,
  y0: RULE.restingY(0) + 9,
  x1: RULE.width * 0.3,
  yc: RULE.restingY(0) + 9,
  gap: 6,
  spread: 1,
  level: true,
});

/** The free part of one string, bowed by `offset` at `pluckX`. */
function shape(geometry: Geometry, index: number, pluckX?: number, offset = 0) {
  const y = geometry.restingY(index);
  const x = pluckX ?? (geometry.freeFrom + geometry.width) / 2;
  return `M${geometry.freeFrom} ${y}Q${x.toFixed(1)} ${(y + offset * 2).toFixed(2)} ${geometry.width} ${y}`;
}

type Vibration = { amplitude: number; pluckX: number; startsAt: number };

function useStrings(rootRef: RefObject<HTMLDivElement | null>, geometry: Geometry, arrival: "intro" | "in-view") {
  useEffect(() => {
    const root = rootRef.current;
    const svg = root?.querySelector("svg");
    if (!root || !svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path.free"));
    const vibrations: (Vibration | null)[] = paths.map(() => null);
    const free = geometry.width - geometry.freeFrom;
    let frame = 0;
    let lastY: number | null = null;

    const tick = (now: number) => {
      let stillMoving = false;
      vibrations.forEach((vibration, index) => {
        if (!vibration) return;
        const elapsed = (now - vibration.startsAt) / 1000;
        if (elapsed < 0) {
          stillMoving = true;
          return;
        }
        const { frequency, decay } = VOICES[index];
        const envelope = vibration.amplitude * Math.exp(-elapsed / decay);
        if (Math.abs(envelope) < 0.06) {
          // At rest a string snaps back to the pixel grid, so it stays a crisp line.
          vibrations[index] = null;
          paths[index].setAttribute("d", shape(geometry, index));
          paths[index].style.shapeRendering = "";
          return;
        }
        stillMoving = true;
        const offset = envelope * Math.cos(2 * Math.PI * frequency * elapsed);
        paths[index].style.shapeRendering = "geometricPrecision";
        paths[index].setAttribute("d", shape(geometry, index, vibration.pluckX, offset));
      });
      frame = stillMoving ? requestAnimationFrame(tick) : 0;
    };

    const pluck = (index: number, amplitude: number, pluckX?: number, delay = 0) => {
      vibrations[index] = {
        amplitude,
        pluckX: pluckX ?? geometry.freeFrom + free * 0.3,
        startsAt: performance.now() + delay,
      };
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const locate = (event: PointerEvent) => {
      const box = svg.getBoundingClientRect();
      const x = ((event.clientX - box.left) / box.width) * geometry.width;
      return {
        x: Math.min(geometry.width - free * 0.14, Math.max(geometry.freeFrom + free * 0.14, x)),
        rawX: x,
        y: ((event.clientY - box.top) / box.height) * geometry.height,
      };
    };

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType !== "touch") lastY = locate(event).y;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const { x, rawX, y } = locate(event);
      if (lastY !== null && y !== lastY && rawX >= geometry.freeFrom) {
        const travel = y - lastY;
        for (let index = 0; index < paths.length; index += 1) {
          const stringY = geometry.restingY(index);
          if ((lastY - stringY) * (y - stringY) < 0) {
            const strength = Math.min(5.5, 1.8 + Math.abs(travel) * 0.35);
            pluck(index, strength * Math.sign(travel), x);
          }
        }
      }
      lastY = y;
    };

    const onLeave = (event: PointerEvent) => {
      onMove(event);
      lastY = null;
    };

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    // One soft note on arrival: after the opening strings are drawn, or the
    // first time a later set scrolls into view.
    let introTimer = 0;
    let observer: IntersectionObserver | null = null;
    if (arrival === "intro") {
      introTimer = window.setTimeout(() => pluck(0, 3), 1500);
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          pluck(0, 3, undefined, 250);
          observer?.disconnect();
        },
        { threshold: 1, rootMargin: "0px 0px -12% 0px" },
      );
      observer.observe(svg);
    }

    return () => {
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      window.clearTimeout(introTimer);
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [rootRef, geometry, arrival]);
}

export function Strings({
  className = "",
  intro = false,
  bridge = false,
}: {
  className?: string;
  intro?: boolean;
  /** These are the strings the landing page's bundle straightens into. */
  bridge?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  useStrings(rootRef, RULE, intro ? "intro" : "in-view");

  return (
    <div
      ref={rootRef}
      className={`strings${intro ? " strings--intro" : ""}${className ? ` ${className}` : ""}`}
      data-strings={bridge ? RULE_PLACE : undefined}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${RULE.width} ${RULE.height}`} height={RULE.height} preserveAspectRatio="none" focusable="false">
        {VOICES.map((_, index) => (
          <path key={index} className={`free s${index + 1}`} d={shape(RULE, index)} />
        ))}
      </svg>
    </div>
  );
}

/** The landing page's strings: gathered to a point at the node, opening out as they rise and level. */
export function StageStrings({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useStrings(rootRef, STAGE, "intro");
  const rise = bundlePaths(0, STAGE_NODE_Y, STAGE.freeFrom, STAGE_LEVEL, STAGE_GAP, 0, 40);

  return (
    <div
      ref={rootRef}
      className={`strings strings--stage${className ? ` ${className}` : ""}`}
      data-strings={STAGE_PLACE}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${STAGE.width} ${STAGE.height}`} preserveAspectRatio="xMinYMin meet" focusable="false">
        {rise.map((d, index) => (
          <path key={`lead-${index}`} className={`lead s${index + 1}`} d={d} />
        ))}
        {VOICES.map((_, index) => (
          <path key={`free-${index}`} className={`free s${index + 1}`} d={shape(STAGE, index)} />
        ))}
      </svg>
    </div>
  );
}

/** The same four strings, standing upright, as the small mark beside the name. */
export function StringsMark() {
  return (
    <svg className="strings-mark" viewBox="0 0 16 18" width="16" height="18" aria-hidden="true" focusable="false">
      <path d="M1.5 1v16" strokeWidth="1" />
      <path d="M5.5 1v16" strokeWidth="1" />
      <path d="M9.75 1v16" strokeWidth="1.5" />
      <path d="M14 1v16" strokeWidth="2" />
    </svg>
  );
}
