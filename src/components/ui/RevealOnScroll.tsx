"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.01,
        rootMargin: "0px 0px 100px 0px"
      }
    );

    // Observe immediately, then again after a short delay for dynamic content
    const observe = () => {
      const elements = document.querySelectorAll(".reveal-on-scroll:not(.visible)");
      elements.forEach((el) => observer.observe(el));
    };
    observe();
    const timer = setTimeout(observe, 150);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [pathname]); // Re-run observer logic on every route change

  return null;
}
