"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [formData, setData] = useState({
    context: "",
    details: "",
    focus: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const nextStep = () => {
    if (step === 1 && formData.context.trim().length === 0) return;
    setStep((s) => s + 1);
  };
  const prevStep = () => setStep((s) => s - 1);

  const loadingMessages = [
    "Analyzing symptom patterns...",
    "Structuring clinical reasoning...",
    "Finalizing evidence threads..."
  ];

  const startAnalysis = () => {
    setIsAnalyzing(true);
    localStorage.setItem("case_data", JSON.stringify(formData));
    const t1 = setTimeout(() => setLoadingStage(1), 1200);
    const t2 = setTimeout(() => setLoadingStage(2), 2400);
    const t3 = setTimeout(() => router.push("/result"), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  };

  const steps = [
    {
      title: "What's happening?",
      subtitle: "Briefly describe your main concerns.",
      content: (
        <div className="space-y-4">
          <div className="border-l-2 border-[#2c3e34]/15 pl-6 focus-within:border-[#2c3e34]/40 transition-colors">
            <textarea
              autoFocus
              className="w-full h-[240px] bg-transparent p-0 text-3xl md:text-4xl font-light leading-relaxed placeholder:text-neutral-300 focus:outline-none resize-none border-none transition-all overflow-y-auto custom-scrollbar"
              placeholder="Fatigue for several months, joint pain..."
              value={formData.context}
              onChange={(e) => setData({ ...formData, context: e.target.value })}
            />
          </div>
          <p className="text-[11px] text-neutral-400 uppercase tracking-widest font-medium">Include patterns, triggers, and duration.</p>
        </div>
      ),
      cta: "Continue",
    },
    {
      title: "Add details.",
      subtitle: "Prior findings, medications, or test results.",
      content: (
        <div className="space-y-6">
          <div className="border-l-2 border-[#2c3e34]/15 pl-6 focus-within:border-[#2c3e34]/40 transition-colors">
            <textarea
              className="w-full h-[180px] bg-transparent p-0 text-2xl md:text-3xl font-light leading-relaxed placeholder:text-neutral-300 focus:outline-none resize-none border-none transition-all overflow-y-auto custom-scrollbar"
              placeholder="List any prior findings..."
              value={formData.details}
              onChange={(e) => setData({ ...formData, details: e.target.value })}
            />
          </div>
          <label className="flex items-center gap-3 text-[#2c3e34] hover:text-black cursor-pointer transition-colors group">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setData({ ...formData, details: formData.details + `\n[Attached: ${file.name}]` });
                }
              }}
            />
            <div className="w-8 h-8 rounded-full border border-[#2c3e34]/10 flex items-center justify-center group-hover:bg-[#e8ede9] transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
            </div>
            <span className="text-sm font-medium">Upload results (Optional)</span>
          </label>
        </div>
      ),
      cta: "Review case",
    },
    {
      title: "Primary focus.",
      subtitle: "What should we prioritize in this analysis?",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Possible causes for my symptoms",
            "Whether something has been missed",
            "Questions to discuss with my doctor",
            "Interpretation of existing findings",
          ].map((option) => (
            <button
              key={option}
              onClick={() => setData({ ...formData, focus: option })}
              className={`w-full text-left p-6 rounded-2xl border transition-all text-lg font-light ${
                formData.focus === option
                  ? "border-[#2c3e34] bg-[#e8ede9] text-[#1a1a1a]"
                  : "border-neutral-100 bg-white hover:border-[#2c3e34]/10"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ),
      cta: "Review case",
    },
    {
      title: "Final Review.",
      subtitle: "Verify your clinical context.",
      content: (
        <div className="space-y-6">
          <div className={`relative transition-all duration-500 overflow-hidden ${isSummaryExpanded ? 'max-h-[1000px]' : 'max-h-[150px]'}`}>
            <p className="text-2xl md:text-3xl text-black leading-relaxed font-light italic font-serif opacity-90">
                "{formData.context || "No context provided."}"
            </p>
            {!isSummaryExpanded && <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#fafafa] to-transparent pointer-events-none" />}
          </div>
          {formData.context.length > 200 && (
            <button onClick={() => setIsSummaryExpanded(!isSummaryExpanded)} className="text-[11px] font-bold uppercase tracking-widest text-[#2c3e34] opacity-40">
                {isSummaryExpanded ? "Collapse" : "Full Context"}
            </button>
          )}
        </div>
      ),
      cta: "Start analysis",
    },
  ];

  const current = steps[step - 1];

  if (isAnalyzing) {
    return (
      <main className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 text-center">
        <div className="space-y-8">
          <div className="w-12 h-12 border-2 border-neutral-100 border-t-[#2c3e34] rounded-full animate-spin mx-auto" />
          <h2 className="text-2xl font-medium tracking-tight animate-emerge text-[#2c3e34]">{loadingMessages[loadingStage]}</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col items-center">
      <Section className="w-full pt-20 pb-32 md:pt-32">
        <Container className="max-w-5xl">
          {/* Extremely Subtle Background Block */}
          {step > 1 && formData.context && (
            <div className="mb-16 animate-emerge opacity-40 hover:opacity-100 transition-opacity max-w-2xl">
              <div className="border-l border-neutral-200 pl-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2c3e34] opacity-40 block mb-2">History</span>
                <p className="text-xs leading-relaxed text-neutral-500 italic font-serif line-clamp-1">"{formData.context}"</p>
              </div>
            </div>
          )}

          {/* Step Header */}
          <div className="mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-neutral-400 mb-4 block">Section {step} / 4</span>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-[#1a1a1a] mb-2">{current.title}</h1>
            <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl">{current.subtitle}</p>
          </div>

          {/* Grouped Content & CTA */}
          <div className="space-y-12">
            <div>{current.content}</div>
            
            <div className="flex items-center gap-8 pt-4">
              <Button
                variant="primary"
                className="px-16 py-5 text-xl shadow-xl shadow-[#2c3e34]/5"
                onClick={step === 4 ? startAnalysis : nextStep}
              >
                {current.cta}
              </Button>
              {step > 1 && (
                <button onClick={prevStep} className="text-neutral-300 hover:text-[#1a1a1a] transition-colors text-xs font-bold uppercase tracking-widest">
                  Go back
                </button>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
