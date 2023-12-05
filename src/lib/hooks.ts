import { DateTime } from "luxon";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function getStartOffset() {
  const offsetMs = DateTime.utc().millisecond;
  if (offsetMs < 500) return 500 - offsetMs;
  return 1500 - offsetMs;
}

export function useDeltaTime() {
  const [{ endDate: targetDate }] = useFormData();
  const [deltaTime, setDeltaTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const ids: NodeJS.Timeout[] = [];

    async function deltaUpdate() {
      const timeDiff = targetDate.diffNow([
        "days",
        "hours",
        "minutes",
        "second",
      ]);
      setDeltaTime({
        days: ~~Math.abs(timeDiff.days),
        hours: ~~Math.abs(timeDiff.hours),
        minutes: ~~Math.abs(timeDiff.minutes),
        seconds: ~~Math.abs(timeDiff.seconds),
      });
    }

    ids.push(
      setTimeout(() => {
        ids.push(setInterval(deltaUpdate, 1000));
      }, getStartOffset())
    );

    return () => {
      for (const id of ids) {
        clearInterval(id);
      }
    };
  }, [targetDate]);

  return deltaTime;
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

export function usePrev<T>(state: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = state;
  });
  return ref.current;
}
