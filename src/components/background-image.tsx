import { useFormData } from "@/lib/hooks";
import { imgurBaseUrl } from "@/lib/imgur";

export function BackgroundImage() {
  const [{ imageId }] = useFormData();
  return (
    imageId && (
      <img
        src={`${imgurBaseUrl}${imageId}`}
        className="w-[100%] h-[100%] object-cover"
        // @ts-ignore
        onError={(e) => (e.target.style.display = "none")}
      />
    )
  );
}
