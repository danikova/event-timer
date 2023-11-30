import { useFormData } from "@/lib/hooks";

export function Title() {
  const [{ title }] = useFormData();
  return title && <h3 className="text-[6rem] italic">{title}</h3>;
}
