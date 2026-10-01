import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Adds the 3D perspective context used by folding panels. */
  scene?: boolean;
};

/** A full-height scroll scene with optional 3D perspective context. */
export const ScrollScene = forwardRef<HTMLElement, Props>(function ScrollScene(
  { id, children, className, scene = true },
  ref,
) {
  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden",
        scene && "scene-3d",
        className,
      )}
    >
      {children}
    </section>
  );
});
