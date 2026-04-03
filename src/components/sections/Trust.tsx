import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function Trust() {
  return (
    <Section className="bg-white pt-24 md:pt-48 pb-24 md:pb-64 reveal-on-scroll">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 md:gap-24 mb-20 md:mb-32">
            <div className="max-w-4xl">
              <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.5em] text-[#2c3e34] mb-8 md:mb-12 block">Absolute Clinical Standard</span>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-[#1a1a1a] leading-[1.05]">
                Rigorous analysis <br /> as a standard.
              </h2>
            </div>
            <div className="lg:pt-16 max-w-sm">
              <p className="text-base md:text-lg text-[#666666] leading-relaxed italic border-l border-[#2c3e34] pl-6 font-serif">
                &quot;Built on clinical reasoning frameworks used by pathologists and diagnostic researchers.&quot;
              </p>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-[#444444] leading-relaxed font-light mb-20 md:mb-32 max-w-5xl reveal-on-scroll">
            We evaluate probabilities based on your medical context, history, and results — then show you the reasoning behind each finding.
          </p>
          
          <div className="space-y-16 md:space-y-24 border-t border-[#f0f0f0] pt-16 md:pt-24 max-w-4xl reveal-on-scroll">
            {[
              { label: "Logic", text: "Models trained on verified clinical datasets, identifying probabilities that general systems overlook." },
              { label: "Evidence", text: "Every finding is cross-referenced with PubMed literature and international clinical guidelines." },
              { label: "Security", text: "HIPAA-compliant isolation ensures your data remains private." },
              { label: "Transparency", text: "Traceable paths. We provide the \u2018why\u2019 behind every observation." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col text-left">
                <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#2c3e34] mb-4 md:mb-6">{item.label}</span>
                <p className="text-xl md:text-2xl text-[#1a1a1a] font-medium tracking-tight leading-tight max-w-3xl">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
