"use client";

import { motion, useReducedMotion } from "motion/react";

const integrations = [
  { name: "GitHub", slug: "github" },
  { name: "GitLab", slug: "gitlab" },
  { name: "AWS", slug: "amazonwebservices" },
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "Azure", slug: "microsoftazure" },
  { name: "Kubernetes", slug: "kubernetes" },
  { name: "Docker", slug: "docker" },
  { name: "Terraform", slug: "terraform" },
  { name: "Prometheus", slug: "prometheus" },
  { name: "Datadog", slug: "datadog" },
  { name: "Slack", slug: "slack" },
  { name: "PagerDuty", slug: "pagerduty" },
];

export function Integrations() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 md:py-32 border-t border-[#27272a]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
            Integrations
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Works with your stack
          </h2>
          <p className="mt-4 text-[#a1a1aa] max-w-xl mx-auto">
            Plug into the tools your team already uses. No migration required.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {integrations.map((item, i) => (
            <motion.div
              key={item.name}
              initial={reduce ? {} : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: i * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-brand-500/30 hover:bg-[#1f1f23] transition-all"
            >
              <img
                src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${item.slug}.svg`}
                alt={item.name}
                width={28}
                height={28}
                className="h-6 md:h-7 w-auto opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110"
              />
              <span className="text-xs text-[#7a7a82] group-hover:text-[#a1a1aa] transition-colors">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
