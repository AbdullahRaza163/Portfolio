import { FoldingPanel } from "@/components/FoldingPanel";
import { ScrollScene } from "@/components/ScrollScene";
import { ContactForm } from "@/components/ContactForm";
import { profile } from "@/data/profile";

const channels = [
  { key: "email", label: "Email", href: (v: string) => `mailto:${v}` },
  { key: "github", label: "GitHub", href: (v: string) => v },
  { key: "linkedin", label: "LinkedIn", href: (v: string) => v },
  { key: "upwork", label: "Upwork", href: (v: string) => v },
] as const;

export function Contact() {
  return (
    <ScrollScene id="contact" className="px-5 pt-24 pb-16 lg:px-14">
      <div className="atmosphere pointer-events-none absolute inset-0" aria-hidden />
      <FoldingPanel from="bottom" to="none">
        <div className="panel-metal hairline relative mx-auto max-w-[1500px] rounded-xl p-6 sm:p-12">
          <p className="eyebrow">Scene 07 — Contact</p>
          <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.2rem,7vw,6rem)] leading-[0.9] font-extrabold">
            LET&apos;S BUILD SOMETHING
            <span className="block text-primary">THAT MATTERS.</span>
          </h2>

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="max-w-md text-muted-foreground">
                Tell me what your business needs to do, and I&apos;ll tell you how I would
                build it — interface, backend, database and deployment.
              </p>

              <ul className="mt-10 space-y-3">
                {channels.map((c) => {
                  const value = profile.contact[c.key];
                  return (
                    <li key={c.key} className="hairline rounded-md px-4 py-3">
                      <span className="eyebrow block">{c.label}</span>
                      {value ? (
                        <a
                          href={c.href(value)}
                          target={c.key === "email" ? undefined : "_blank"}
                          rel="noreferrer noopener"
                          className="mt-1 block text-sm break-all text-primary hover:underline"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="mt-1 block text-sm text-muted-foreground">
                          Not added yet — set it in src/data/profile.ts
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <ContactForm />
          </div>

          <p className="mt-14 border-t border-border pt-6 font-mono text-[11px] text-muted-foreground">
            {profile.name} — {profile.location}. Built with React, GSAP and Tailwind CSS.
          </p>
        </div>
      </FoldingPanel>
    </ScrollScene>
  );
}
