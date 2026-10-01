/**
 * Central configuration. Update these values with real details at any time.
 * Anything marked TODO is a placeholder and is clearly labelled in the UI.
 */
export const profile = {
  name: "Abdullah Raza",
  tagline: "I build software that moves business forward.",
  role: "Full-Stack Developer | React | Python | ERP & Business Software",
  education: "BSCS, University of Central Punjab",
  location: "Lahore, Pakistan",
  summary:
    "I'm Abdullah Raza, a BSCS student at the University of Central Punjab and a developer interested in full-stack applications, ERP systems, and business automation. I enjoy understanding how businesses work and translating their processes into practical software. From React interfaces to Python backends, relational databases, and deployment, I enjoy connecting the different parts of a software product into one working solution.",
  photo: "/assets/abdullah.png",
  contact: {
    // TODO: replace with real details
    email: "",
    github: "",
    linkedin: "",
    upwork: "",
  },
} as const;

export const journey = [
  {
    title: "Computer science education",
    body: "BSCS at the University of Central Punjab — algorithms, data structures, databases, and software engineering fundamentals.",
  },
  {
    title: "Frontend development",
    body: "React, JavaScript, HTML and CSS: responsive layouts and interactive interfaces built component by component.",
  },
  {
    title: "Backend development",
    body: "Python with Flask and Django — REST APIs, authentication, and the business logic behind the screens.",
  },
  {
    title: "Database engineering",
    body: "PostgreSQL and SQL: relational modelling, schema design, and queries that stay fast as data grows.",
  },
  {
    title: "Business applications",
    body: "Inventory, sales, purchase, finance and HR workflows turned into working software.",
  },
  {
    title: "ERP development",
    body: "Connected modules that share one data model instead of a pile of disconnected tools.",
  },
  {
    title: "Deployment & production",
    body: "Git and GitHub, deployments on Vercel and Render, environment configuration and live troubleshooting.",
  },
];
