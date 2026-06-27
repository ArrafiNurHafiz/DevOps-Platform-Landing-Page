import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-500/15 via-transparent to-transparent" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Ready to ship with confidence?
        </h2>
        <p className="text-[#a1a1aa] mb-8 max-w-lg mx-auto">
          Join thousands of engineering teams already using DevOps Platform.
          Free to start. No credit card required.
        </p>
        <a
          href="#"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 text-black font-medium text-sm hover:bg-brand-400 active:scale-[0.98] transition-all"
        >
          Get Started Free
          <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </a>
      </div>
    </section>
  );
}
