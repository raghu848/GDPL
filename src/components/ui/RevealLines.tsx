import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
};

/** Renders each line inside an overflow mask so timelines can raise it into view. */
export default function RevealLines({ lines, as: Tag = "h2", className, lineClassName }: Props) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span className={cn("line-inner", lineClassName)} data-line>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
