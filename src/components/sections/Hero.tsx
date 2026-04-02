import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Entropy } from "@/components/ui/Entropy";

export function Hero() {
  return (
    <Section className="min-h-[90vh] flex items-center pt-24 md:pt-32 pb-16 bg-[#fafafa] relative overflow-hidden">
      
      {/* Visual Metaphor: Chaos to Structure */}
      <Entropy />
      
      <Container className="flex flex-col items-center text-center relative z-10 animate-emerge">
        <h1 className="max-w-[1000px] text-[clamp(2.5rem,8vw,6.5rem)] font-normal tracking-tighter text-[#333333] mb-10 leading-[0.88] text-center">
          When medical opinions conflict, <br />
          <span className="font-medium text-[#000000] block mt-4 leading-[0.88]">clarity becomes everything.</span>
        </h1>
        <p className="max-w-[600px] text-lg md:text-2xl text-[#444444] mb-16 leading-relaxed font-light">
          Understand what is happening. Second Opinion AI cross-checks complex cases using structured analysis to restore your control.
        </p>
        <div className="flex flex-col sm:flex-row gap-8 w-full sm:w-auto items-center">
          <Button href="/start" variant="primary" className="w-full sm:w-auto">
            Begin Case Analysis
          </Button>
          <Button href="/sample" variant="secondary" className="w-full sm:w-auto">
            View Sample Analysis
          </Button>
        </div>
      </Container>
    </Section>
  );
}
