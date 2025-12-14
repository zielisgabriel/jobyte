import { ReactNode } from "react";

interface UtilsLayoutProps {
  children: ReactNode
}

export default function UtilsLayout({
  children
}: UtilsLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}