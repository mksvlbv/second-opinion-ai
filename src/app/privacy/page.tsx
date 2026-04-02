import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy Policy | Second Opinion AI",
  description: "We do not store your personal health data. Learn about our transient data processing policy.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Section className="pt-40 md:pt-56 pb-32">
        <Container className="max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-[#2c3e34] mb-12 block">Privacy Policy</span>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-[#000000] mb-16 leading-[1.1]">
            We do not store your personal health data.
          </h1>
          <div className="space-y-12 text-xl md:text-2xl text-[#444444] font-light leading-relaxed">
            <p>
              Privacy is fundamental to our methodology. We operate on a policy of transient data processing.
            </p>
            <p>
              Any clinical information or records shared during a session are processed strictly to generate your analysis. Once the session ends, the data is removed.
            </p>
            <div className="py-12 border-y border-neutral-100 italic font-serif text-[#1a1a1a]">
              &quot;We believe patients should own their data, not the systems that analyze it.&quot;
            </div>
            <p className="text-base text-[#737373] uppercase tracking-widest pt-8">
              HIPAA Compliant • AES-256 Encryption
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
