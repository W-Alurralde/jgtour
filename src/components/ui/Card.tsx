import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export default function Card({ children, style }: CardProps) {
  return (
    <article
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid #E2E8F0",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </article>
  );
}