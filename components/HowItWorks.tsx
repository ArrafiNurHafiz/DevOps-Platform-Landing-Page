"use client";

import { motion, useReducedMotion } from "motion/react";
import { Link2, Rocket, Activity } from "lucide-react";

const steps = [
  {
    icon: Link2,
    title: "Connect",
    description:
      "Link your GitHub, GitLab, or Bitbucket. We auto-detect your stack and suggest a pipeline in seconds.",
    step: "01",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description:
      "One click to staging, a PR merge to production. Zero-downtime deployments with instant rollback.",
    step: "02",
  },
  {
    icon: Activity,
    title: "Monitor",
    description:
      "Real-time dashboards, smart alerts, and distributed tracing. Know before your users do.",
    step: "03",
  },
];

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 md:py-32 border-t border-[#27272a]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            From code to production in minutes
          </h2>
          <p className="mt-4 text-[#a1a1aa] max-w-xl mx-auto">
            Three simple steps. No detours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-px bg-gradient-to-r from-brand-500/40 via-brand-500/60 to-brand-500/40" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={reduce ? {} : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 w-20 h-20 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center mb-6">
                <step.icon className="w-8 h-8 text-brand-400" />
              </div>
              <span className="text-xs font-mono text-brand-400 mb-2">
                {step.step}
              </span>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed max-w-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
