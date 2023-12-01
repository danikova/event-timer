import { Title } from "./title";
import { cn } from "../lib/utils";
import { Counter } from "./counter";
import { useAtomValue } from "jotai";
import { useTheme } from "@/lib/theme";
import { CSSProperties, useMemo } from "react";
import { dominantColorsAtom } from "../lib/globals";
import { Hsl } from "@/lib/hue";

function hsla(hsl: Hsl, a = 1.0) {
  return `${~~(hsl.h * 360)} ${hsl.s * 100}%, ${hsl.l * 100}%, ${a * 100}%`;
}

export function MainContent({ className }: { className?: string }) {
  const { themeClass } = useTheme();
  const dominantColors = useAtomValue(dominantColorsAtom);
  const style = useMemo<CSSProperties>(() => {
    for (const c of dominantColors) {
      const tL =
        themeClass === "light"
          ? Math.max(c.l - 0.4, 0)
          : Math.min(c.l + 0.15, 1);

      const tsL =
        themeClass !== "light"
          ? Math.max(c.l - 0.4, 0)
          : Math.min(c.l + 0.15, 1);

      return {
        color: `hsla(${hsla({ ...c, l: tL })})`,
        textShadow: `4px 4px hsla(${hsla({ ...c, l: tsL })})`,
      };
    }
    return {};
  }, [themeClass, dominantColors]);

  return (
    <div className={cn(className, "transition-[color]")} style={style}>
      <Title />
      <Counter />
    </div>
  );
}
