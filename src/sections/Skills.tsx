import { useState } from "react";
import { FoldingPanel } from "@/components/FoldingPanel";
import { ScrollScene } from "@/components/ScrollScene";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

const folds = ["top", "left", "bottom", "right", "depth"] as const;

export function Skills() {
  const [open, setOpen] = useState<string | null>("React");

  return (
    <ScrollScene id="skills" className="px-5 py-24 lg:px-14">
      <div className="mx-auto max-w-[1500px]">
        <p className="eyebrow">Scene 04 — Skills environment</p>
        <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] font-bold">
          EACH LAYER OF THE STACK, FOLDED OPEN.
        </h2>

        <div className="mt-16 space-y-10">
          {skillGroups.map((group, gi) => (
            <FoldingPanel
              key={group.id}
              from={folds[gi % folds.length]!}
              to={gi === skillGroups.length - 1 ? "none" : "depth"}
            >
              <div className="panel-metal hairline grid gap-8 rounded-xl p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="eyebrow">{group.label}</p>
                  <h3 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
                    {group.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm text-muted-foreground">{group.blurb}</p>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {group.items.map((item) => {
                    const isOpen = open === item.name;
                    return (
                      <li key={item.name}>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : item.name)}
                          aria-expanded={isOpen}
                          className={cn(
                            "hairline w-full rounded-md px-4 py-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                            isOpen ? "bg-secondary" : "hover:bg-secondary/60",
                          )}
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span className="font-medium">{item.name}</span>
                            <span
                              className={cn(
                                "size-1.5 rounded-full transition-colors",
                                isOpen ? "bg-primary" : "bg-border",
                              )}
                              aria-hidden
                            />
                          </span>
                          <span
                            className={cn(
                              "grid transition-[grid-template-rows,opacity] duration-300",
                              isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                            )}
                          >
                            <span className="overflow-hidden">
                              <span className="block pt-2 text-sm text-muted-foreground">
                                {item.note}
                              </span>
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </FoldingPanel>
          ))}
        </div>
      </div>
    </ScrollScene>
  );
}
