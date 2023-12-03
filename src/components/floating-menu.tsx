import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ModeToggle } from "./mode-toggle";
import { SettingsToggle } from "./settings-toggle";
import { cn } from "../lib/utils";

export function FloatingMenu({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
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
  );
}
