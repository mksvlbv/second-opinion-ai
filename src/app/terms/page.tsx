import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Terms of Service | Second Opinion AI",
  description: "Terms of use for Second Opinion AI. This tool provides structured interpretations for educational purposes only.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Section className="pt-40 md:pt-56 pb-32">
        <Container className="max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-[#2c3e34] mb-12 block">Terms of Service</span>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-[#000000] mb-16 leading-[1.1]">
            Terms of Use.
          </h1>
          <div className="space-y-12 text-xl md:text-2xl text-[#444444] font-light leading-relaxed">
            <p>
              This tool provides structured interpretations of user-provided information for educational purposes only.
            </p>
            <p className="text-[#000000] font-medium">
              It does not replace professional medical advice, diagnosis, or treatment.
            </p>
            <p>
              By using this service, you acknowledge that all clinical decisions must be discussed with a qualified healthcare provider. We do not assume liability for actions taken based on these informational briefs.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
