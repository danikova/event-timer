import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { Title } from "./components/title";
import { Counter } from "./components/counter";
import { Toaster } from "./components/ui/toaster";
import { ModeToggle } from "./components/mode-toggle";
import { SettingsToggle } from "./components/settings-toggle";
import { BackgroundImage } from "./components/background-image";

export default function App() {
  return (
    <>
      <div className="h-[100vh] w-[100vw] flex flex-col gap-y-10 justify-center items-center">
        <Title />
        <Counter />
      </div>
      <div className="absolute top-0 left-0 h-[100vh] w-[100vw] flex justify-center items-center opacity-50 z-[-1] blur-sm">
        <BackgroundImage />
      </div>
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
