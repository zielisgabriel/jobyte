import { cva, VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps } from "react";
import { cn } from "@/utils/cn";

const buttonVariables = cva("flex justify-center items-center gap-1 font-medium px-4 py-2 rounded-full cursor-pointer text-sm", {
  variants: {
    variant: {
      default: "bg-foreground text-background hover:bg-foreground/90 disabled:cursor-default disabled:hover:bg-foreground",
      color_invert: "bg-background text-foreground hover:bg-background/90",
      ghost: "bg-transparent text-foreground/80 hover:text-foreground hover:bg-foreground/10",
      outline: "bg-transparent border border-foreground text-foreground hover:bg-foreground/5",
    },
  },
  defaultVariants: {
    variant: "default"
  }
});

export function Button({
  asChild = false,
  variant,
  className,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariables> & {asChild?: boolean}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariables({className, variant}))}
      type="button"
      {...props}
    />
  );
}