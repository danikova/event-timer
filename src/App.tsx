import { Counter } from "./components/counter";
import { ModeToggle } from "./components/mode-toggle";
import { SettingsToggle } from "./components/settings-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "./components/ui/tooltip";

export default function App() {
  return (
    <>
      <div className="h-[100vh] w-[100vw] flex justify-center items-center">
        <Counter />
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-y-4">
        <Tooltip>
          <TooltipTrigger>
            <SettingsToggle />
          </TooltipTrigger>
          <TooltipContent side="left">
            Open settings modal
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <ModeToggle />
          </TooltipTrigger>
          <TooltipContent side="left">
            Change color scheme
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  )
}
