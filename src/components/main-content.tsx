import { Title } from "./title";
import { useMemo } from "react";
import { cn } from "../lib/utils";
import { Counter } from "./counter";
import { useAtomValue } from "jotai";
import { useTheme } from "@/lib/theme";
import { dominantColorsAtom } from "../lib/globals";

export function MainContent({ className }: { className?: string }) {
  const { themeClass } = useTheme();
  const dominantColors = useAtomValue(dominantColorsAtom);
  const style = useMemo(() => {
    if (!dominantColors.length) return {};
    for (const c of dominantColors) {
      const l = themeClass === "light" ? Math.max(c.l - 0.4, 0) : c.l;
      return {
        color: `hsl(${~~(c.h * 360)} ${c.s * 100}%, ${l * 100}%)`,
      };
    }
  }, [themeClass, dominantColors]);

  return (
    <div className={cn(className, "transition-[color]")} style={style}>
      <Title />
      <Counter />
    </div>
  );
}
