import * as React from "react";
import Link from "next/link";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "outline" | "none";
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-tight whitespace-nowrap hover:scale-[1.02]";
  
  const variants = {
    primary: "bg-[#1a1a1a] text-white hover:bg-[#2c3e34] px-8 py-3.5 md:px-12 md:py-4.5 text-lg md:text-xl shadow-lg hover:shadow-[0_20px_40px_rgba(44,62,52,0.2)] hover:-translate-y-1", 
    secondary: "bg-transparent text-[#1a1a1a] hover:text-[#000000] border border-[#e0e0e0] hover:border-[#1a1a1a] px-8 py-3.5 md:px-10 md:py-4 text-base md:text-lg font-medium", 
    outline: "border border-[#d4d4d4] bg-transparent text-[#1a1a1a] hover:border-[#000000] hover:text-[#000000] px-8 py-3.5 md:px-12 md:py-4.5 text-lg md:text-xl shadow-sm",
    none: "",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link
        href={href}
        className={combinedClassName}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      className={combinedClassName}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
