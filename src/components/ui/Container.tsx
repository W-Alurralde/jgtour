import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const maxWidths = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export default function Container({
  children,
  size = "xl",
}: ContainerProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: maxWidths[size],
        margin: "0 auto",
        padding: "0 16px",
      }}
    >
      {children}
    </div>
  );
}