import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export type FoldAxis = "top" | "bottom" | "left" | "right" | "depth";

const enterFrom: Record<FoldAxis, gsap.TweenVars> = {
  top: { rotateX: -78, transformOrigin: "50% 0%", y: 40 },
  bottom: { rotateX: 78, transformOrigin: "50% 100%", y: -40 },
  left: { rotateY: 72, transformOrigin: "0% 50%", x: 60 },
  right: { rotateY: -72, transformOrigin: "100% 50%", x: -60 },
  depth: { z: -900, scale: 0.78 },
};

const exitTo: Record<FoldAxis, gsap.TweenVars> = {
  top: { rotateX: 62, transformOrigin: "50% 100%" },
  bottom: { rotateX: -62, transformOrigin: "50% 0%" },
  left: { rotateY: -58, transformOrigin: "100% 50%" },
  right: { rotateY: 58, transformOrigin: "0% 50%" },
  depth: { z: -700, scale: 0.82 },
};

type Props = {
  children: ReactNode;
  className?: string;
  from?: FoldAxis;
  to?: FoldAxis | "none";
  scrub?: number;
};

export function FoldingPanel({
  children,
  className,
  from = "top",
  to = "depth",
  scrub = 0.6,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const keepFlat = to === "none";

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const el = ref.current;

      const enterTween = gsap.fromTo(
        el,
        { ...enterFrom[from], opacity: 0.15 },
        {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          z: 0,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 45%",
            scrub,
            invalidateOnRefresh: true,
          },
        },
      );

      // When this panel doesn't fold away, clear every transform once the
      // enter animation finishes, and drop the containing-block hints.
      // This is what lets position: sticky work for descendants.
      if (keepFlat) {
        enterTween.eventCallback("onComplete", () => {
          gsap.set(el, {
            clearProps: "transform,willChange,transformStyle",
          });
        });
      }

      if (to !== "none") {
        gsap.to(el, {
          ...exitTo[to],
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "bottom 60%",
            end: "bottom -20%",
            scrub,
            invalidateOnRefresh: true,
          },
        });
      }
    },
    { scope: ref, dependencies: [reduced, from, to, scrub] },
  );

  return (
    <div
      ref={ref}
      className={cn(
        keepFlat
          ? "" // no transform hints when the panel stays flat — sticky needs this
          : "will-change-transform [transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
}