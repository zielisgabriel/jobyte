"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";
import { Separator } from "radix-ui";

const contentStyles = cva(
	"bg-background border border-foreground rounded-md p-2 flex flex-col gap-1 shadow-md",
	{
		variants: {
			inset: {
				true: "mt-1",
				false: "",
			},
		},
		defaultVariants: {
			inset: false,
		},
	}
);

const itemStyles = cva(
	"w-full rounded text-foreground hover:bg-foreground/10 focus:bg-foreground/10 outline-none",
	{
		variants: {
			variant: {
				default: "",
				destructive: "text-red-600 hover:bg-red-600/10 focus:bg-red-600/10",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

type ContentProps = DropdownMenu.DropdownMenuContentProps &
	VariantProps<typeof contentStyles> & {
		sideOffset?: number;
	};

type ItemProps = DropdownMenu.DropdownMenuItemProps & VariantProps<typeof itemStyles> & {
	asChild?: boolean;
	className?: string;
	children: ReactNode;
};

export function DropdownMenuRoot(props: DropdownMenu.DropdownMenuProps) {
	return <DropdownMenu.Root {...props} />;
}

export function DropdownMenuTrigger({ asChild = true, className, ...props }: DropdownMenu.DropdownMenuTriggerProps & { asChild?: boolean }) {
	// Mantém o padrão de usar Button como filho quando asChild=true
	return <DropdownMenu.Trigger asChild={asChild} className={className} {...props} />;
}

export function DropdownMenuContent({ className, inset, sideOffset = 5, align = "center", ...props }: ContentProps) {
	return (
		<DropdownMenu.Portal>
			<DropdownMenu.Content
				sideOffset={sideOffset}
				align={align}
				className={cn(contentStyles({ inset }), className)}
				{...props}
			/>
		</DropdownMenu.Portal>
	);
}

export function DropdownMenuItem({ asChild = true, className, children, variant, ...props }: ItemProps) {
	if (asChild) {
		return (
			<DropdownMenu.Item asChild className={cn("hover:outline-0", className)} {...props}>
				<Slot>{children}</Slot>
			</DropdownMenu.Item>
		);
	}

	return (
		<DropdownMenu.Item className={cn(itemStyles({ variant }), className)} {...props}>
			{children}
		</DropdownMenu.Item>
	);
}

export function MenuSeparator({ className, ...props }: React.ComponentProps<typeof Separator.Root>) {
	return <Separator.Root className={cn("w-full bg-foreground h-px my-0.5", className)} {...props} />;
}

export type DropdownItemProps = ItemProps;
export type DropdownContentProps = ContentProps;

