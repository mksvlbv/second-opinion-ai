import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Contact | Second Opinion AI",
  description: "Get in touch with Second Opinion AI for questions, feedback, or collaborative inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Section className="pt-40 md:pt-56 pb-32">
        <Container className="max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-[#2c3e34] mb-12 block">Contact</span>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-[#000000] mb-16 leading-[1.1]">
            How to reach us.
          </h1>
          <div className="space-y-12 text-xl md:text-2xl text-[#444444] font-light leading-relaxed">
            <p>
              For questions, feedback, or collaborative inquiries:
            </p>
            <p className="text-[#000000] font-medium underline underline-offset-8 decoration-neutral-200 hover:decoration-[#2c3e34] transition-colors">
              hello@secondopinion.ai
            </p>
            <div className="pt-24 opacity-40">
              <p className="text-xs uppercase tracking-widest leading-loose">
                This is a conceptual product created for demonstration purposes. Developed to showcase high-end clinical reasoning UX.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
