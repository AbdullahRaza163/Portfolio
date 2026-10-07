import { FoldingPanel } from "@/components/FoldingPanel";
import { ScrollScene } from "@/components/ScrollScene";
import { profile, journey, experience } from "@/data/profile";
import photo from "../assets/abdullah.png";

export function About() {
  return (
    <ScrollScene id="about" stickyChild className="px-5 py-28 lg:px-14">
      <div className="relative mx-auto max-w-[1500px]">
        {/* ============================================================
            LAYER 1 — the metal surface. This is what folds in and out.
            It contains no content, so its transform can't break sticky.
            ============================================================ */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <FoldingPanel from="top" to="depth" className="h-full">
            <div className="panel-metal hairline h-full w-full rounded-xl" />
          </FoldingPanel>
        </div>

        {/* ============================================================
            LAYER 2 — the content. No transform anywhere above it,
            so `position: sticky` on the left column actually works.
            ============================================================ */}
        <div className="relative p-6 sm:p-12">
          <p className="eyebrow">Scene 02 — About</p>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,6vw,5rem)] leading-[0.95] font-bold">
            IDEAS INTO INTERFACES.
            <span className="block text-primary">WORKFLOWS INTO SYSTEMS.</span>
          </h2>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            {/* ---------- LEFT: sticky photo ---------- */}
            <div className="relative">
              <div className="lg:sticky lg:top-24">
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 30%, oklch(0.68 0.19 255 / 22%), transparent 65%)",
                  }}
                  aria-hidden
                />
                <img
                  src={photo}
                  alt="Abdullah Raza"
                  loading="lazy"
                  width={500}
                  height={500}
                  className="relative w-full max-w-sm rounded-lg object-cover"
                />
                <p className="mt-4 font-mono text-xs text-muted-foreground">
                  {profile.education} — {profile.location}
                </p>
              </div>
            </div>

            {/* ---------- RIGHT: full content, scrolls with page ---------- */}
            <div>
              <h3 className="font-display text-2xl leading-tight font-bold sm:text-4xl">
                I DON&apos;T JUST BUILD PAGES. I BUILD SYSTEMS.
              </h3>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {profile.summary}
              </p>

              {experience.length > 0 && (
                <div className="mt-10">
                  <p className="eyebrow">Experience</p>
                  <ul className="mt-6 space-y-8 border-l border-border pl-6">
                    {experience.map((job) => (
                      <li key={`${job.company}-${job.role}`} className="relative">
                        <span
                          className="absolute top-2 -left-[27px] size-2 rounded-full bg-primary"
                          aria-hidden
                        />
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <p className="font-semibold">
                            {job.role} ·{" "}
                            <span className="text-primary">{job.company}</span>
                          </p>
                          <p className="font-mono text-[11px] text-muted-foreground">
                            {job.period}
                          </p>
                        </div>
                        <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                          {job.location}
                        </p>
                        <p className="mt-3 text-sm text-muted-foreground">
                          {job.summary}
                        </p>
                        {job.highlights.length > 0 && (
                          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                            {job.highlights.map((h) => (
                              <li key={h} className="flex gap-2">
                                <span
                                  className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/60"
                                  aria-hidden
                                />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {job.tech.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {job.tech.map((t) => (
                              <span
                                key={t}
                                className="hairline rounded-full px-3 py-1 font-mono text-[11px] text-muted-foreground"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-10">
                <p className="eyebrow">Journey</p>
                <ol className="mt-6 space-y-5 border-l border-border pl-6">
                  {journey.map((step, i) => (
                    <li key={step.title} className="relative">
                      <span
                        className="absolute top-2 -left-[27px] size-2 rounded-full bg-primary"
                        aria-hidden
                      />
                      <p className="font-mono text-[11px] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {step.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollScene>
  );
}