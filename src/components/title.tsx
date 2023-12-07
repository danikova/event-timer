import { useFormData } from "@/lib/hooks";

export function Title() {
  const {
    data: { title },
  } = useFormData();
  return (
    title && (
      <h3 className="sm:text-[min(8vw,10rem)] text-[15vmin] italic whitespace-nowrap">
        {title}
      </h3>
    )
  );
}
