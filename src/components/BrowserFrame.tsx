import { ExternalLink, Maximize2, Minimize2, X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  url: string;
  title: string;
  children: ReactNode;
  expanded?: boolean;
  onToggleExpand?: () => void;
  onClose?: () => void;
  className?: string;
};

export function BrowserFrame({
  url,
  title,
  children,
  expanded,
  onToggleExpand,
  onClose,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-lg panel-metal hairline",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-border bg-secondary/60 px-3 py-2">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-muted-foreground/50" />
          <span className="size-2.5 rounded-full bg-primary/70" />
        </div>
        <div className="flex-1 truncate rounded-sm bg-background/70 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          {url}
        </div>
        <div className="flex items-center gap-1">
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open ${title} in a new tab`}
            className="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ExternalLink className="size-4" />
          </a>
          {onToggleExpand && (
            <button
              type="button"
              onClick={onToggleExpand}
              aria-label={expanded ? "Exit fullscreen preview" : "Expand preview to fullscreen"}
              className="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {expanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>
      <div className="relative flex-1 bg-background">{children}</div>
    </div>
  );
}
