import { Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { SettingsForm } from "./settings-form"

export function SettingsToggle() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"} size="icon"><Settings2 className="h-[1.2rem] w-[1.2rem]" /></Button>
      </DialogTrigger>
      <DialogContent className="h-[70vh]">
        <DialogHeader>
          <DialogTitle>Counter's settings</DialogTitle>
          <DialogDescription className="opacity-50 pb-8">
            dummy description
          </DialogDescription>
          <SettingsForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
