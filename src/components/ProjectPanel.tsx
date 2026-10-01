import { ExternalLink, Play, FileText } from "lucide-react";
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
};

export function ProjectPanel({ project, onPreview, className, stacked }: Props) {
  return (
    <article
      className={cn(
        "group panel-metal hairline flex flex-col justify-between overflow-hidden rounded-xl p-6 sm:p-10",
        "transition-[box-shadow,transform] duration-500 hover:-translate-y-1",
        stacked && "absolute inset-0 will-change-transform [transform-style:preserve-3d]",
        className,
      )}
      style={{ ["--panel-accent" as string]: project.accent }}
      tabIndex={0}
      aria-label={`${project.title}, ${project.category}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 75% 20%, ${project.accent}22, transparent 65%)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-6">
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

      <div className="relative mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
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

      <div className="relative mt-8 flex flex-wrap items-center gap-3">
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
