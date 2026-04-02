import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Synthesize your data",
      description: "Securely upload your test results, doctor's notes, and symptoms. We go beyond keywords, structuring every piece of data into a unified clinical timeline."
    },
    {
      number: "02",
      title: "Cross-check clinical logic",
      description: "Our reasoning engine evaluates your case against peer-reviewed literature and established clinical guidelines, identifying overlooked probabilities."
    },
    {
      number: "03",
      title: "Restore your control",
      description: "Receive a structured, plain-language analysis of your case. Not a diagnosis, but a roadmap for your next medical conversation."
    }
  ];

  return (
    <Section className="bg-[#fafafa] pt-24 md:pt-48 pb-24 md:pb-48 reveal-on-scroll">
      <Container>
        <div className="max-w-6xl mb-24 md:mb-40">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-[#1a1a1a] mb-12 md:mb-24 leading-[0.9]">
            How we <br /> restore clarity.
          </h2>
          <div className="w-16 md:w-24 h-px bg-[#2c3e34] mb-12 md:mb-24 opacity-40" />
          <p className="max-w-4xl text-xl md:text-2xl text-[#444444] font-light leading-relaxed">
            We apply a methodical, evidence-based reasoning layer to your medical history — structuring what matters and surfacing what others miss.
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-24 items-start reveal-on-scroll">
              <div className="text-5xl md:text-7xl font-light text-[#737373] font-mono shrink-0">
                {step.number}
              </div>
              <div className="max-w-4xl">
                <h3 className="text-3xl md:text-5xl font-medium text-[#1a1a1a] mb-6 md:mb-10 leading-tight tracking-tight">{step.title}</h3>
                <p className="text-lg md:text-xl text-[#444444] leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
