import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#systems", label: "Systems" },
  { href: "#services", label: "Services" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const isHome = useRouterState({ select: (s) => s.location.pathname === "/" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-center gap-6 px-5 py-4 lg:px-14">
        <Link to="/" className="font-display text-sm font-bold tracking-[0.2em] uppercase">
          Abdullah Raza
        </Link>
        {isHome && (
          <nav aria-label="Sections" className="ml-auto hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
        <Button asChild variant="outline" size="sm" className="ml-auto md:ml-0">
          <a href="/Abdullah-Raza-Portfolio.pdf" download>
            <Download aria-hidden />
            <span className="hidden sm:inline">Download portfolio</span>
            <span className="sm:hidden">PDF</span>
          </a>
        </Button>
        <Button asChild size="sm" className="hidden sm:inline-flex">
          <a href={isHome ? "#contact" : "/#contact"}>Discuss your project</a>
        </Button>
      </div>
    </header>
  );
}
