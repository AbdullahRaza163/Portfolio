export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  url: string;
  overview: string;
  detail: string;
  role: string;
  /** Only list technologies that are actually confirmed. */
  tech: string[];
  /** Set to false when the site is known to block iframe embedding. */
  embeddable: boolean;
  accent: string;
  /** Optional static screenshot in /public/previews/. Falls back gracefully if missing. */
  preview?: string;
};

export const projects: Project[] = [
  {
    slug: "a2ztameer",
    number: "01",
    title: "A2ZTameer",
    category: "Construction / Business Platform",
    url: "https://a2ztameer.com/",
    overview:
      "A construction-sector business platform presenting services and connecting clients with construction work online.",
    detail:
      "A live production website for the construction industry. The build covers the public-facing pages, responsive layout across devices, and the deployment pipeline that keeps the site online.",
    role: "Developer — implementation and deployment",
    tech: ["Web development", "Responsive UI", "Deployment"],
    embeddable: true,
    accent: "oklch(0.68 0.19 255)",
    preview: "/previews/a2ztameer.png",
  },
  {
    slug: "dumpukht-cuisine",
    number: "02",
    title: "Dumpukht Cuisine Pakistan",
    category: "Chef Website / Digital Experience",
    url: "https://dumpukhtcuisinepakistan.com/",
    overview:
      "A culinary brand website presenting a chef's work, cuisine and contact points as a single digital experience.",
    detail:
      "A presentation-focused website where typography, imagery and pacing carry the brand. Built as a responsive site and deployed to a live domain.",
    role: "Developer — implementation and deployment",
    tech: ["Web development", "Responsive UI", "Deployment"],
    embeddable: true,
    accent: "oklch(0.72 0.16 60)",
    preview: "/previews/dumpukht-cuisine.png",
  },
  {
    slug: "smartsols",
    number: "03",
    title: "SmartSols",
    category: "Digital Solutions",
    url: "https://smartsols.org/",
    overview:
      "A digital solutions company website covering services, positioning and client enquiry paths.",
    detail:
      "A multi-section company site built around clear service presentation and a direct route to contact. Responsive across desktop, tablet and mobile.",
    role: "Developer — implementation and deployment",
    tech: ["Web development", "Responsive UI", "Deployment"],
    embeddable: true,
    accent: "oklch(0.7 0.16 175)",
    preview: "/previews/smartsols.png",
  },
  {
    slug: "softerps",
    number: "04",
    title: "SoftERPs",
    category: "ERP / Business Software",
    url: "https://softerps.com/",
    overview:
      "An ERP and business-software product site covering business modules such as sales, inventory, finance and HR.",
    detail:
      "The project closest to my main interest: enterprise resource planning. The site presents connected business modules and how they fit together for an operating company.",
    role: "Developer — implementation and deployment",
    tech: ["Web development", "ERP domain", "Deployment"],
    embeddable: true,
    accent: "oklch(0.6 0.2 295)",
    preview: "/previews/softerps.png",
  },
  {
    slug: "younas-contracting",
    number: "05",
    title: "Younas Contracting",
    category: "Construction Management Application",
    url: "https://younas-contracting-9pdp-cyan.vercel.app/",
    overview:
      "A construction management application covering contracting work, deployed on Vercel.",
    detail:
      "An application rather than a brochure site: screens built around contracting operations, deployed on Vercel with environment configuration handled as part of the build.",
    role: "Developer — application build and deployment",
    tech: ["React", "Vercel", "Responsive UI"],
    embeddable: true,
    accent: "oklch(0.66 0.18 30)",
    preview: "/previews/younas-contracting.png",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);