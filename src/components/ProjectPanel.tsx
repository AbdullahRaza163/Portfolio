import { useEffect, useRef, useState } from "react";
import { ExternalLink, Play, FileText, TriangleAlert } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  onPreview: (project: Project) => void;
  className?: string;
  /** Desktop gallery panels are absolutely stacked. */
  stacked?: boolean;
  /** True when this panel is the one currently shown in the pinned stage. */
  active?: boolean;
  /** Only mount the live iframe in the pinned desktop stage. */
  mountLive?: boolean;
};

export function ProjectPanel({
  project,
  onPreview,
  className,
  stacked,
  active = true,
  mountLive = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const wantsLive = mountLive && active && project.embeddable;

  useEffect(() => {
    if (!wantsLive) return;
    setLoaded(false);
    setBlocked(false);
    const t = window.setTimeout(() => {
      setLoaded((l) => {
        if (!l) setBlocked(true);
        return l;
      });
    }, 6000);
    return () => window.clearTimeout(t);
  }, [wantsLive, project.slug]);

  const handleLoad = () => {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc && doc.body && doc.body.childElementCount === 0) {
        setBlocked(true);
        return;
      }
    } catch {
      /* cross-origin = actually loaded */
    }
    setLoaded(true);
  };

  return (
    <article
      className={cn(
        "group panel-metal hairline relative flex flex-col justify-between overflow-hidden rounded-xl p-6 sm:p-10",
        "transition-[box-shadow,transform] duration-500 hover:-translate-y-1",
        stacked && "absolute inset-0 will-change-transform [transform-style:preserve-3d]",
        className,
      )}
      style={{ ["--panel-accent" as string]: project.accent }}
      tabIndex={0}
      aria-label={`${project.title}, ${project.category}`}
    >
      {/* ---------- BACKGROUND LAYER ---------- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {project.preview && (
          <img
            src={project.preview}
            alt=""
            className={cn(
              "absolute inset-0 size-full object-cover object-top transition-opacity duration-700",
              loaded && !blocked ? "opacity-0" : "opacity-100",
            )}
          />
        )}

        {wantsLive && !blocked && (
          <iframe
            ref={iframeRef}
            key={project.slug}
            src={project.url}
            title={`${project.title} live background`}
            loading="lazy"
            onLoad={handleLoad}
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            tabIndex={-1}
            className={cn(
              "absolute inset-0 size-full border-0 bg-white transition-opacity duration-700",
              loaded ? "opacity-100" : "opacity-0",
            )}
          />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.15 0.02 260 / 88%) 0%, oklch(0.15 0.02 260 / 72%) 45%, oklch(0.15 0.02 260 / 92%) 100%)",
          }}
        />

        {wantsLive && blocked && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 text-[11px] text-muted-foreground backdrop-blur">
            <TriangleAlert className="size-3 text-accent" />
            Live embed blocked — showing preview
          </div>
        )}
      </div>

      {/* ---------- HOVER GLOW ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 75% 20%, ${project.accent}22, transparent 65%)`,
        }}
      />

      {/* ---------- FOREGROUND ---------- */}
      <div className="relative z-10 flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow">{project.category}</p>
          <h3 className="mt-3 text-4xl leading-[0.95] font-semibold sm:text-6xl lg:text-7xl">
            {project.title}
          </h3>
        </div>
        <span
          className="font-display text-5xl leading-none font-bold sm:text-7xl"
          style={{ color: project.accent, opacity: 0.55 }}
          aria-hidden
        >
          {project.number}
        </span>
      </div>

      <div className="relative z-10 mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            {project.overview}
          </p>
          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-500",
              "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100",
              "group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100",
              "max-lg:grid-rows-[1fr] max-lg:opacity-100",
            )}
          >
            <div className="overflow-hidden">
              <p className="pt-4 text-sm text-muted-foreground/90">{project.detail}</p>
            </div>
          </div>
        </div>

        <dl className="space-y-4 text-sm">
          <div>
            <dt className="eyebrow">Role</dt>
            <dd className="mt-1 text-foreground/90">{project.role}</dd>
          </div>
          <div>
            <dt className="eyebrow">Verified stack</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="hairline rounded-full px-3 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onPreview(project)}
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          <Play className="size-4" /> Live preview
        </button>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer noopener"
          className="hairline inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Visit website <ExternalLink className="size-4" />
        </a>
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className="hairline inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <FileText className="size-4" /> Case study
        </Link>
        <span className="ml-auto font-mono text-xs text-muted-foreground">
          {project.number} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>
    </article>
  );
}