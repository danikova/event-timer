import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { FormData } from "@/lib/hooks";
import { PictureUpload } from "./picture-upload";
import { DateTimePicker } from "./ui/datetime-picker";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export function SettingsForm({
  data,
  setDirtyData,
}: {
  data: FormData;
  setDirtyData: (data: Partial<FormData>) => void;
}) {
  const { endDate, digits, title, imageId } = data;

  return (
    <div className="flex flex-col gap-4">
      <Label>Event title</Label>
      <Input
        value={title}
        onChange={(e) => {
          setDirtyData({ title: e.target.value });
        }}
      />
      <Label>Selected an end date</Label>
      <DateTimePicker
        date={endDate}
        setDate={(date) => {
          setDirtyData({ endDate: date });
        }}
      />
      <Label>Toggle digits</Label>
      <ToggleGroup
        type="multiple"
        value={digits}
        onValueChange={(value) => {
          setDirtyData({ digits: value });
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
      <Label>
        Background picture <span className="opacity-50">(imgur image id)</span>
      </Label>
      <div className="flex gap-x-4">
        <Input value={imageId} readOnly={true} />
        <PictureUpload
          btnText={imageId ? "Replace" : "Upload"}
          onChange={(value) => {
            setDirtyData({ imageId: value });
          }}
        />
        <Button
          variant="outline"
          disabled={!imageId}
          className="px-[0.6rem]"
          onClick={() => {
            setDirtyData({ imageId: "" });
          }}
        >
          <Trash className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
    </div>
  );
}
