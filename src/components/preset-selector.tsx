import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "../lib/utils";
import { Trash } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { HistoryItem, useFormData, usePresetHistory } from "@/lib/hooks";
import { Button } from "./ui/button";

const CREATE_NEW_VALUE = "_create_new_";

export function PresetSelector({ className }: { className?: string }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [data] = useFormData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [history, setHistory] = usePresetHistory();
  const historyMap = useMemo(() => {
    const _historyMap: {
      [k in string]: {
        item: HistoryItem;
        originalIndex: number;
      };
    } = {};
    for (let i = 0; i < history.length; i++) {
      const item = history[i];
      _historyMap[item.title] = {
        item,
        originalIndex: i,
      };
    }
    return _historyMap;
  }, [history]);
  const sortedHistory = useMemo(
    () =>
      history.sort((a, b) => {
        if (a.date > b.date) return -1;
        else if (a.date < b.date) return 1;
        else return 0;
      }),
    [history]
  );

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
            const h = historyMap[value];
            if (h && h.item) {
              setSearchParams(new URLSearchParams(h.item.searchParams));
            }
          }
        }}
      >
        <SelectTrigger className="focus:ring-0">
          <SelectValue placeholder="Select a preset" />
        </SelectTrigger>
        <SelectContent>
          {sortedHistory.map((h) => {
            return (
              <SelectItem key={h.title} value={h.title}>
                {h.title}
              </SelectItem>
            );
          })}
          <SelectItem value={CREATE_NEW_VALUE}>Create new</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        className="px-3"
        disabled={!selectedValue || selectedValue === CREATE_NEW_VALUE}
        onClick={() => {
          const h = historyMap[selectedValue];
          if (h && h.item) {
            setSelectedValue("");
            setSearchParams(new URLSearchParams());
            setHistory((oldHistory) => [
              ...(oldHistory?.splice(h.originalIndex, 1) ?? []),
            ]);
          }
        }}
      >
        <Trash className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  );
}
