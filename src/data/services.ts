export const services = [
  {
    title: "Full-stack web applications",
    body: "A single developer across the whole stack: interface, API, database and deployment, delivered as one working product.",
  },
  {
    title: "React frontend development",
    body: "Component-based interfaces, responsive layouts and interactive screens built to be extended later.",
  },
  {
    title: "Python Flask & Django backends",
    body: "Server-side applications with authentication, business rules and clean REST endpoints.",
  },
  {
    title: "PostgreSQL & SQL database design",
    body: "Relational schemas modelled around your real entities, with queries and reporting views that stay readable.",
  },
  {
    title: "Business management systems",
    body: "Inventory, sales, purchase, finance and HR workflows turned into software your team can operate daily.",
  },
  {
    title: "ERP modules & business workflows",
    body: "Individual modules or connected sets of them, designed to share one data model instead of separate silos.",
  },
  {
    title: "REST API development & integration",
    body: "New APIs for your product, or integration work connecting existing services and data sources.",
  },
  {
    title: "Deployment, debugging & support",
    body: "Vercel and Render deployments, environment configuration, and fixing what breaks once the software is live.",
  },
];

export const erpModules = [
  { id: "sales", label: "Sales", body: "Quotations, orders and customer records. Feeds inventory reservations and invoicing.", links: ["inventory", "finance"] },
  { id: "purchase", label: "Purchase", body: "Supplier orders and goods receipt. Increases stock and creates payables in finance.", links: ["inventory", "finance"] },
  { id: "inventory", label: "Inventory", body: "Stock levels, movements and valuation — the shared centre between buying, selling and production.", links: ["sales", "purchase", "manufacturing"] },
  { id: "finance", label: "Finance", body: "Invoices, payments and ledgers built from the documents other modules generate.", links: ["sales", "purchase", "reporting"] },
  { id: "hr", label: "HR", body: "Employees, attendance and payroll, with payroll costs posted into finance.", links: ["finance"] },
  { id: "manufacturing", label: "Manufacturing", body: "Production orders consuming materials and producing finished goods back into inventory.", links: ["inventory"] },
  { id: "reporting", label: "Reporting", body: "Operational and financial views assembled from every module's data.", links: ["database"] },
  { id: "database", label: "Database", body: "One relational schema underneath all modules, so a record means the same thing everywhere.", links: ["api"] },
  { id: "api", label: "APIs", body: "REST endpoints exposing the system to other tools, portals and integrations.", links: ["reporting"] },
] as const;

export const erpFlows = [
  "Sales → Inventory → Invoice → Finance",
  "Purchase → Supplier → Inventory → Payment",
  "Production → Materials → Manufacturing → Finished Goods",
];
