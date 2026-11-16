import { footer, site } from "../content";
import { Arrow } from "./Arrow";
import { Strings } from "./Strings";

/** The closing strings and the last line, shared by the engineer and musician pages. */
export function SiteFooter({ crossover }: { crossover: { label: string; href: string } }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <Strings />
        <div className="site-footer__row">
          <p className="site-footer__line">{footer.line}</p>
          <a className="site-footer__crossover" href={crossover.href}>
            {crossover.label}
            <Arrow direction="right" />
          </a>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <a href="#top">
            Back to top
            <Arrow direction="up" />
          </a>
        </div>
      </div>
    </footer>
  );
}
