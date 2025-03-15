import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & { label: string; id: string };

export function Input({ id, label, className, ...props }: InputProps) {
  return (
    <>
      <label htmlFor={id} className="flex text-xs sm:text-base">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "w-full rounded-lg border border-(--neutral-500) bg-(--neutral-500)/10 px-4 py-2 text-base placeholder:text-xs placeholder:text-(--neutral-500)/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--neutral-500) sm:placeholder:text-base",
          className,
        )}
        {...props}
      />
    </>
  );
}
