"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for small projects and personal use.",
    features: [
      "1,000 build minutes/mo",
      "3 team members",
      "Basic monitoring",
      "Community support",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/user/mo",
    description: "For growing teams that need more power.",
    features: [
      "10,000 build minutes/mo",
      "Unlimited team members",
      "Advanced monitoring & alerts",
      "Infrastructure as Code",
      "Priority support",
      "SLA guarantee",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced needs.",
    features: [
      "Unlimited build minutes",
      "Unlimited team members",
      "Custom integrations",
      "Dedicated support engineer",
      "On-premise option",
      "SSO & audit logs",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

export function Pricing() {
  const reduce = useReducedMotion();

  return (
    <section id="pricing" className="py-24 md:py-32 border-t border-[#27272a]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-[#a1a1aa] max-w-xl mx-auto">
            Start free. Scale as you grow. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={reduce ? {} : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative rounded-2xl p-0.5 ${
                tier.featured
                  ? "bg-gradient-to-b from-brand-500/40 to-transparent"
                  : ""
              }`}
            >
              <div
                className={`relative h-full rounded-2xl p-6 md:p-8 ${
                  tier.featured
                    ? "bg-[#18181b]"
                    : "bg-[#18181b] border border-[#27272a]"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-500 text-black text-xs font-medium">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className="text-sm text-[#7a7a82]">{tier.period}</span>
                  )}
                </div>
                <p className="text-sm text-[#a1a1aa] mb-6">
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-[#a1a1aa]"
                    >
                      <Check className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full text-sm font-medium transition-all active:scale-[0.98] ${
                    tier.featured
                      ? "bg-brand-500 text-black hover:bg-brand-400"
                      : "border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] hover:border-[#3f3f46]"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
