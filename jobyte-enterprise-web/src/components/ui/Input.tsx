import { cva, VariantProps } from "class-variance-authority";

const inputVariables = cva("w-full p-2 py-1.5 placeholder:text-background/80 text-background disabled:opacity-50 rounded-full", {
  variants: {
    variant: {
      default: "bg-foreground border border-background focus:outline-none focus:ring-2 focus:ring-background/50",
      border_transparent: "bg-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-background/50",
      underline: "bg-transparent border-b border-foreground rounded-none focus:outline-none focus:ring-0 focus:border-foreground/80",
    },
  },
  defaultVariants: {
    variant: "default"
  }
});

export function Input({
  variant,
  className,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariables>) {
  return (
    <input
      className={inputVariables({className, variant})}
      autoComplete="off"
      {...props}
    />
  );
}