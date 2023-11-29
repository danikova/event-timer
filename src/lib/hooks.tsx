import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useRemainingTime() {
  const [searchParams] = useSearchParams();
  const endDate = useMemo(() => searchParams.get('endDate') ?? new Date(), [searchParams]);
  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      const targetDate = new Date(endDate);

      // @ts-ignore
      const timeDiff = targetDate - now;

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setRemaining({
        days,
        hours,
        minutes,
        seconds
      });
    }, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  return remaining;
}
