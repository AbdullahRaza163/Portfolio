import { useState } from "react";
import { FoldingPanel } from "@/components/FoldingPanel";
import { ScrollScene } from "@/components/ScrollScene";
import { erpModules, erpFlows } from "@/data/services";
import { cn } from "@/lib/utils";

export function ERPArchitecture() {
  const [selected, setSelected] = useState<string>("inventory");
  const current = erpModules.find((m) => m.id === selected)!;

  return (
    <ScrollScene id="systems" className="px-5 py-24 lg:px-14">
      <FoldingPanel from="left" to="depth">
        <div className="panel-metal hairline mx-auto max-w-[1500px] rounded-xl p-6 sm:p-12">
          <p className="eyebrow">Scene 05 — Conceptual architecture</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] font-bold">
            BEYOND WEBSITES. INTO BUSINESS SYSTEMS.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            A conceptual ERP architecture showing how business modules connect. Select a
            module to see its role and relationships. This diagram illustrates the approach —
            it is not a screenshot of a specific delivered system.
          </p>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {erpModules.map((m) => {
                const related = current.links.includes(m.id as never);
                const isActive = m.id === selected;
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(m.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "hairline w-full rounded-md px-4 py-6 text-center text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                        isActive && "-translate-y-1 bg-primary text-primary-foreground",
                        !isActive && related && "bg-secondary text-foreground",
                        !isActive && !related && "text-muted-foreground hover:bg-secondary/60",
                      )}
                    >
                      {m.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div>
              <div className="hairline rounded-md bg-background/40 p-6">
                <p className="eyebrow">{current.label}</p>
                <p className="mt-3 text-sm text-muted-foreground">{current.body}</p>
                <p className="mt-5 font-mono text-[11px] text-primary">
                  connects → {current.links.join(" · ")}
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <p className="eyebrow">Example workflows</p>
                {erpFlows.map((f) => (
                  <p key={f} className="font-mono text-xs text-muted-foreground">
                    {f}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FoldingPanel>
    </ScrollScene>
  );
}
