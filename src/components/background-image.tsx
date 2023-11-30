import { useFormData } from "@/lib/hooks";
import { imgurBaseUrl } from "@/lib/imgur";

export function BackgroundImage() {
  const [{ imageId }] = useFormData();
  return <img src={`${imgurBaseUrl}${imageId}`} />;
}
