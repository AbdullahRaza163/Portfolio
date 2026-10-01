import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { ERPArchitecture } from "@/sections/ERPArchitecture";
import { Services } from "@/sections/Services";
import { Contact } from "@/sections/Contact";
import { LiveProjectPreview } from "@/components/LiveProjectPreview";
import type { Project } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abdullah Raza — Full-Stack & ERP Developer | Beyond the Interface" },
      {
        name: "description",
        content:
          "Scroll-driven portfolio of Abdullah Raza, full-stack React and Python developer in Lahore building ERP and business software. Explore five live projects.",
      },
      {
        property: "og:title",
        content: "Abdullah Raza — Full-Stack & ERP Developer",
      },
      {
        property: "og:description",
        content:
          "React, Python, PostgreSQL and ERP work — with five live websites you can open inside the portfolio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [preview, setPreview] = useState<Project | null>(null);

  return (
    <main className="relative w-full overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Projects onPreview={setPreview} />
      <Skills />
      <ERPArchitecture />
      <Services />
      <Contact />
      <LiveProjectPreview
        project={preview}
        onClose={() => setPreview(null)}
        onSelect={setPreview}
      />
    </main>
  );
}
