export type SkillGroup = {
  id: string;
  label: string;
  title: string;
  blurb: string;
  items: { name: string; note: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Panel 01",
    title: "Frontend",
    blurb:
      "Interfaces built as components, laid out to hold up on any screen size.",
    items: [
      { name: "React", note: "Component architecture, state, routing, hooks." },
      { name: "JavaScript", note: "The language behind every interface I ship." },
      { name: "HTML", note: "Semantic, accessible document structure." },
      { name: "CSS", note: "Responsive layout, spacing systems, motion." },
    ],
  },
  {
    id: "backend",
    label: "Panel 02",
    title: "Backend",
    blurb: "Server-side logic, APIs and authentication written in Python.",
    items: [
      { name: "Python", note: "Primary backend language." },
      { name: "Flask", note: "Lightweight services and REST endpoints." },
      { name: "Django", note: "Larger applications with models and admin." },
      { name: "REST APIs", note: "Versioned endpoints, validation, auth." },
    ],
  },
  {
    id: "databases",
    label: "Panel 03",
    title: "Databases",
    blurb: "Data modelled once, correctly, so the application can trust it.",
    items: [
      { name: "PostgreSQL", note: "Relational storage for business data." },
      { name: "SQL", note: "Joins, aggregation, reporting queries." },
      { name: "Data modelling", note: "Normalised schemas and relationships." },
    ],
  },
  {
    id: "engineering",
    label: "Panel 04",
    title: "Software engineering",
    blurb: "Turning how a business actually operates into working software.",
    items: [
      { name: "ERP systems", note: "Connected sales, stock, finance and HR modules." },
      { name: "Business logic", note: "Rules, approvals and document flows." },
      { name: "API integration", note: "Connecting third-party services." },
      { name: "Workflow automation", note: "Removing repeated manual steps." },
    ],
  },
  {
    id: "deployment",
    label: "Panel 05",
    title: "Deployment",
    blurb: "Getting the work live and keeping it running.",
    items: [
      { name: "Git & GitHub", note: "Version control and collaboration." },
      { name: "Vercel", note: "Frontend and application hosting." },
      { name: "Render", note: "Backend service hosting." },
      { name: "Environment config", note: "Secrets, variables, build settings." },
    ],
  },
];
