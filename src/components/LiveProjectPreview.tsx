import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, TriangleAlert } from "lucide-react";
import { BrowserFrame } from "./BrowserFrame";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

type Props = {
  project: Project | null;
  onClose: () => void;
  onSelect: (project: Project) => void;
};

/**
 * Fullscreen live preview. The iframe is created only when a project is
 * selected, so no external site loads on first paint. If the site refuses to
 * be embedded (X-Frame-Options / CSP) we never see a load event, so after a
 * timeout we show a real fallback panel instead of an endless spinner.
 */
export function LiveProjectPreview({ project, onClose, onSelect }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    setLoaded(false);
    setBlocked(!project.embeddable);
    closeRef.current?.focus();
    if (!project.embeddable) return;
    const t = window.setTimeout(() => {
      setLoaded((isLoaded) => {
        if (!isLoaded) setBlocked(true);
        return isLoaded;
      });
    }, 8000);
    return () => window.clearTimeout(t);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} live preview`}
      className="fixed inset-0 z-50 flex flex-col bg-background/92 p-3 backdrop-blur-xl sm:p-6"
    >
      <div
        className={cn(
          "mx-auto flex w-full flex-1 flex-col gap-3 transition-all duration-500",
          expanded ? "max-w-none" : "max-w-6xl",
        )}
        style={{ animation: "none" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">
              {project.number} / {String(projects.length).padStart(2, "0")} — {project.category}
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl">{project.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(prev)}
              aria-label="Previous project"
              className="hairline rounded-sm p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => onSelect(next)}
              aria-label="Next project"
              className="hairline rounded-sm p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ArrowRight className="size-4" />
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="hairline rounded-sm px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Back to portfolio
            </button>
          </div>
        </div>

        <BrowserFrame
          url={project.url}
          title={project.title}
          expanded={expanded}
          onToggleExpand={() => setExpanded((v) => !v)}
          onClose={onClose}
          className="flex-1"
        >
          {!blocked && (
            <iframe
              key={project.slug}
              src={project.url}
              title={`${project.title} live preview`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className="size-full border-0 bg-white"
            />
          )}

          {!blocked && !loaded && (
            <div className="absolute inset-0 grid place-items-center bg-card">
              <p className="eyebrow animate-pulse">Loading {project.title}…</p>
            </div>
          )}

          {blocked && (
            <div className="absolute inset-0 grid place-items-center overflow-auto p-6">
              <div className="max-w-lg text-center">
                <TriangleAlert className="mx-auto size-6 text-accent" />
                <h3 className="mt-4 text-xl font-semibold">
                  {project.title} can&apos;t be embedded here
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  This site asks browsers not to display it inside another page. Nothing is
                  broken — open it directly and it works as normal.
                </p>
                <p className="mt-4 text-sm text-muted-foreground">{project.overview}</p>
                <p className="mt-4 font-mono text-xs text-primary">{project.url}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Open live website <ExternalLink className="size-4" />
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="hairline rounded-sm px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
                  >
                    Back to portfolio
                  </button>
                </div>
              </div>
            </div>
          )}
        </BrowserFrame>

        <p className="text-center text-xs text-muted-foreground">
          Embedded sites are shown read-only inside this frame — open in a new tab for the
          full experience. Press Esc to close.
        </p>
      </div>
    </div>
  );
}
