import { useMemo } from "react";
import { useRemainingTime } from "@/lib/hooks";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function CounterDisplaySingleDigit({ num }: { num: number; }) {
  const offset = useMemo(() => {
    if (num < 0) return 0;
    else if (num > 9) return 9;
    return num;
  }, [num]);

  const getNumber = (n: number) => (<div key={n} className="w-[4rem] h-[5rem] flex justify-center items-center">
    <span className="text-[5rem]">{n}</span>
  </div>);

  return <div className="w-[4rem] h-[5rem] flex flex-col overflow-hidden">
    <div className="transition-all duration-500" style={{ marginTop: `calc(${-offset} * 5rem)` }}>
      {numbers.map(n => getNumber(n))}
    </div>
  </div>;
}

function CounterDisplayNumber({ num, tooltip }: { num: number, tooltip?: string }) {
  const nums = useMemo(() => {
    const _nums = num.toString().split('').map(n => parseInt(n));
    return _nums.length < 2 ? [0, ..._nums] : [..._nums];
  }, [num]);

  return <Tooltip >
    <TooltipTrigger disabled={!tooltip} className="flex">
      {nums.map((num, i) => <CounterDisplaySingleDigit key={`${i}`} num={num} />)}
    </TooltipTrigger>
    <TooltipContent side="bottom">
      {tooltip}
    </TooltipContent>
  </Tooltip>
}

function CounterSegment({ text }: { text: string; }) {
  return <div className="min-w-[4rem] h-[5rem] flex justify-center items-center">
    <span className="text-[5rem]">{text}</span>
  </div>;
}

export function Counter() {
  const remaining = useRemainingTime();

  return (
    <div className="flex">
      <CounterDisplayNumber num={remaining.days} tooltip="Remaining days" />
      <CounterSegment text={':'} />
      <CounterDisplayNumber num={remaining.hours} tooltip="Remaining hours" />
      <CounterSegment text={':'} />
      <CounterDisplayNumber num={remaining.minutes} tooltip="Remaining minutes" />
      <CounterSegment text={':'} />
      <CounterDisplayNumber num={remaining.seconds} tooltip="Remaining seconds" />
    </div>
  );
}