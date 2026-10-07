import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects, type Project } from "@/data/projects";
import { ProjectPanel } from "./ProjectPanel";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const exits: gsap.TweenVars[] = [
  { rotateX: 70, transformOrigin: "50% 0%", z: -420, opacity: 0 },
  { rotateY: -62, transformOrigin: "0% 50%", z: -380, opacity: 0 },
  { rotateX: -66, transformOrigin: "50% 100%", z: -400, opacity: 0 },
  { rotateY: 62, transformOrigin: "100% 50%", z: -380, opacity: 0 },
];
const enters: gsap.TweenVars[] = [
  { rotateX: -72, transformOrigin: "50% 100%", z: -520, opacity: 0 },
  { rotateY: 66, transformOrigin: "100% 50%", z: -480, opacity: 0 },
  { rotateX: 70, transformOrigin: "50% 0%", z: -520, opacity: 0 },
  { rotateY: -66, transformOrigin: "0% 50%", z: -480, opacity: 0 },
];

export function ProjectGallery({
  onPreview,
}: {
  onPreview: (project: Project) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const pinned = !reduced && !isMobile;

  useGSAP(
    () => {
      if (!pinned || !wrapRef.current || !stageRef.current) return;
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", stageRef.current);
      if (panels.length === 0) return;

      gsap.set(panels, { autoAlpha: 0, z: -240 });
      panels.forEach((panel, index) =>
        gsap.set(panel, { zIndex: panels.length - index }),
      );
      gsap.set(panels[0]!, { autoAlpha: 1, rotateX: 0, rotateY: 0, z: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${(panels.length - 1) * window.innerHeight}`,
          pin: stageRef.current,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.round(self.progress * (panels.length - 1));
            setActive((prev) => (prev === i ? prev : i));
          },
        },
      });
      triggerRef.current = tl.scrollTrigger ?? null;

      panels.forEach((panel, i) => {
        if (i === panels.length - 1) return;
        const nextPanel = panels[i + 1]!;
        const position = i * 1.2;
        tl.to(
          panel,
          {
            ...exits[i % exits.length],
            autoAlpha: 0,
            ease: "power1.inOut",
            duration: 0.72,
          },
          position,
        ).fromTo(
          nextPanel,
          {
            ...enters[i % enters.length],
            autoAlpha: 0,
            zIndex: panels.length + i + 1,
          },
          {
            rotateX: 0,
            rotateY: 0,
            z: 0,
            autoAlpha: 1,
            ease: "power1.out",
            duration: 0.72,
          },
          position + 0.48,
        );
      });
    },
    { scope: wrapRef, dependencies: [pinned] },
  );

  const jumpTo = (index: number) => {
    setActive(index);
    const st = triggerRef.current;
    if (pinned && st) {
      const progress = index / (projects.length - 1);
      window.scrollTo({
        top: st.start + (st.end - st.start) * progress + 2,
        behavior: "smooth",
      });
    } else {
      document
        .getElementById(`project-${projects[index]!.slug}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      {pinned ? (
        <div
          ref={stageRef}
          className="scene-3d relative flex h-screen w-full items-center px-6 lg:px-14"
        >
          <div className="relative mx-auto h-[86vh] w-full max-w-[1500px] [transform-style:preserve-3d]">
            {projects.map((project, i) => (
              <div
                key={project.slug}
                data-panel
                className="absolute inset-0 [transform-style:preserve-3d]"
              >
                <ProjectPanel
                  project={project}
                  onPreview={onPreview}
                  className="h-full"
                  active={active === i}
                  mountLive={pinned}
                />
              </div>
            ))}
          </div>

          <nav
            aria-label="Project navigation"
            className="absolute top-1/2 right-4 z-20 flex -translate-y-1/2 flex-col gap-3 lg:right-6"
          >
            {projects.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Go to project ${p.number}: ${p.title}`}
                aria-current={active === i}
                className={cn(
                  "group flex items-center gap-2 font-mono text-[11px] transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  active === i
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "h-px transition-all",
                    active === i
                      ? "w-8 bg-primary"
                      : "w-4 bg-border group-hover:w-6",
                  )}
                />
                {p.number}
              </button>
            ))}
          </nav>

          <div
            aria-live="polite"
            className="absolute bottom-6 left-6 font-mono text-xs text-muted-foreground lg:left-14"
          >
            {projects[active]?.number} / {String(projects.length).padStart(2, "0")} —{" "}
            {projects[active]?.title}
          </div>
        </div>
      ) : (
        <div className="space-y-8 px-5 py-6 sm:px-8">
          {projects.map((project) => (
            <div key={project.slug} id={`project-${project.slug}`}>
              <ProjectPanel project={project} onPreview={onPreview} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}