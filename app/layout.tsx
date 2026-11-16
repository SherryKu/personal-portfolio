import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { pages, site } from "./content";
import { bundlePaths } from "./lib/bundle";
import { basePath } from "./lib/paths";
import "./globals.css";

// Newsreader carries the voice (names, titles, prose); Instrument Sans carries
// the facts (labels, details, navigation). Both are downloaded at build time
// and served from this site, so visitors make no requests to Google.
const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Defaults, used by the landing page. The engineer and musician pages set their own.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: pages.home.title,
  description: pages.home.description,
  keywords: [
    "Kexun Liu",
    "Pipa",
    "Chinese music",
    "Product Design",
    "Frontend Engineering",
    "Design Engineer",
    "AI Applications",
    "AI Agents",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: pages.home.path },
  openGraph: {
    title: pages.home.title,
    description: pages.home.description,
    type: "website",
    url: pages.home.path,
    siteName: site.name,
    images: [{ url: "og.png", width: 1200, height: 630, alt: `${site.name}. ${pages.home.description}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: pages.home.title,
    description: pages.home.description,
    images: ["og.png"],
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ec",
};

// Describes the person behind the site to search engines.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.jobTitle,
  description: pages.home.description,
  worksFor: { "@type": "Organization", name: site.employer },
  alumniOf: { "@type": "CollegeOrUniversity", name: site.school },
  knowsAbout: ["Pipa", "Traditional Chinese music", "Product design", "Frontend engineering", "AI applications"],
  sameAs: [site.linkedin],
};

/*
  Page transitions (see "Moving between the pages" in globals.css).

  This runs before a page is first drawn, which is why it is written inline as
  plain script rather than as part of the app. It does three things.

  1. Direction. The three pages sit side by side: musician, landing, engineer.
     When one hands over to another, it works out which way to pan and marks
     the new page with data-pan="left" or "right" for the length of the move.

  2. Arrival. It marks the page as arrived-by-transition, so the page's own
     opening animation is skipped and the two do not play over each other.

  3. The string bridge. Between the landing page and the engineer's page the
     four strings are one bundle that changes shape: on the landing page they
     gather to a point at the node and rise in a curve; on the engineer's page
     they lie level under the name. A browser on its own would blend a still
     picture of each, which shows eight lines and pulls them apart. Instead,
     the leaving page notes exactly where its strings are, and the arriving
     page draws four strings, frame by frame, from that shape to its own:
     always four, the gathered end opening out and the bend easing away
     together until they are level and parallel. When the move ends the
     drawing is removed and the page's real strings are underneath, in the
     same place.
*/
const arrival = `(function () {
  var base = ${JSON.stringify(basePath)};
  var bundle = ${bundlePaths.toString()};

  var place = function (path) {
    var p = path.indexOf(base) === 0 ? path.slice(base.length) : path;
    if (p === "/" || p === "") return 0;
    if (p.indexOf("/musician") === 0) return -1;
    if (p.indexOf("/engineer") === 0) return 1;
    return null;
  };

  // Where this page's bridging strings are on screen, in the terms "bundle" understands.
  var measure = function () {
    var el = document.querySelector("[data-strings]");
    var svg = el && el.querySelector("svg");
    if (!svg) return null;
    var v, r = svg.getBoundingClientRect();
    try { v = JSON.parse(el.getAttribute("data-strings")); } catch (e) { return null; }
    if (!r.width) return null;
    var sx = r.width / v.w, sy = v.level ? 1 : sx;
    var opacity = parseFloat(getComputedStyle(el).opacity);
    return {
      x0: r.left + v.x0 * sx, y0: r.top + v.y0 * sy, x1: r.left + v.x1 * sx, yc: r.top + v.yc * sy,
      x2: r.right, gap: v.gap * sy, spread: v.spread, opacity: isNaN(opacity) ? 1 : opacity,
      top: r.top, bottom: r.bottom
    };
  };

  addEventListener("pageswap", function () {
    try {
      sessionStorage.setItem("pan-from", location.pathname);
      var here = measure();
      if (here && here.bottom > 0 && here.top < innerHeight) sessionStorage.setItem("pan-strings", JSON.stringify(here));
      else sessionStorage.removeItem("pan-strings");
    } catch (e) {}
  });

  addEventListener("pagereveal", function (event) {
    var move = event.viewTransition;
    if (!move) return;
    var root = document.documentElement;
    root.dataset.arrival = "transition";

    var from = null;
    try {
      var entry = window.navigation && navigation.activation && navigation.activation.from;
      from = entry && entry.url ? new URL(entry.url).pathname : sessionStorage.getItem("pan-from");
    } catch (e) {}
    var a = from === null ? null : place(from);
    var b = place(location.pathname);
    if (a !== null && b !== null && a !== b) root.dataset.pan = b > a ? "right" : "left";

    var bridge = null, live = true;
    var done = function () {
      live = false;
      delete root.dataset.pan;
      delete root.dataset.bridge;
      if (bridge) bridge.remove();
    };
    move.finished.then(done, done);

    // The string bridge: only between the landing page (0) and the engineer's page (1).
    if (!((a === 0 && b === 1) || (a === 1 && b === 0))) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var start = null;
    try { start = JSON.parse(sessionStorage.getItem("pan-strings")); } catch (e) {}
    if (!start) return;

    var style = getComputedStyle(root);
    var ink = style.getPropertyValue("--ink").trim() || "#1a1917";
    var accent = style.getPropertyValue("--accent").trim() || ink;
    var widths = [1, 1, matchMedia("(max-resolution: 1.49dppx)").matches ? 1 : 1.5, 2];

    bridge = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    bridge.id = "string-bridge";
    bridge.setAttribute("aria-hidden", "true");
    bridge.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:40;overflow:visible;pointer-events:none;view-transition-name:string-bridge";
    bridge.innerHTML = '<g fill="none" stroke-linecap="butt"><path/><path/><path/><path/></g>';
    var paths = bridge.querySelectorAll("path"), i;
    for (i = 0; i < 4; i++) {
      paths[i].setAttribute("stroke", i ? ink : accent);
      paths[i].setAttribute("stroke-width", widths[i]);
    }
    root.appendChild(bridge);
    root.dataset.bridge = "strings";

    var mix = function (p, q, t) { return p + (q - p) * t; };
    var draw = function (t) {
      // Until this page's own strings exist, hold the shape the last page left.
      var end = measure() || start;
      var x0 = mix(start.x0, end.x0, t), y0 = mix(start.y0, end.y0, t), x1 = mix(start.x1, end.x1, t);
      var yc = mix(start.yc, end.yc, t), x2 = mix(start.x2, end.x2, t), gap = mix(start.gap, end.gap, t);
      var bend = bundle(x0, y0, x1, yc, gap, mix(start.spread, end.spread, t), 36);
      for (var s = 0; s < 4; s++) {
        paths[s].setAttribute("d", bend[s] + "L" + x2.toFixed(2) + " " + (yc + (s - 1.5) * gap).toFixed(2));
      }
      bridge.style.opacity = mix(start.opacity, end.opacity, t);
    };

    // Keep exact time with the pan by reading its own clock and using its own easing curve.
    var curve = /cubic-bezier\\(([^)]+)\\)/.exec(style.getPropertyValue("--pan-ease"));
    var c = curve ? curve[1].split(",").map(parseFloat) : [0.33, 0, 0.45, 1];
    var ease = function (x) {
      var lo = 0, hi = 1, t = x, n, bx;
      for (n = 0; n < 24; n++) {
        t = (lo + hi) / 2;
        bx = 3 * (1 - t) * (1 - t) * t * c[0] + 3 * (1 - t) * t * t * c[2] + t * t * t;
        if (bx < x) lo = t; else hi = t;
      }
      return 3 * (1 - t) * (1 - t) * t * c[1] + 3 * (1 - t) * t * t * c[3] + t * t * t;
    };

    draw(0);
    move.ready.then(function () {
      var all = document.getAnimations(), pan = null, n;
      for (n = 0; n < all.length; n++) {
        if (all[n].effect && all[n].effect.pseudoElement === "::view-transition-new(root)") pan = all[n];
      }
      var frame = function () {
        if (!live) return;
        var t = 1;
        if (pan) {
          var length = pan.effect.getComputedTiming().duration;
          t = length ? Math.min(1, Math.max(0, (pan.currentTime || 0) / length)) : 1;
        }
        draw(ease(t));
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }, function () {});
  });
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: arrival }} />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
