import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { Helmet } from "react-helmet";
import { useFormData } from "./lib/hooks";
import { Toaster } from "./components/ui/toaster";
import { ModeToggle } from "./components/mode-toggle";
import { MainContent } from "./components/main-content";
import { SettingsToggle } from "./components/settings-toggle";
import { BackgroundImage } from "./components/background-image";

export default function App() {
  const [{ title: _title }] = useFormData();
  const title = useMemo(
    () => "Event Horizon" + (_title ? ` - ${_title}` : ""),
    [_title]
  );

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <BackgroundImage className="absolute top-0 left-0 h-[100vh] w-[100vw] overflow-hidden flex justify-center items-center opacity-40 z-[-1] blur-sm" />
      <MainContent className="h-[100vh] w-[100vw] flex flex-col gap-y-10 justify-center items-center" />
      <div className="absolute bottom-4 right-4 flex flex-col gap-y-4">
        <Tooltip>
          <TooltipTrigger>
            <SettingsToggle />
          </TooltipTrigger>
          <TooltipContent side="left">Open settings modal</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <ModeToggle />
          </TooltipTrigger>
          <TooltipContent side="left">Change color scheme</TooltipContent>
        </Tooltip>
      </div>
      <Toaster />
    </>
  );
}
