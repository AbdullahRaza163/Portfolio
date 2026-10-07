import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  scene?: boolean;
  stickyChild?: boolean;
};

export const ScrollScene = forwardRef<HTMLElement, Props>(function ScrollScene(
  { id, children, className, scene = true, stickyChild = false },
  ref,
) {
  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative w-full", scene && !stickyChild && "scene-3d", className)}
      style={
        stickyChild
          ? {
              overflowX: "clip",
              overflowY: "visible",
              perspective: "none",
              transform: "none",
            }
          : undefined
      }
    >
      {children}
    </section>
  );
});