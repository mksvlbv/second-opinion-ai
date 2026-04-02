import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function Problem() {
  return (
    <Section className="bg-transparent pt-24 md:pt-48 pb-24 md:pb-64 reveal-on-scroll">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="py-24 md:py-32 border-y border-neutral-200">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] leading-[1.2] md:leading-[1.3] text-center italic font-serif">
              &quot;Three specialists gave me three different answers. <br className="hidden md:block" />
              I didn&apos;t know who to trust or what to do next.&quot;
            </h2>
          </div>
          
          <div className="mt-20 md:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
            <div className="reveal-on-scroll">
              <p className="text-lg md:text-xl text-[#444444] leading-relaxed mb-10 md:mb-12 font-light">
                Healthcare is rarely straightforward. Conflicting diagnoses, rushed appointments, and contradictory advice leave patients paralyzed.
              </p>
              <p className="text-lg md:text-xl text-[#000000] font-medium leading-relaxed">
                When the diagnosis is unclear, you shouldn&apos;t decide alone.
              </p>
            </div>
            
            <div className="space-y-12 md:space-y-20 reveal-on-scroll">
              <div>
                <h4 className="text-lg md:text-xl font-bold text-[#000000] mb-4 md:mb-6 uppercase tracking-[0.3em]">The Information Gap</h4>
                <p className="text-lg md:text-xl text-[#444444] leading-relaxed font-light">Doctors have data, but you lack the reasoning behind their conclusions. You deserve the same depth of insight.</p>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-[#000000] mb-4 md:mb-6 uppercase tracking-[0.3em]">The Hidden Bias</h4>
                <p className="text-lg md:text-xl text-[#444444] leading-relaxed font-light">Systems optimize for the most likely path, often overlooking the nuanced reality of your specific history.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
