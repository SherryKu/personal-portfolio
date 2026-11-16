import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "./components/Arrow";
import { Strings } from "./components/Strings";
import { site } from "./content";

export const metadata: Metadata = {
  title: `Page not found — ${site.name}`,
};

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="wrap">
        <Strings />
        <p className="label">Page not found</p>
        <h1 className="section-title">This page isn’t here.</h1>
        <p>The link may be mistyped, or the page may have moved.</p>
        <Link className="button" href="/">
          Back to the portfolio
          <Arrow direction="right" />
        </Link>
      </div>
    </main>
  );
}
