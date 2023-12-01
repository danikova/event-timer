import { DateTime } from "luxon";
import { getDominantHue } from "./hue";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";

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
      const timeDiff = targetDate.diffNow([
        "days",
        "hours",
        "minutes",
        "second",
      ]);
      setRemaining({
        days: Math.floor(Math.abs(timeDiff.days)),
        hours: Math.floor(Math.abs(timeDiff.hours)),
        minutes: Math.floor(Math.abs(timeDiff.minutes)),
        seconds: Math.floor(Math.abs(timeDiff.seconds)),
      });
    }, 1000);
    return () => clearInterval(id);
  }, [remaining, targetDate]);

  return remaining;
}

export interface FormData {
  endDate: DateTime;
  digits: string[];
  title: string;
  imageId: string;
}

function deserialize<K extends keyof FormData>(
  searchParams: URLSearchParams,
  key: K
): FormData[K] {
  const value = searchParams.get(key);
  if (key === "endDate")
    return (value ? DateTime.fromISO(value) : DateTime.now()) as FormData[K];
  if (key === "digits")
    return (value ? value?.split(",") : ["d", "h", "m", "s"]) as FormData[K];
  if (key === "title") return (value ? value : "") as FormData[K];
  if (key === "imageId") return (value ? value : "") as FormData[K];
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
  if (key === "imageId") return value as string;
  throw new Error(`this key (${key}) is not supported on FormData`);
}

export function useURLSearchParamsFactory() {
  const [searchParams] = useSearchParams();

  return useCallback(
    (values: Partial<FormData>) => {
      const temp = new URLSearchParams(searchParams);
      for (const [key, value] of Object.entries(values)) {
        // @ts-ignore
        const serializedValue = serialize(key, value);
        temp.delete(key);
        if (serializedValue) temp.append(key, serializedValue);
      }
      return temp;
    },
    [searchParams]
  );
}

export function useFormData(): [FormData, (values: Partial<FormData>) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const getNewParams = useURLSearchParamsFactory();

  const setData = useCallback(
    (values: Partial<FormData>) => {
      setSearchParams(getNewParams(values));
    },
    [getNewParams, setSearchParams]
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

  const imageId = useMemo(() => {
    return deserialize(searchParams, "imageId");
  }, [searchParams]);

  return [{ endDate, digits, title, imageId }, setData];
}

export function useHue() {
  const _getDominantHue = useCallback(
    (...props: Parameters<typeof getDominantHue>) => {
      const value = getDominantHue(...props);
      return value;
    },
    []
  );
  return { getDominantHue: _getDominantHue };
}
