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
import { useToast } from "../lib/toast";
import { Settings2 } from "lucide-react";
import { useMemo, useState } from "react";
import { SettingsForm } from "./settings-form";
import { Button } from "@/components/ui/button";
import { FormData, useFormData } from "@/lib/hooks";

export function SettingsToggle() {
  const { toast } = useToast();
  const { data, setData, generateNewParams } = useFormData();
  const [dirtyData, setDirtyData] = useState<Partial<FormData>>({});
  const combinedData = useMemo<FormData>(
    () => _.defaults(_.cloneDeep(dirtyData), data),
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
      <DialogContent
        autoFocus={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Timer settings</DialogTitle>
          <DialogDescription className="opacity-50">
            Here you can edit some properties for this timer, you can update
            this instance or you can create a totally new timer with the
            provided properties
          </DialogDescription>
        </DialogHeader>
        <SettingsForm
          data={combinedData}
          setDirtyData={(partialData) => {
            setDirtyData({ ...dirtyData, ...partialData });
          }}
        />
        <DialogFooter className="flex flex-row sm:flex-row justify-between sm:justify-between">
          <Button
            variant="outline"
            disabled={isButtonsDisabled}
            onClick={() => {
              setDirtyData({});
            }}
          >
            Reset form
          </Button>
          <div className="flex gap-x-4">
            <Button
              variant="outline"
              disabled={isButtonsDisabled}
              onClick={() => {
                const loc = window.location;
                const params = generateNewParams(combinedData);
                window.open(
                  `${loc.origin}${loc.pathname}?${params.toString()}`,
                  "_blank"
                );
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
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
