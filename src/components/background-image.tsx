import { cn } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { useFormData } from "@/lib/hooks";
import { imgurBaseUrl } from "@/lib/imgur";
import { useEffect, useState } from "react";
import { dominantColorsAtom } from "@/lib/globals";
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
  const {
    data: { imageId },
  } = useFormData();
  const setDominantHue = useSetAtom(dominantColorsAtom);

  const [show, setShow] = useState(true);
  const [imgKey, setImgKey] = useState(uuidv4());

  useEffect(() => {
    setShow(true);
    setDominantHue([]);
    setImgKey(uuidv4());
  }, [imageId, setDominantHue]);

  return (
    imageId && (
      <div key={imgKey} className={cn(className)}>
        <img
          src={`${imgurBaseUrl}${imageId}`}
          className={cn(
            "w-[100%] h-[100%] object-cover block duration-300 animate-in fade-in",
            !show && "hidden"
          )}
          onError={() => setShow(false)}
          onLoad={(e) => {
            setTimeout(() => {
              try {
                const imgData = getOptimizedImageData(
                  e.target as HTMLImageElement
                );
                const hslColors = calculateDominantColors(hues, imgData);
                setDominantHue(hslColors);
              } catch (e) {} // eslint-disable-line
            }, 300);
          }}
        />
      </div>
    )
  );
}
