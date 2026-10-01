import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Play } from "lucide-react";
import { getProject, projects, type Project } from "@/data/projects";
import { Navigation } from "@/components/Navigation";
import { LiveProjectPreview } from "@/components/LiveProjectPreview";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — Case study | Abdullah Raza`;
    return {
      meta: [
        { title },
        { name: "description", content: project.overview },
        { property: "og:title", content: title },
        { property: "og:description", content: project.overview },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectDetails,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold">Project not found</h1>
        <Link to="/" className="mt-4 inline-block text-sm text-primary hover:underline">
          Back to the portfolio
        </Link>
      </div>
    </div>
  );
}

function ProjectDetails() {
  const { project } = Route.useLoaderData();
  const [preview, setPreview] = useState<Project | null>(null);

  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <Navigation />
      <div className="atmosphere pointer-events-none absolute inset-0 h-[70vh]" aria-hidden />

      <div className="relative mx-auto max-w-[1100px] px-5 pt-32 pb-24 lg:px-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to portfolio
        </Link>

        <p className="eyebrow mt-10">
          {project.number} — {project.category}
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,9vw,6rem)] leading-[0.9] font-extrabold">
          {project.title}
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">{project.overview}</p>
        <p className="mt-4 max-w-2xl text-muted-foreground">{project.detail}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setPreview(project)}
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Play className="size-4" /> Live preview
          </button>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            className="hairline inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Visit website <ExternalLink className="size-4" />
          </a>
        </div>

        <dl className="mt-14 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
          <div>
            <dt className="eyebrow">Role</dt>
            <dd className="mt-2 text-sm">{project.role}</dd>
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
          <div>
            <dt className="eyebrow">Live URL</dt>
            <dd className="mt-2 font-mono text-xs break-all text-primary">{project.url}</dd>
          </div>
        </dl>

        <h2 className="mt-20 font-display text-2xl font-bold">Other projects</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {others.map((p) => (
            <li key={p.slug}>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="panel-metal hairline block rounded-lg p-5 transition-transform hover:-translate-y-0.5"
              >
                <span className="eyebrow">{p.number}</span>
                <span className="mt-2 block text-lg font-semibold">{p.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{p.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <LiveProjectPreview
        project={preview}
        onClose={() => setPreview(null)}
        onSelect={setPreview}
      />
    </main>
  );
}
