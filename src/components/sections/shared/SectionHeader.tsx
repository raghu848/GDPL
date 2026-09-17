import { ReactNode } from "react";
import RevealLines from "@/components/ui/RevealLines";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  lines: ReactNode[];
  copy?: ReactNode;
  tone?: "light" | "dark";
  size?: "lg" | "md";
  className?: string;
};

/** Editorial section opener: label, line-revealed heading, supporting copy. */
export default function SectionHeader({ label, lines, copy, tone = "light", size = "lg", className }: Props) {
  const dark = tone === "dark";
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 mb-16 md:mb-24", className)}>
      <div className="lg:col-span-2 lg:pt-4">
        <span data-index className={cn("eyebrow", dark ? "text-bone/75" : "text-muted")}>
          {label}
        </span>
      </div>

      <div className={copy ? "lg:col-span-6" : "lg:col-span-10"}>
        <RevealLines className={size === "lg" ? "display-lg" : "display-md"} lines={lines} />
      </div>

      {copy && (
        <div className="lg:col-span-4 flex items-end">
          <p data-fade className={cn("body-lg max-w-[38ch]", dark ? "text-bone/80" : "text-muted")}>
            {copy}
          </p>
        </div>
      )}
    </div>
  );
}
