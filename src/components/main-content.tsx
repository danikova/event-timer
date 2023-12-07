import { Title } from "./title";
import { Hsl } from "@/lib/hue";
import { cn } from "../lib/utils";
import { Counter } from "./counter";
import { useAtomValue } from "jotai";
import { Helmet } from "react-helmet";
import { Github } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { CSSProperties, useMemo } from "react";
import { dominantColorsAtom } from "../lib/globals";
import LogoSVG from "../assets/event-horizon-logo-min-rotated.svg?react";

function hsl(hsl: Hsl) {
  return `${~~(hsl.h * 360)} ${~~(hsl.s * 100)}% ${~~(hsl.l * 100)}%`;
}

export function MainContent({ className }: { className?: string }) {
  const { themeClass } = useTheme();
  const dominantColors = useAtomValue(dominantColorsAtom);
  const style = useMemo<CSSProperties>(() => {
    if (dominantColors.length) {
      const c = dominantColors[0];

      const tL =
        themeClass === "light"
          ? Math.max(c.l - 0.4, 0)
          : Math.min(c.l + 0.15, 1);

      const tsL =
        themeClass !== "light"
          ? Math.max(c.l - 0.4, 0)
          : Math.min(c.l + 0.15, 1);

      return {
        "--foreground": `${hsl({ ...c, l: tL })}`,
        color: `hsl(var(--foreground)))`,
        textShadow: `4px 4px hsl(${hsl({ ...c, l: tsL })})`,
      };
    }
    return {};
  }, [themeClass, dominantColors]);

  return (
    <div className={cn(className, "transition-[color]")} style={style}>
      <Helmet>
        <meta
          name="theme-color"
          content={
            dominantColors.length ? `hsl(${hsl(dominantColors[0])})` : undefined
          }
        />
      </Helmet>
      <a href="https://danikova.github.io/event-horizon/">
        <LogoSVG className="fixed w-[100px] top-4 left-4 stroke-[hsl(var(--foreground))] opacity-10 hover:opacity-80 transition-[opacity] duration-300 select-none" />
      </a>
      <Title />
      <Counter />
      <a href="https://github.com/danikova/event-horizon">
        <Github className="fixed sm:top-4 right-4 max-sm:bottom-4 opacity-10 hover:opacity-80 transition-[opacity] duration-300 select-none" />
      </a>
    </div>
  );
}
