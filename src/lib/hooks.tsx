import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useRemainingTime() {
  const [{ endDate: targetDate }] = useFormData();
  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const id = setInterval(() => {
      if (targetDate < DateTime.now()) {
        if (
          remaining.days ||
          remaining.hours ||
          remaining.minutes ||
          remaining.seconds
        )
          setRemaining({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });
        return;
      }
      const timeDiff = targetDate.diffNow([
        "days",
        "hours",
        "minutes",
        "second",
      ]);
      setRemaining({
        days: Math.floor(timeDiff.days),
        hours: Math.floor(timeDiff.hours),
        minutes: Math.floor(timeDiff.minutes),
        seconds: Math.floor(timeDiff.seconds),
      });
    }, 1000);
    return () => clearInterval(id);
  }, [remaining, targetDate]);

  return remaining;
}

export interface FormData {
  endDate: DateTime;
  digits: string[];
  title?: string;
}

function deserialize<K extends keyof FormData>(
  searchParams: URLSearchParams,
  key: K
): FormData[K] {
  const value = searchParams.get(key);
  if (key === "endDate")
    return value ? DateTime.fromISO(value) : DateTime.now();
  if (key === "digits") return value ? value?.split(",") : ["d", "h", "m", "s"];
  if (key === "title") return value ? value : "";
  throw new Error(`this key (${key}) is not supported on FormData`);
}

function serialize<K extends keyof FormData>(
  key: K,
  value: FormData[K]
): string {
  if (key === "endDate")
    return (
      (value as DateTime).toISO({
        format: "basic",
        suppressMilliseconds: true,
      }) ?? new Date().toISOString()
    );
  if (key === "digits") return (value as string[]).join(",");
  if (key === "title") return value as string;
  throw new Error(`this key (${key}) is not supported on FormData`);
}

export function useFormData(): [FormData, (values: Partial<FormData>) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const setData = useCallback(
    (values: Partial<FormData>) => {
      setSearchParams((old) => {
        for (const [key, value] of Object.entries(values)) {
          // @ts-ignore
          const serializedValue = serialize(key, value);
          old.delete(key);
          if (serializedValue) old.append(key, serializedValue);
        }
        return old;
      });
    },
    [setSearchParams]
  );

  const endDate = useMemo(() => {
    return deserialize(searchParams, "endDate");
  }, [searchParams]);

  const digits = useMemo(() => {
    return deserialize(searchParams, "digits");
  }, [searchParams]);

  const title = useMemo(() => {
    return deserialize(searchParams, "title");
  }, [searchParams]);

  return [{ endDate, digits, title }, setData];
}
