import { cn } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { useFormData } from "@/lib/hooks";
import { imgurBaseUrl } from "@/lib/imgur";
import { dominantColorsAtom } from "@/lib/globals";
import { useEffect, useRef, useState } from "react";
import { getOptimizedImageData, calculateDominantColors } from "@/lib/hue";

const hues = [
  {
    lum: {
      low: 0.2,
      high: 0.6,
      tot: 0,
    },
    sat: {
      low: 0.0,
      high: 1.01,
      tot: 0,
    },
    count: 0,
    histo: new Uint16Array(360),
  },
];

export function BackgroundImage({ className }: { className?: string }) {
  const [{ imageId }] = useFormData();
  const imageRef = useRef<HTMLImageElement>(null);
  const setDominantHue = useSetAtom(dominantColorsAtom);

  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
  }, [imageId]);

  return (
    imageId && (
      <div className={cn(className)}>
        <img
          style={{ display: show ? "block" : "none" }}
          ref={imageRef}
          src={`${imgurBaseUrl}${imageId}`}
          className="w-[100%] h-[100%] object-cover"
          onError={() => setShow(false)}
          onLoad={() => {
            setShow(true);
            try {
              // @ts-ignore
              const imgData = getOptimizedImageData(imageRef.current);
              setDominantHue(calculateDominantColors(hues, imgData));
            } catch (e) {} // eslint-disable-line
          }}
        />
      </div>
    )
  );
}
