import { useEffect, useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { useHue } from "../lib/hooks";
import { useFormData } from "@/lib/hooks";
import { imgurBaseUrl } from "@/lib/imgur";
import { dominantHueAtom } from "@/lib/globals";

export function BackgroundImage() {
  const { getDominantHue } = useHue();
  const [{ imageId }] = useFormData();
  const imageRef = useRef<HTMLImageElement>(null);
  const setDominantHue = useSetAtom(dominantHueAtom);

  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
  }, [imageId]);

  return (
    imageId && (
      <img
        style={{ display: show ? "block" : "none" }}
        ref={imageRef}
        src={`${imgurBaseUrl}${imageId}`}
        className="w-[100%] h-[100%] object-cover"
        onError={() => setShow(false)}
        onLoad={() => {
          setShow(true);
          getDominantHue(imageRef).then(setDominantHue);
        }}
      />
    )
  );
}
