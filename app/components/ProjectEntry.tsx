import type { Project } from "../content";
import { findProjectShots, type Shot } from "../lib/assets";
import { Arrow } from "./Arrow";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * A screenshot in its frame. The frame follows the image's own shape, within
 * limits: very tall captures are trimmed from the bottom rather than squeezed.
 */
function Plate({ shot, kind, title }: { shot: Shot; kind: "web" | "mobile"; title: string }) {
  const natural = shot.width && shot.height ? shot.width / shot.height : null;
  const aspect =
    kind === "web" ? Math.max(natural ?? 16 / 10, 4 / 3) : clamp(natural ?? 9 / 19.5, 9 / 21, 3 / 4);

  return (
    <div className={`plate plate--${kind}`} style={{ aspectRatio: aspect.toFixed(4) }}>
      {/* Plain <img>: the site is exported as static files, so there is no image server to optimise through. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shot.src}
        alt={`${title}, ${kind === "web" ? "desktop" : "mobile"} screenshot`}
        width={shot.width}
        height={shot.height}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/** Stands in for a missing screenshot while developing. Never part of the published site. */
function Slot({ slug, kind }: { slug: string; kind: "web" | "mobile" }) {
  const isWeb = kind === "web";
  return (
    <div className={`plate plate--${kind} plate--empty`} style={{ aspectRatio: isWeb ? "16 / 10" : "9 / 19.5" }}>
      <p>
        <strong>{isWeb ? "Desktop screenshot" : "Phone"}</strong>
        <code>{isWeb ? `public/work/${slug}/web.png` : "mobile.png"}</code>
        {isWeb && <span>Placeholders show only while developing. Until a file is added, the published site presents this project as text.</span>}
      </p>
    </div>
  );
}

export function ProjectEntry({ project }: { project: Project }) {
  const { web, mobile } = findProjectShots(project.slug);
  const hasShots = Boolean(web || mobile);
  const showSlots = !hasShots && process.env.NODE_ENV === "development";
  const hasFigure = hasShots || showSlots;

  const layout = !hasFigure ? "text" : project.featured ? "featured" : "split";
  const arrangement = showSlots || (web && mobile) ? "pair" : web ? "web" : "mobile";
  const titleId = `${project.slug}-title`;

  return (
    <article className={`project project--${layout}`} id={project.slug} aria-labelledby={titleId} data-reveal="">
      <div className="project__intro">
        <header>
          <p className="project__index label">
            <span>{project.index}</span>
            {project.status && <span className="status">{project.status}</span>}
          </p>
          <h3 className="project__title" id={titleId}>
            {project.title}
          </h3>
          <p className="project__thesis">{project.thesis}</p>
        </header>
        {project.metric && (
          <p className="project__metric">
            <strong>{project.metric.value}</strong>
            <span className="label">{project.metric.label}</span>
          </p>
        )}
      </div>

      {hasFigure && (
        <figure className={`figure figure--${arrangement}`}>
          {web ? <Plate shot={web} kind="web" title={project.title} /> : showSlots && <Slot slug={project.slug} kind="web" />}
          {mobile ? (
            <Plate shot={mobile} kind="mobile" title={project.title} />
          ) : (
            showSlots && <Slot slug={project.slug} kind="mobile" />
          )}
        </figure>
      )}

      <div className="project__body">
        <div className="project__copy">
          <h4 className="label">Overview</h4>
          <p>{project.overview}</p>
        </div>
        <div className="project__copy">
          <h4 className="label">My role</h4>
          <p>{project.role}</p>
        </div>
        <div className="project__scope">
          <h4 className="label">Scope</h4>
          <ul>
            {project.disciplines.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </ul>
        </div>
        {project.link.href && (
          <a className="link project__link" href={project.link.href}>
            {project.link.label}
            <Arrow direction="right" />
          </a>
        )}
      </div>
    </article>
  );
}
