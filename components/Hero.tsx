"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.span
          initial={reduce ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          Now in Public Beta
        </motion.span>

        <motion.h1
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none text-balance max-w-4xl mx-auto"
        >
          Ship Faster.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-300">
            Break Less.
          </span>
          <br />
          Own Your Infrastructure.
        </motion.h1>

        <motion.p
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed"
        >
          One integrated platform for CI/CD, real-time monitoring, and infrastructure
          that your entire engineering team will actually love using.
        </motion.p>

        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 text-black font-medium text-sm hover:bg-brand-400 active:scale-[0.98] transition-all"
          >
            Start Free Trial
            <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </a>
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] hover:border-[#3f3f46] text-sm active:scale-[0.98] transition-all"
          >
            <Play className="w-4 h-4" />
            Watch Demo
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-6 text-xs text-[#7a7a82]"
        >
          <span>Works with</span>
          {["GitHub", "GitLab", "AWS", "GCP", "Azure"].map((name) => (
            <span key={name} className="font-mono text-[#a1a1aa]">
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
