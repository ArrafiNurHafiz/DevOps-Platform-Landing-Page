"use client";

import { motion, useReducedMotion } from "motion/react";
import { GitBranch, Activity, Cloud } from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "CI/CD Pipeline Engine",
    description:
      "Build, test, and deploy with zero configuration. Auto-detects your stack, parallelizes builds, and rolls back instantly on failure.",
    color: "from-brand-500/20 to-brand-500/5",
    large: true,
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description:
      "Full observability across services, hosts, and containers. Alerts that actually matter — no noise, no false alarms.",
    color: "from-blue-500/20 to-blue-500/5",
    large: false,
  },
  {
    icon: Cloud,
    title: "Infrastructure as Code",
    description:
      "Declarative configs for any cloud. Version-controlled, reviewable, and auditable. From one server to a thousand.",
    color: "from-purple-500/20 to-purple-500/5",
    large: false,
  },
];

export function Features() {
  const reduce = useReducedMotion();

  return (
    <section id="features" className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Everything your team needs
          </h2>
          <p className="mt-4 text-[#a1a1aa] max-w-xl mx-auto">
            No more stitching together half a dozen tools. One platform, one
            workflow, one source of truth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={reduce ? {} : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative p-0.5 rounded-2xl ${
                feature.large ? "md:col-span-2" : ""
              }`}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#27272a] to-transparent opacity-50" />
              <div className="relative h-full p-6 md:p-8 rounded-2xl bg-[#18181b] hover:bg-[#1f1f23] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
