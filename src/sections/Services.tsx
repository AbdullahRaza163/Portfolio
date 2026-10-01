import { FoldingPanel } from "@/components/FoldingPanel";
import { ScrollScene } from "@/components/ScrollScene";
import { services } from "@/data/services";

const folds = ["top", "left", "bottom", "right"] as const;

export function Services() {
  return (
    <ScrollScene id="services" className="px-5 py-24 lg:px-14">
      <div className="mx-auto max-w-[1500px]">
        <p className="eyebrow">Scene 06 — What I can build for you</p>
        <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] font-bold">
          HIRE ONE DEVELOPER. GET THE WHOLE STACK.
        </h2>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground">
          I work as an individual developer, not an agency. That means direct communication
          and one person accountable for the whole build.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <FoldingPanel key={s.title} from={folds[i % folds.length]!} to="none" scrub={0.5}>
              <div className="panel-metal hairline h-full rounded-lg p-6 sm:p-8">
                <p className="font-mono text-[11px] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-xl font-semibold sm:text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
                <a
                  href="#contact"
                  className="mt-6 inline-block font-mono text-[11px] tracking-[0.2em] text-primary uppercase transition-opacity hover:opacity-80"
                >
                  Discuss a project →
                </a>
              </div>
            </FoldingPanel>
          ))}
        </div>
      </div>
    </ScrollScene>
  );
}
