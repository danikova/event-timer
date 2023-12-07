import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "../lib/utils";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useMemo, useState } from "react";
import { HistoryItem, useFormData, usePresetHistory } from "@/lib/hooks";

const CREATE_NEW_VALUE = "_create_new_";

export function PresetSelector({ className }: { className?: string }) {
  const [selectedValue, setSelectedValue] = useState("");
  const { data, searchParams, setSearchParams } = useFormData();

  const [history, setHistory] = usePresetHistory();
  const historyMap = useMemo(() => {
    const _historyMap: {
      [k in string]: HistoryItem;
    } = {};
    for (let i = 0; i < history.length; i++) {
      const item = history[i];
      _historyMap[item.title] = item;
    }
    return _historyMap;
  }, [history]);

  useEffect(() => {
    if (data.title) setSelectedValue(data.title);
  }, [searchParams]); // eslint-disable-line

  if (!history.length) return null;

  return (
    <div className={cn("flex gap-x-4 ", className)}>
      <Select
        value={selectedValue}
        onValueChange={(value) => {
          if (value === CREATE_NEW_VALUE) {
            setSelectedValue("");
            setSearchParams(new URLSearchParams());
          } else {
            setSelectedValue(value);
            const item = historyMap[value];
            if (item) {
              setSearchParams(new URLSearchParams(item.searchParams));
            }
          }
        }}
      >
        <SelectTrigger className="focus:ring-0">
          <SelectValue placeholder="Select a preset" />
        </SelectTrigger>
        <SelectContent>
          {history.map((h) => {
            if (h.title)
              return (
                <SelectItem key={h.title} value={h.title}>
                  {h.title}
                </SelectItem>
              );
            return null;
          })}
          <SelectItem value={CREATE_NEW_VALUE}>Create new</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        className="px-3"
        disabled={!selectedValue || selectedValue === CREATE_NEW_VALUE}
        onClick={() => {
          const item = historyMap[selectedValue];
          if (item) {
            setSelectedValue("");
            setSearchParams(new URLSearchParams());
            setHistory(
              (oldHistory) =>
                oldHistory?.filter((item) => item.title !== data.title) ?? []
            );
          }
        }}
      >
        <Trash className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  );
}
