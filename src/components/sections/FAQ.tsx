import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function FAQ() {
  const faqs = [
    {
      q: "Does this replace my doctor?",
      a: "No. Second Opinion AI is an informational tool. Always discuss our reports with your physician before making any medical decisions."
    },
    {
      q: "How secure is my medical data?",
      a: "We use HIPAA-compliant encryption. Your data is used only to generate your report and is never sold or used to train models."
    },
    {
      q: "What documents can I upload?",
      a: "You can upload lab reports, doctor's notes, and imaging summaries. Our system structures data from most standard medical formats."
    },
    {
      q: "How long does a report take?",
      a: "Analysis is generated in real-time, typically within seconds. Complex symptom patterns may take slightly longer as the system cross-references multiple clinical dimensions."
    }
  ];

  return (
    <Section className="bg-white pt-24 md:pt-48 pb-24 md:pb-64 border-t border-[#f0f0f0] reveal-on-scroll">
      <Container className="max-w-5xl">
        <div className="text-center mb-40">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-[#1a1a1a]">
            Common questions.
          </h2>
        </div>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <details 
              key={index} 
              className="group border-b border-[#f0f0f0] transition-all duration-500 [&_summary::-webkit-details-marker]:hidden overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer py-8 md:py-10 font-medium text-xl md:text-2xl text-[#1a1a1a] hover:text-[#666666] transition-all duration-300">
                {faq.q}
                <span className="relative flex-shrink-0 ml-1.5 w-8 h-8 md:w-12 md:h-12 transition-transform duration-500 group-open:rotate-45">
                  <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                </span>
              </summary>
              <div className="pb-8 md:pb-10 text-base md:text-lg text-[#444444] leading-relaxed font-light max-w-4xl transition-all duration-500 origin-top">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
