import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function RealCases() {
  const cases = [
    {
      story: "Three doctors gave me different answers. This was the first time I actually understood what they were saying. It connected the dots between my scattered labs and my symptoms in a way that just made sense.",
      author: "David L.",
      label: "Clinical Synthesis"
    },
    {
      story: "I was told my joint pain was just stress. The analysis flagged a rare autoimmune probability that my GP hadn't even considered. It gave me the evidence I needed to get the right specialist referral.",
      author: "Elena R.",
      label: "Diagnostic Navigation"
    }
  ];

  return (
    <Section className="bg-[#fafafa] pt-24 md:pt-48 pb-24 md:pb-48 reveal-on-scroll">
      <Container>
        <div className="max-w-5xl mb-20 md:mb-32">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-[#111111] mb-6 md:mb-8 leading-[0.9]">
            Real people.
          </h2>
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-[#888888] mb-12 leading-[0.9]">
            Moments of clarity.
          </h2>
          <div className="w-16 h-px bg-[#2c3e34] opacity-30" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-56">
          {cases.map((c, index) => (
            <div key={index} className="flex flex-col h-full reveal-on-scroll">
              <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#2c3e34] mb-8 md:mb-12 block">{c.label}</span>
              <p className="text-xl md:text-2xl text-[#000000] leading-relaxed mb-12 md:mb-16 font-light italic font-serif">
                &quot;{c.story}&quot;
              </p>
              <div className="mt-auto flex items-center gap-6">
                <div className="w-12 h-px bg-[#d4d4d4]" />
                <p className="text-lg md:text-xl font-semibold text-[#000000]">{c.author}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
