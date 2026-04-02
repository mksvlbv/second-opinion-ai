"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/methodology", label: "Methodology" },
  { href: "/sample", label: "Sample" },
  { href: "/clinical-advisory", label: "Advisory" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const hideStartButton = pathname === "/start" || pathname === "/result";

  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-6 md:py-8">
      <Container className="flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-3 z-50">
          <div className="w-6 h-6 rounded-full border-2 border-[#2c3e34] flex items-center justify-center group-hover:bg-[#2c3e34] transition-all duration-500">
            <div className="w-1 h-1 rounded-full bg-[#2c3e34] group-hover:bg-white" />
          </div>
          <div className="text-base md:text-lg font-bold tracking-tighter text-[#1a1a1a]">
            Second Opinion <span className="text-[#2c3e34]/50">AI</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#666666] hover:text-[#1a1a1a] transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
          {!hideStartButton && (
            <Button href="/start" variant="secondary" className="px-5 py-2 text-sm opacity-90 hover:opacity-100">
              Start analysis
            </Button>
          )}
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span className={`block w-5 h-[1.5px] bg-[#1a1a1a] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-[#1a1a1a] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[2.5px]" : ""}`} />
        </button>

        {/* Mobile overlay */}
        <div
          className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-medium text-[#1a1a1a] hover:text-[#2c3e34] transition-colors tracking-tight"
            >
              {link.label}
            </Link>
          ))}
          <Button href={hideStartButton ? "/" : "/start"} variant="primary" className="mt-4 px-10 py-4 text-lg">
            {hideStartButton ? "Back to home" : "Start analysis"}
          </Button>
        </div>
      </Container>
    </nav>
  );
}
