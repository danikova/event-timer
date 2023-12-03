import { useMemo } from "react";
import { DateTime } from "luxon";
import { cn } from "@/lib/utils";
import { ScoreWheel } from "./score-wheel";
import { useFormData, useRemainingTime } from "@/lib/hooks";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function CounterDisplayNumber({
  num,
  max,
  tooltip,
  className,
}: {
  num: number;
  max?: number[];
  tooltip?: string;
  className?: string;
}) {
  const nums = useMemo(() => {
    const _nums = num
      .toString()
      .split("")
      .map((n) => parseInt(n));
    return _nums.length < 2 ? [0, ..._nums] : [..._nums];
  }, [num]);

  return (
    <Tooltip>
      <TooltipTrigger disabled={!tooltip} asChild>
        <div className={cn("flex", className)}>
          {nums.map((num, i) => (
            <ScoreWheel key={`${i}`} num={num} max={max ? max[i] : 9} />
          ))}
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="[text-shadow:none]">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

function CounterSegment({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-[45px] h-[5rem] flex justify-center items-center",
        className
      )}
    >
      <span className="text-[5rem]">{text}</span>
    </div>
  );
}

export function Counter() {
  const [{ endDate, digits }] = useFormData();
  const isTMinus = useMemo(() => endDate > DateTime.now(), [endDate]);
  const remaining = useRemainingTime();

  const displays = useMemo(() => {
    const _displays = [];
    if (digits.includes("d"))
      _displays.push(
        <CounterDisplayNumber
          key="d"
          num={remaining.days}
          tooltip={`${isTMinus ? "Remaining" : "Elapsed"} days`}
          className="px-2"
        />
      );
    if (digits.includes("h"))
      _displays.push(
        <CounterDisplayNumber
          key="h"
          num={remaining.hours}
          max={[2, 9]}
          tooltip={`${isTMinus ? "Remaining" : "Elapsed"} hours`}
          className="px-2"
        />
      );
    if (digits.includes("m"))
      _displays.push(
        <CounterDisplayNumber
          key="m"
          num={remaining.minutes}
          max={[5, 9]}
          tooltip={`${isTMinus ? "Remaining" : "Elapsed"} minutes`}
          className="px-2"
        />
      );
    if (digits.includes("s"))
      _displays.push(
        <CounterDisplayNumber
          key="s"
          num={remaining.seconds}
          max={[5, 9]}
          tooltip={`${isTMinus ? "Remaining" : "Elapsed"} seconds`}
          className="px-2"
        />
      );
    return _displays.length
      ? _displays.reduce(
          (acc, val, index) => [
            ...acc,
            ...(index > 0
              ? [
                  <CounterSegment
                    key={`del-${index}`}
                    text={":"}
                    className="w-[20px]"
                  />,
                ]
              : []),
            val,
          ],
          [] as JSX.Element[]
        )
      : _displays;
  }, [remaining, digits, isTMinus]);

  return (
    <div className="flex">
      <CounterSegment text="T" />
      <CounterSegment text={isTMinus ? "-" : "+"} />
      {displays}
    </div>
  );
}
