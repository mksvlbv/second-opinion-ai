import * as React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Section({ children, className = "", ...props }: SectionProps) {
  return (
    <section className={`py-20 md:py-32 ${className}`} {...props}>
      {children}
    </section>
  );
}
