"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { label: "Product", href: "#features" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">
      <div className="flex items-center justify-between w-full max-w-5xl mx-auto px-4 h-14 rounded-full bg-[#18181b]/80 backdrop-blur-xl border border-[#27272a]">
        <a href="/" className="flex items-center gap-2 font-semibold text-sm">
          <span className="w-6 h-6 rounded-md bg-brand-500 flex items-center justify-center text-xs font-bold text-black">
            D
          </span>
          DevOps
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-[#a1a1aa]">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#fafafa] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
          >
            Sign In
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-brand-500 text-black hover:bg-brand-400 transition-colors"
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[#a1a1aa] hover:text-[#fafafa]"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={reduce ? {} : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setOpen(false)}
                className="text-2xl font-medium text-[#fafafa] hover:text-brand-400 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#"
              initial={reduce ? {} : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.08 }}
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 text-black font-medium"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
