"use client";

import { useEffect, useRef } from "react";

/**
 * Two cursors for the two sides of the landing page.
 * Over the musician's half: a drop of ink that trails and settles (flow).
 * Over the engineer's half: a crosshair with its position read out (precision).
 * Only for a mouse or trackpad; touch screens keep their normal behaviour.
 */
export function LandingCursor() {
  const inkRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ink = inkRef.current;
    const cross = crossRef.current;
    const stage = ink?.closest<HTMLElement>(".landing");
    if (!ink || !cross || !stage) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let targetX = 0;
    let targetY = 0;
    let inkX = 0;
    let inkY = 0;
    let frame = 0;
    let showing = false;

    const settle = () => {
      const pull = calm ? 1 : 0.2;
      inkX += (targetX - inkX) * pull;
      inkY += (targetY - inkY) * pull;
      const lag = Math.hypot(targetX - inkX, targetY - inkY);
      const swell = calm ? 1 : 1 + Math.min(0.6, lag / 90);
      ink.style.transform = `translate3d(${inkX.toFixed(1)}px, ${inkY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${swell.toFixed(3)})`;
      frame = lag > 0.1 ? requestAnimationFrame(settle) : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const box = stage.getBoundingClientRect();
      targetX = event.clientX - box.left;
      targetY = event.clientY - box.top;
      if (!showing) {
        showing = true;
        inkX = targetX;
        inkY = targetY;
        stage.classList.add("has-cursor");
      }
      stage.dataset.side = targetX < box.width / 2 ? "musician" : "engineer";
      cross.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      if (readoutRef.current) {
        readoutRef.current.textContent = `${(targetX / box.width).toFixed(3)}, ${(targetY / box.height).toFixed(3)}`;
      }
      if (!frame) frame = requestAnimationFrame(settle);
    };

    const onLeave = () => {
      showing = false;
      stage.classList.remove("has-cursor");
      delete stage.dataset.side;
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stage.classList.remove("has-cursor");
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="cursor cursor--ink" ref={inkRef} aria-hidden="true" />
      <div className="cursor cursor--cross" ref={crossRef} aria-hidden="true">
        <span ref={readoutRef} />
      </div>
    </>
  );
}
