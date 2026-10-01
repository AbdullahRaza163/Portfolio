import { ProjectGallery } from "@/components/ProjectGallery";
import type { Project } from "@/data/projects";

export function Projects({ onPreview }: { onPreview: (p: Project) => void }) {
  return (
    <section id="projects" className="relative">
      <div className="px-5 pt-24 pb-10 lg:px-14">
        <div className="mx-auto max-w-[1500px]">
          <p className="eyebrow">Scene 03 — Live work</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] font-bold">
            FIVE REAL WEBSITES. OPEN THEM FROM HERE.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            Each panel folds away to reveal the next. Use the live preview to load the actual
            site inside a browser frame, or open it in a new tab.
          </p>
        </div>
      </div>
      <ProjectGallery onPreview={onPreview} />
    </section>
  );
}
