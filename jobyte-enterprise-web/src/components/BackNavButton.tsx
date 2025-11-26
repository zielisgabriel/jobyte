"use client"

import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef } from "react"

type ButtonBaseProps = ComponentPropsWithoutRef<typeof Button>

interface BackNavButtonProps extends Omit<ButtonBaseProps, "onClick"> {
  onClick?: () => void
  children?: React.ReactNode
  route?: string
}

export function BackNavButton({
  className,
  variant = "ghost",
  children = "Voltar",
  onClick,
  route,
  ...rest
}: BackNavButtonProps) {
  const router = useRouter()

  return (
    <Button
      variant={variant}
      className={cn("mb-2", className)}
      onClick={onClick ?? (() => route ? router.push(route) : router.back())}
      {...rest}
    >
      <ArrowLeftIcon className="mr-2 h-4 w-4" />
      {children}
    </Button>
  )
}