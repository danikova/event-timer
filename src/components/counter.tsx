import { useMemo } from "react";
import { DateTime } from "luxon";
import { cn } from "@/lib/utils";
import { useFormData, useRemainingTime } from "@/lib/hooks";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function CounterDisplaySingleDigit({ num }: { num: number }) {
  const offset = useMemo(() => {
    if (num < 0) return 0;
    else if (num > 9) return 9;
    return num;
  }, [num]);

  const getNumber = (n: number) => (
    <div key={n} className="w-[45px] h-[5rem] flex justify-center items-center">
      <span className="text-[5rem]">{n}</span>
    </div>
  );

  return (
    <div className="w-[45px] h-[5rem] flex flex-col overflow-hidden">
      <div
        className="transition-[duration] duration-500"
        style={{ marginTop: `calc(${-offset} * 5rem)` }}
      >
        {numbers.map((n) => getNumber(n))}
      </div>
    </div>
  );
}

function CounterDisplayNumber({
  num,
  tooltip,
  className,
}: {
  num: number;
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
      <TooltipTrigger disabled={!tooltip} className={cn("flex", className)}>
        {nums.map((num, i) => (
          <CounterDisplaySingleDigit key={`${i}`} num={num} />
        ))}
      </TooltipTrigger>
      <TooltipContent side="bottom">{tooltip}</TooltipContent>
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
          tooltip={`${isTMinus ? "Remaining" : "Elapsed"} hours`}
          className="px-2"
        />
      );
    if (digits.includes("m"))
      _displays.push(
        <CounterDisplayNumber
          key="m"
          num={remaining.minutes}
          tooltip={`${isTMinus ? "Remaining" : "Elapsed"} minutes`}
          className="px-2"
        />
      );
    if (digits.includes("s"))
      _displays.push(
        <CounterDisplayNumber
          key="s"
          num={remaining.seconds}
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
