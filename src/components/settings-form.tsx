import { Label } from "./ui/label";
import { useFormData } from "@/lib/hooks";
import { DateTimePicker } from "./ui/datetime-picker";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export function SettingsForm() {
  const [{ endDate, digits }, setFormData] = useFormData();

  return <form className="flex flex-col gap-4">
    <Label>Selected an end date</Label>
    <DateTimePicker date={endDate} setDate={(date) => {
      setFormData({ endDate: date });
    }} />
    <Label>Toggle digits</Label>
    <ToggleGroup type='multiple' value={digits} onValueChange={(value) => {
      setFormData({ digits: value });
    }}>
      <ToggleGroupItem value="d" variant='outline'>
        Days
      </ToggleGroupItem>
      <ToggleGroupItem value="h" variant='outline'>
        Hours
      </ToggleGroupItem>
      <ToggleGroupItem value="m" variant='outline'>
        Minutes
      </ToggleGroupItem>
      <ToggleGroupItem value="s" variant='outline'>
        Seconds
      </ToggleGroupItem>
    </ToggleGroup>

  </form>;
}
