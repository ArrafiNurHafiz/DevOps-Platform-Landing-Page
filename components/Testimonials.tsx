"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "We cut our deployment time from 45 minutes to under 3. The monitoring caught a production issue before any of our users noticed.",
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "ScaleGrid",
  },
  {
    quote:
      "The platform's infrastructure-as-code templates saved us weeks of setup. We migrated three services in an afternoon.",
    name: "Marcus Williams",
    role: "Staff DevOps Engineer",
    company: "FinStack",
  },
  {
    quote:
      "Finally, a single pane of glass for CI/CD, monitoring, and infra. Our team went from 5 tools to 1.",
    name: "Priya Patel",
    role: "CTO",
    company: "Orbital",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reduce]);

  return (
    <section className="py-24 md:py-32 border-t border-[#27272a]">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16">
          Loved by engineering teams
        </h2>

        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Quote className="w-8 h-8 text-brand-500/30 mx-auto mb-6" />
              <blockquote className="text-lg md:text-xl text-[#e4e4e7] leading-relaxed mb-8">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-sm font-semibold text-brand-400 mb-3">
                  {testimonials[current].name.charAt(0)}
                </div>
                <cite className="not-italic">
                  <span className="block text-sm font-medium">
                    {testimonials[current].name}
                  </span>
                  <span className="block text-xs text-[#7a7a82]">
                    {testimonials[current].role},{" "}
                    {testimonials[current].company}
                  </span>
                </cite>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() =>
              setCurrent(
                (c) => (c - 1 + testimonials.length) % testimonials.length
              )
            }
            className="p-2 rounded-full border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] hover:border-[#3f3f46] transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="p-2"
              aria-label={`Go to testimonial ${i + 1}`}
            >
              <span
                className={`block rounded-full transition-all ${
                  i === current
                    ? "bg-brand-500 w-4 h-1.5"
                    : "bg-[#27272a] w-1.5 h-1.5"
                }`}
              />
            </button>
          ))}
          <button
            onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
            className="p-2 rounded-full border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] hover:border-[#3f3f46] transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
