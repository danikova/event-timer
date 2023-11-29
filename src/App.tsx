import { CounterDisplayNumber, CounterSegment } from "./components/counter";
import { useRemainingTime } from "./lib/hooks";

export default function Counter() {
  const remaining = useRemainingTime();

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <CounterDisplayNumber num={remaining.days} />
      <CounterSegment text={':'} />
      <CounterDisplayNumber num={remaining.hours} />
      <CounterSegment text={':'} />
      <CounterDisplayNumber num={remaining.minutes} />
      <CounterSegment text={':'} />
      <CounterDisplayNumber num={remaining.seconds} />
    </div>
  )
}
