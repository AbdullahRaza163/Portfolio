import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from("[data-hero-line]", {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
      });

      gsap.to(panel.current, {
        rotateX: 58,
        y: "-18%",
        z: -600,
        opacity: 0.15,
        transformOrigin: "50% 0%",
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} className="scene-3d relative h-screen w-full overflow-hidden">
      <div className="atmosphere absolute inset-0" aria-hidden />
      <div className="grid-floor absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_70%)]" aria-hidden />

      <div
        ref={panel}
        className="relative z-10 flex h-full flex-col justify-center px-5 will-change-transform [transform-style:preserve-3d] lg:px-14"
      >
        <p className="eyebrow overflow-hidden">
          <span data-hero-line className="block">
            Beyond the Interface — {profile.location}
          </span>
        </p>

        <h1 className="mt-6 font-display text-[clamp(2.8rem,11vw,10rem)] leading-[0.86] font-extrabold">
          <span className="block overflow-hidden">
            <span data-hero-line className="block">
              ABDULLAH
            </span>
          </span>
          <span className="block overflow-hidden text-primary">
            <span data-hero-line className="block">
              RAZA
            </span>
          </span>
        </h1>

        <p className="mt-8 max-w-2xl overflow-hidden text-lg text-muted-foreground sm:text-2xl">
          <span data-hero-line className="block">
            I build software that moves business forward.
          </span>
        </p>

        <p className="mt-4 max-w-xl text-sm text-muted-foreground/80">
          {profile.role}. {profile.education}. Full-stack applications, ERP modules and
          business automation — with five live sites you can open right here.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild size="lg">
            <a href="#projects">Explore the work</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="/Abdullah-Raza-Portfolio.pdf" download>
              <Download aria-hidden /> Download portfolio
            </a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground">
        <ArrowDown className="size-5 animate-bounce" aria-hidden />
        <span className="sr-only">Scroll to continue</span>
      </div>
    </section>
  );
}
