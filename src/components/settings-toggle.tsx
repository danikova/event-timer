import { Label } from "./ui/label"
import { Settings2 } from "lucide-react"
import { useFormData } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { DateTimePicker } from "./ui/datetime-picker"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

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

function SettingsForm() {
  const [{ endDate }, setFormData] = useFormData()

  return <form className="flex flex-col gap-4">
    <Label>Selected an end date</Label>
    <DateTimePicker date={endDate} setDate={(date) => {
      setFormData({ endDate: date })
    }} />
  </form>
}
