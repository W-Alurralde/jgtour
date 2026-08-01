import type { ReactNode } from "react";

type Variant = "primary" | "success" | "warning" | "premium";

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
}

const colors: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "#DBEAFE",
    color: "#1D4ED8",
  },

  success: {
    background: "#DCFCE7",
    color: "#15803D",
  },

  warning: {
    background: "#FEF3C7",
    color: "#B45309",
  },

  premium: {
    background: "#FEF3C7",
    color: "#92400E",
  },
};

export default function Badge({ children, variant = "primary" }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: 9999,
        fontSize: 12,
        fontWeight: 600,
        ...colors[variant],
      }}
    >
      {children}
    </span>
  );
}