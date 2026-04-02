import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Methodology | Second Opinion AI",
  description: "How Second Opinion AI organizes clinical reasoning using structured analysis and evidence-based frameworks.",
};

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Section className="pt-40 md:pt-56 pb-32">
        <Container className="max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-[#2c3e34] mb-12 block">Methodology</span>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-[#000000] mb-16 leading-[1.1]">
            How we organize clinical reasoning.
          </h1>
          
          <div className="space-y-16 text-xl md:text-2xl text-[#444444] font-light leading-relaxed">
            <p>
              Second Opinion AI is built on the principles of structured clinical reasoning. Instead of generating definitive conclusions, the system synthesizes patient-provided data to identify patterns often overlooked in high-pressure clinical environments.
            </p>
            
            <div className="space-y-8 py-12 border-y border-neutral-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a]">Our Framework</h3>
              <ul className="space-y-6">
                <li><span className="font-medium text-[#1a1a1a]">Pattern Recognition:</span> Correlation of symptoms across multiple body systems to identify systemic involvement.</li>
                <li><span className="font-medium text-[#1a1a1a]">Probabilistic Weighing:</span> Evaluation of findings against clinical guidelines and peer-reviewed literature.</li>
                <li><span className="font-medium text-[#1a1a1a]">Clinical Omissions:</span> Identification of logical gaps in the current diagnostic timeline.</li>
              </ul>
            </div>

            <p>
              The primary objective is to facilitate a more informed and productive dialogue between patients and their physicians.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
