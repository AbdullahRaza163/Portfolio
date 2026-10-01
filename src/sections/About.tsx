import { FoldingPanel } from "@/components/FoldingPanel";
import { ScrollScene } from "@/components/ScrollScene";
import { profile, journey } from "@/data/profile";
import photo from "../assets/abdullah.png";

export function About() {
  return (
    <ScrollScene id="about" className="px-5 py-28 lg:px-14">
      <FoldingPanel from="top" to="depth">
        <div className="panel-metal hairline mx-auto max-w-[1500px] rounded-xl p-6 sm:p-12">
          <p className="eyebrow">Scene 02 — About</p>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,6vw,5rem)] leading-[0.95] font-bold">
            IDEAS INTO INTERFACES.
            <span className="block text-primary">WORKFLOWS INTO SYSTEMS.</span>
          </h2>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative">
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

            <div>
              <h3 className="font-display text-2xl leading-tight font-bold sm:text-4xl">
                I DON&apos;T JUST BUILD PAGES. I BUILD SYSTEMS.
              </h3>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {profile.summary}
              </p>

              <ol className="mt-10 space-y-5 border-l border-border pl-6">
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
                    <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </FoldingPanel>
    </ScrollScene>
  );
}
