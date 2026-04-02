import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100 py-24 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 mb-32">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#2c3e34]" />
              <p className="text-xl font-medium tracking-tight">Second Opinion AI</p>
            </div>
            <p className="max-w-md text-2xl text-[#1a1a1a] font-light leading-relaxed">
              Bridging the gap between complex medical history and structured clinical reasoning.
            </p>
            <p className="text-xs text-[#737373] uppercase tracking-widest leading-relaxed">
              &quot;When medical opinions conflict, clarity becomes everything.&quot;
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]">Product</h4>
              <ul className="space-y-4 text-sm text-[#666666]">
                <li><Link href="/methodology" className="hover:text-black transition-colors">Methodology</Link></li>
                <li><Link href="/clinical-advisory" className="hover:text-black transition-colors">Clinical Advisory</Link></li>
                <li><Link href="/sample" className="hover:text-black transition-colors">Sample Analysis</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]">System</h4>
              <ul className="space-y-4 text-sm text-[#666666]">
                <li><Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
                <li><Link href="/data-security" className="hover:text-black transition-colors">Data Security</Link></li>
                <li><Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] md:tracking-[0.4em] text-[#737373] text-center md:text-left">
            © {new Date().getFullYear()} Second Opinion AI. Experimental Prototype.
          </p>
          <div className="flex gap-6 md:gap-8">
            <Link href="/contact" className="text-[11px] font-bold uppercase tracking-[0.15em] md:tracking-[0.4em] text-[#737373] hover:text-black transition-colors">Contact</Link>
            <a href="https://github.com/mksvlbv/second-opinion-ai" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold uppercase tracking-[0.15em] md:tracking-[0.4em] text-[#737373] hover:text-black transition-colors">GitHub</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
