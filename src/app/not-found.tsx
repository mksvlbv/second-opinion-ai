import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center">
      <Section className="flex items-center justify-center">
        <Container className="text-center max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-[#1a1a1a] mb-6 leading-[0.9]">
            404
          </h1>
          <p className="text-xl md:text-2xl text-[#444444] font-light leading-relaxed mb-16">
            This page doesn&apos;t exist. Let&apos;s get you back on track.
          </p>
          <Button href="/" variant="primary">
            Back to homepage
          </Button>
        </Container>
      </Section>
    </main>
  );
}
