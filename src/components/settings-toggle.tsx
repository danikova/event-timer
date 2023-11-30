import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import _ from "lodash";
import { Settings2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useMemo, useState } from "react";
import { SettingsForm } from "./settings-form";
import { Button } from "@/components/ui/button";
import { FormData, useFormData, useURLSearchParamsFactory } from "@/lib/hooks";

export function SettingsToggle() {
  const { toast } = useToast();
  const getNewParams = useURLSearchParamsFactory();
  const [data, setData] = useFormData();
  const [dirtyData, setDirtyData] = useState<Partial<FormData>>({});
  const combinedData = useMemo<FormData>(
    () => _.defaults(dirtyData, data),
    [data, dirtyData]
  );
  const isButtonsDisabled = useMemo(
    () => _.isEqual(combinedData, data),
    [combinedData, data]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" as="div">
          <Settings2 className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Timer settings</DialogTitle>
          <DialogDescription className="opacity-50">
            Here you can edit some properties for this timer, you can update
            this instance or create a new timer
          </DialogDescription>
        </DialogHeader>
        <SettingsForm data={combinedData} setData={setDirtyData} />
        <DialogFooter>
          <Button
            variant="outline"
            disabled={isButtonsDisabled}
            onClick={() => {
              const params = getNewParams(combinedData);
              window.open(`/?${params.toString()}`, "_blank");
              setDirtyData({});
              toast({ title: "Create new timer" });
            }}
          >
            Create new
          </Button>
          <Button
            disabled={isButtonsDisabled}
            onClick={() => {
              setData(dirtyData);
              setDirtyData({});
              toast({ title: "Updating current timer" });
            }}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
