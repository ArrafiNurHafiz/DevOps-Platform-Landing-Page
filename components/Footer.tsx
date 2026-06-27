import { ArrowRight } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog"],
  Resources: ["Documentation", "API Reference", "Blog", "Community"],
  Company: ["About", "Careers", "Privacy", "Terms"],
  Legal: ["Security", "GDPR", "SOC 2", "DPA"],
};

export function Footer() {
  return (
    <footer className="border-t border-[#27272a] py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 font-semibold text-sm mb-4">
              <span className="w-6 h-6 rounded-md bg-brand-500 flex items-center justify-center text-xs font-bold text-black">
                D
              </span>
              DevOps
            </a>
            <p className="text-xs text-[#7a7a82] leading-relaxed max-w-xs">
              One platform for CI/CD, monitoring, and infrastructure.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-[#7a7a82] hover:text-[#a1a1aa] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#27272a] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#7a7a82]">
            &copy; 2026 DevOps Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Subscribe to updates"
                className="px-3 py-1.5 rounded-full bg-[#18181b] border border-[#27272a] text-xs text-[#fafafa] placeholder:text-[#7a7a82] focus:outline-none focus:border-brand-500/50 w-48"
              />
              <button
                aria-label="Subscribe"
                className="p-1.5 rounded-full bg-brand-500 text-black hover:bg-brand-400 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
