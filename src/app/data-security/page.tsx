import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Data Security | Second Opinion AI",
  description: "How your information is handled securely with transient processing and AES-256 encryption.",
};

export default function DataSecurityPage() {
  return (
    <main className="min-h-screen bg-white">
      <Section className="pt-40 md:pt-56 pb-32">
        <Container className="max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-[#2c3e34] mb-12 block">Security Standard</span>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-[#000000] mb-16 leading-[1.1]">
            How your information is handled.
          </h1>
          <div className="space-y-12 text-xl md:text-2xl text-[#444444] font-light leading-relaxed">
            <p>
              Information shared within this system is processed transiently. We do not store or persist personal health data beyond the active session.
            </p>
            <div className="space-y-8 py-12 border-y border-neutral-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a]">Security Framework</h3>
              <ul className="space-y-6 text-lg md:text-xl">
                <li><span className="font-medium text-[#1a1a1a]">Transient Processing:</span> All case context is cleared upon session termination.</li>
                <li><span className="font-medium text-[#1a1a1a]">Encryption:</span> Data in transit is secured using industry-standard AES-256 protocols.</li>
                <li><span className="font-medium text-[#1a1a1a]">Non-Persisted Input:</span> This tool does not maintain records of real patient identity or clinical history.</li>
              </ul>
            </div>
            <p className="text-sm text-[#737373] uppercase tracking-widest leading-relaxed">
              Designed as a conceptual demonstration of secure clinical reasoning UX.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
