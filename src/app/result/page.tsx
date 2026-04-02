"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/ui/Footer";

interface AnalysisProfile {
  summary: string;
  summaryDesc: string;
  confidence: string;
  basis: string[];
  observations: string[];
  interpretation: { label: string; title: string; desc: string }[];
  significance: string;
  questions: string[];
}

const fallbackProfile: AnalysisProfile = {
  summary: "Potential systemic clinical driver.",
  summaryDesc: "Symptoms span multiple physiological areas, indicating an underlying inflammatory or connective tissue driver.",
  confidence: "High Systemic Alignment",
  basis: ["Multi-systemic mapping", "Chronic duration weighting", "Tissue driver probability"],
  observations: [
    "Symptoms involve unrelated body systems.",
    "Duration exceeds typical acute recovery timelines.",
    "Progression continued despite rest/interventions."
  ],
  interpretation: [
    { label: "Consistent with", title: "Autoimmune process", desc: "Multi-system involvement aligns with systemic conditions." },
    { label: "Possible", title: "Chronic overlapping contributors", desc: "Multiple factors contributing to overall severity." },
    { label: "Less likely", title: "Isolated exhaustion", desc: "Findings do not align with purely psychogenic explanations." }
  ],
  significance: "Broader diagnostic focus necessary to identify root cause rather than symptoms.",
  questions: [
    "What systemic conditions explain multi-system symptoms?",
    "Does the pattern justify inflammatory marker screening?",
    "Should specialist autoimmune referral be considered?"
  ]
};

