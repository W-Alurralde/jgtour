import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
}

const styles: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "#0057B8",
    color: "#FFFFFF",
    border: "none",
  },

  secondary: {
    background: "#11C5E8",
    color: "#FFFFFF",
    border: "none",
  },

  outline: {
    background: "transparent",
    color: "#0057B8",
    border: "1px solid #0057B8",
  },

  ghost: {
    background: "transparent",
    color: "#0057B8",
    border: "none",
  },
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        padding: "12px 20px",
        borderRadius: 12,
        fontWeight: 600,
        cursor: "pointer",
        width: fullWidth ? "100%" : undefined,
        transition: "all 0.2s ease",
        ...styles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}