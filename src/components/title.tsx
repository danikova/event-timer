import { useFormData } from "@/lib/hooks";

export function Title() {
  const {
    data: { title },
  } = useFormData();
  return (
    title && (
      <h3 className="sm:text-[min(8vw,10rem)] text-[15vmin] italic whitespace-nowrap animate-fade-up animate-duration-300 animate-delay-0 animate-ease-in-out">
        {title}
      </h3>
    )
  );
}
