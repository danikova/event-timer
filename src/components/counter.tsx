import { useMemo } from "react";

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export function CounterDisplaySingleDigit({ num }: { num: number; }) {
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

export function CounterDisplayNumber({ num }: { num: number }) {
  let numStr = num.toString();
  numStr = numStr.length < 2 ? '0' + numStr : numStr;
  return <>{numStr.split('').map((s, i) => <CounterDisplaySingleDigit key={`${i}`} num={parseInt(s)} />)}</>
}

export function CounterSegment({ text }: { text: string; }) {
  return <div className="min-w-[4rem] h-[5rem] flex justify-center items-center">
    <span className="text-[5rem]">{text}</span>
  </div>;
}
