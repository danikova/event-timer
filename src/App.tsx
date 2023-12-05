import { useMemo } from "react";
import { Helmet } from "react-helmet";
import { useFormData } from "./lib/hooks";
import { Toaster } from "./components/ui/toaster";
import { MainContent } from "./components/main-content";
import { FloatingMenu } from "./components/floating-menu";
import { BackgroundImage } from "./components/background-image";
import LogoSVG from '../assets/event-horizon-logo-min-rotated.svg?react';


export default function App() {
  const [{ title: _title }] = useFormData();
  const title = useMemo(
    () => "Event Horizon" + (_title ? ` - ${_title}` : ""),
    [_title]
  );

  return (
    <div className="sm:h-[100lvh] sm:w-[100lvw] h-[100svh] w-[100svw] overflow-hidden">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="sm:h-[100lvh] sm:w-[100lvw] sm:rotate-0 sm:mt-0 h-[100svw] w-[100svh] rotate-[90deg] [transform-origin:bottom_left] [margin-top:-50svh]">
        <LogoSVG className="fixed w-[100px] top-4 left-4 stroke-[hsl(var(--foreground))] opacity-10 hover:opacity-80 animate-[opacity] duration-300 select-none" />
        <BackgroundImage className="absolute top-0 left-0 h-[100%] w-[100%] overflow-hidden flex justify-center items-center opacity-40 z-[-1] blur-sm" />
        <MainContent className="h-[100%] w-[100%] flex flex-col gap-y-10 justify-center items-center" />
      </div>
      <FloatingMenu className="fixed bottom-4 right-4 flex flex-col gap-y-4" />
      <Toaster />
    </div>
  );
}