export default function AnalysisResultPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(0);
  const [isFallback, setIsFallback] = useState(false);
  const [profile, setProfile] = useState<AnalysisProfile>(fallbackProfile);
  
  const [caseData, setCaseData] = useState({
    context: "",
    details: "",
    focus: ""
  });

  const [copied, setCopied] = useState(false);

  const loadingMessages = [
    "Structuring clinical reasoning...",
    "Cross-referencing symptom patterns...",
    "Generating analysis brief..."
  ];

  const startReveal = useCallback(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1500),
      setTimeout(() => setStep(4), 2100),
      setTimeout(() => setStep(5), 2700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("case_data");
    let data = { context: "Fatigue for several months, joint pain, intermittent rash.", details: "", focus: "" };
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.context) data = parsed;
      } catch {
        const oldContext = localStorage.getItem("case_context");
        if (oldContext) data = { ...data, context: oldContext };
      }
    }
    setCaseData(data);

    // Check for cached result matching this input
    const cacheKey = `analysis_result_${btoa(encodeURIComponent(data.context)).slice(0, 32)}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const cachedProfile = JSON.parse(cached) as AnalysisProfile;
        if (cachedProfile.summary) {
          setProfile(cachedProfile);
          setIsLoading(false);
          startReveal();
          return;
        }
      } catch { /* ignore invalid cache */ }
    }

    const stageTimers = [
      setTimeout(() => setLoadingStage(1), 2000),
      setTimeout(() => setLoadingStage(2), 4000),
    ];

    fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((result: AnalysisProfile) => {
        setProfile(result);
        localStorage.setItem(cacheKey, JSON.stringify(result));
        setIsLoading(false);
        startReveal();
      })
      .catch(() => {
        setProfile(fallbackProfile);
        setIsFallback(true);
        setIsLoading(false);
        startReveal();
      })
      .finally(() => {
        stageTimers.forEach(clearTimeout);
      });

    return () => stageTimers.forEach(clearTimeout);
  }, [startReveal]);

  const handleCopy = () => {
    const textToCopy = `Analysis: ${profile.summary}\nCase: ${caseData.context}\nConfidence: ${profile.confidence}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 text-center">
        <div className="space-y-8">
          <div className="w-12 h-12 border-2 border-neutral-100 border-t-[#2c3e34] rounded-full animate-spin mx-auto" />
          <h2 className="text-2xl font-medium tracking-tight animate-emerge text-[#2c3e34]">
            {loadingMessages[loadingStage]}
          </h2>
          <p className="text-sm text-neutral-400 font-light max-w-sm mx-auto">
            This may take a few seconds
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-white">
      {/* Fallback banner */}
      {isFallback && (
        <div className="w-full bg-amber-50 border-b border-amber-200 py-3 text-center">
          <p className="text-sm text-amber-700 font-medium">Analysis generated offline — live AI was unavailable. <button onClick={() => window.location.reload()} className="underline hover:no-underline ml-1">Retry</button></p>
        </div>
      )}

      {/* 1. Hero Summary - Spacious & Impactful */}
      <Section className="pt-16 md:pt-24 pb-20 w-full">
        <Container className="max-w-5xl">
          <div className={`transition-all duration-1000 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-between items-end mb-16 border-b border-neutral-100 pb-12">
                <div className="space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-neutral-400">Clinical Case Brief</span>
                    <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-black leading-[1.05] max-w-3xl">{profile.summary}</h1>
                </div>
                <div className="text-right hidden lg:block pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#737373] opacity-40">Confidence Signal</span>
                    <p className="text-xl font-bold text-[#737373]">{profile.confidence}</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_300px] gap-20 items-start">
                <div className="space-y-12">
                    <p className="text-2xl md:text-3xl text-neutral-600 font-light leading-relaxed max-w-2xl">{profile.summaryDesc}</p>
                    
                    {/* Input Context - Subordinate but clear */}
                    <div className="bg-[#fcfdfc] border border-neutral-100 p-8 rounded-3xl relative group max-w-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-400">Input Context</span>
                            <button onClick={() => router.push("/start")} className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 hover:text-[#737373] transition-colors">Edit Case</button>
                        </div>
                        <div className={`relative overflow-hidden transition-all duration-700 ${isExpanded ? 'max-h-[500px]' : 'max-h-[100px]'}`}>
                            <p className="text-xl text-neutral-400 font-light italic font-serif leading-relaxed">"{caseData.context}"</p>
                            {!isExpanded && <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#fcfdfc] to-transparent pointer-events-none" />}
                        </div>
                        <button onClick={() => setIsExpanded(!isExpanded)} className="mt-4 text-[11px] font-bold text-[#737373] opacity-40 hover:opacity-100 transition-opacity">
                            {isExpanded ? "Collapse" : "Expand Source"}
                        </button>
                    </div>
                </div>

                <div className="space-y-8 lg:pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-neutral-400">Analysis Result</span>
                    <div className="space-y-4">
                        {profile.basis.map(b => (
                            <div key={b} className="group">
                                <p className="text-sm text-neutral-500 font-medium pb-2 border-b border-neutral-50 group-hover:border-[#737373]/20 transition-colors">{b}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Observations - Dense Rhythm */}
      <Section className={`py-24 bg-[#fafafa]/80 w-full transition-all duration-1000 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        <Container className="max-w-5xl">
          <div className="grid lg:grid-cols-[200px_1fr] gap-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-neutral-500 mb-12 block">Observations</span>
            <ul className="space-y-12">
                {profile.observations.map((item, i) => (
                <li key={i} className="text-2xl md:text-4xl text-neutral-800 font-light flex items-start gap-10 leading-tight">
                    <span className="text-[#737373] shrink-0 mt-3 opacity-20 text-base">0{i+1}</span>
                    {item}
                </li>
                ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 3. Clinical Interpretation - Dynamic Section */}
      <Section className={`py-32 md:py-48 w-full transition-all duration-1000 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0'}`}>
        <Container className="max-w-5xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-[#737373] mb-16 block">Interpretation</span>
          <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
            {profile.interpretation.map((item, i) => (
              <div key={i} className="space-y-8">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-4 block group-hover:text-[#737373] transition-colors">{item.label}</span>
                <div className="space-y-6">
                  <h4 className="text-3xl font-medium text-black tracking-tighter leading-tight">{item.title}</h4>
                  <p className="text-lg text-neutral-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Significance - High Contrast Rhythm Anchor */}
      <Section className={`py-32 md:py-40 bg-[#2c3e34] text-white w-full transition-all duration-1000 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
        <Container className="max-w-5xl text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] opacity-40 mb-12 block">Clinical Significance</span>
          <p className="text-4xl md:text-6xl font-light leading-tight italic font-serif max-w-4xl mx-auto">"{profile.significance}"</p>
        </Container>
      </Section>

      {/* 5. Questions - Final Block */}
      <Section className={`py-32 md:py-48 w-full transition-all duration-1000 ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
        <Container className="max-w-5xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-neutral-500 mb-16 block">Questions for Your Physician</span>
          <ul className="space-y-12 mb-32">
            {profile.questions.map((item, i) => (
              <li key={i} className="text-2xl md:text-3xl text-black leading-tight font-light border-b border-neutral-100 pb-12 italic font-serif">
                &quot;{item}&quot;
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-6 justify-center border-t border-neutral-100 pt-24">
            <Button variant="primary" className="px-12 py-4 text-lg" onClick={() => window.print()}>Print Report</Button>
            <Button variant="secondary" className="px-10 py-4 text-base min-w-[200px]" onClick={handleCopy}>
              {copied ? "Copied" : "Copy for Physician"}
            </Button>
          </div>

          <p className="mt-16 text-xs text-neutral-400 text-center max-w-xl mx-auto leading-relaxed">
            This analysis is generated by AI (GPT-4o mini) for educational purposes only. It does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional.
          </p>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
