import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FormData } from "@/lib/hooks";
import { DateTimePicker } from "./ui/datetime-picker";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Button } from "./ui/button";
import { uploadDummyImage } from "@/lib/imgur";

export function SettingsForm({
  data,
  setData,
}: {
  data: FormData;
  setData: (data: Partial<FormData>) => void;
}) {
  const { endDate, digits, title } = data;

  return (
    <div className="flex flex-col gap-4">
      <Label>Event title</Label>
      <Input
        value={title}
        onChange={(e) => {
          setData({ title: e.target.value });
        }}
      />
      <Label>Selected an end date</Label>
      <DateTimePicker
        date={endDate}
        setDate={(date) => {
          setData({ endDate: date });
        }}
      />
      <Label>Toggle digits</Label>
      <ToggleGroup
        type="multiple"
        value={digits}
        onValueChange={(value) => {
          setData({ digits: value });
        }}
      >
        <ToggleGroupItem value="d" variant="outline">
          Days
        </ToggleGroupItem>
        <ToggleGroupItem value="h" variant="outline">
          Hours
        </ToggleGroupItem>
        <ToggleGroupItem value="m" variant="outline">
          Minutes
        </ToggleGroupItem>
        <ToggleGroupItem value="s" variant="outline">
          Seconds
        </ToggleGroupItem>
      </ToggleGroup>
      <Button onClick={uploadDummyImage}>upload image</Button>
    </div>
  );
}
