import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Clinical Advisory | Second Opinion AI",
  description: "Advisory disclosure for Second Opinion AI — a conceptual demonstration of structured clinical reasoning.",
};

export default function ClinicalAdvisoryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Section className="pt-40 md:pt-56 pb-32">
        <Container className="max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-[#2c3e34] mb-12 block">Advisory Disclosure</span>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-[#000000] mb-16 leading-[1.1]">
            Clinical Advisory.
          </h1>
          <div className="space-y-12 text-xl md:text-2xl text-[#444444] font-light leading-relaxed">
            <p>
              This product is developed based on established clinical reasoning frameworks and general medical literature patterns.
            </p>
            <p>
              It is designed as a conceptual demonstration of how structured synthesis can clarify complex symptom timelines. This tool is not developed in collaboration with licensed medical professionals and does not offer clinical expertise.
            </p>
            <p className="text-[#000000] font-medium">
              The objective is to support clearer communication between patients and their healthcare providers, not to guide medical action.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
