import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <Section className="bg-[#1a1a1a] text-white py-32 md:py-48 reveal-on-scroll overflow-hidden">
      <Container className="flex flex-col items-center text-center">
        <h2 className="max-w-7xl text-[clamp(2.5rem,8vw,6rem)] font-medium tracking-tighter mb-16 md:mb-24 leading-[0.88] flex flex-col items-center gap-y-4 md:gap-y-8">
          <span>Stop guessing.</span>
          <span className="text-[#666666]">Start understanding.</span>
        </h2>
        <p className="max-w-[700px] text-lg md:text-xl lg:text-2xl text-[#a3a3a3] mb-16 md:mb-24 leading-relaxed font-light">
          Take the first step toward clinical clarity. Your case analysis is private, secure, and methodical.
        </p>
        <div className="w-full sm:w-auto px-6 sm:px-0">
          <Button 
            href="/start"
            variant="none"
            className="w-full sm:w-auto bg-white text-[#1a1a1a] px-12 py-5 md:px-24 md:py-10 text-xl md:text-3xl lg:text-4xl font-bold shadow-[0_0_80px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_80px_rgba(44,62,52,0.4)]"
          >
            Start analysis
          </Button>
        </div>
      </Container>
    </Section>
  );
}
