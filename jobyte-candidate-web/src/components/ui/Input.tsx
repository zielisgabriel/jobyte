import { cva, VariantProps } from "class-variance-authority";

const inputVariables = cva("w-full p-2 py-1.5 placeholder:text-foreground/80 text-foreground disabled:opacity-50 rounded-full", {
  variants: {
    variant: {
      default: "bg-background border border-background focus:outline-none focus:ring-2 focus:ring-background/50",
      border_transparent: "bg-transparent border border-transparent focus:outline-none focus:ring-2 focus:ring-background/50",
      outline: "bg-transparent border border-foreground rounded-full focus:outline-none focus:ring-0 focus:border-foreground/80",
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