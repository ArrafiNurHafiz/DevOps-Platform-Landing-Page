# DevOps Platform Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium dark-tech landing page for a DevOps platform with 10 sections, responsive, animated, and Lighthouse ≥ 90.

**Architecture:** Next.js 14 App Router with RSC by default. Client Components only where interaction is needed (animations, carousel, mobile nav). Each page section is an isolated component in `components/`.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion (via `motion/react`), Lucide React, Geist fonts.

**Design tokens:** Dark theme (`#0a0a0a`), emerald accent (`#10b981`), Geist sans + mono.

---

## File Structure

```
app/
├── globals.css          # Tailwind directives + global styles + dark theme tokens
├── layout.tsx           # Root layout: fonts, metadata, body wrapper
└── page.tsx             # Main page: assembles all sections
components/
├── Navbar.tsx           # Floating pill nav + mobile hamburger overlay
├── Hero.tsx             # Hero section with headline, CTAs, visual
├── LogoBar.tsx          # "Trusted by" logo strip
├── Features.tsx         # Asymmetric bento feature grid
├── HowItWorks.tsx       # 3-step horizontal timeline
├── Integrations.tsx     # Partner logo grid
├── Testimonials.tsx     # Testimonial carousel
├── Pricing.tsx          # 3-tier pricing cards
├── CtaBanner.tsx        # Bottom CTA section
├── Footer.tsx           # 4-column footer + newsletter
└── SectionWrapper.tsx   # Reusable scroll-reveal wrapper
lib/
└── utils.ts             # cn() helper
```

### Task 1: Scaffold project + install deps

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `lib/utils.ts`

- [ ] **Create `package.json`**

```json
{
  "name": "devops-platform-landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "motion": "^11.0.0",
    "lucide-react": "^0.400.0",
    "geist": "^1.3.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

- [ ] **Run `npm install`**

Run: `npm install`
Expected: node_modules created, lockfile generated.

- [ ] **Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Create `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Create `postcss.config.mjs`**

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

- [ ] **Create `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: #0a0a0a;
    --foreground: #fafafa;
    --muted: #a1a1aa;
    --border: #27272a;
    --card: #18181b;
    --card-hover: #27272a;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #27272a transparent;
  }

  ::selection {
    background: #10b981;
    color: #0a0a0a;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

- [ ] **Create `lib/utils.ts`**

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Create `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevOps Platform — Ship Faster. Break Less. Own Your Infrastructure.",
  description:
    "Integrated CI/CD, monitoring, and infrastructure platform for modern engineering teams. Get started free.",
  openGraph: {
    title: "DevOps Platform",
    description:
      "Integrated CI/CD, monitoring, and infrastructure for modern teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans bg-[#0a0a0a] text-[#fafafa] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js project with Tailwind, Geist, and deps"
```

---

### Task 2: Create SectionWrapper (scroll-reveal)

**Files:**
- Create: `components/SectionWrapper.tsx`

- [ ] **Create `SectionWrapper.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={reduce ? {} : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn("py-24 md:py-32", className)}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Commit**

```bash
git add -A && git commit -m "feat: add SectionWrapper scroll-reveal component"
```

---

### Task 3: Build Navbar

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Create `Navbar.tsx`**

A floating pill nav with glass-blur. Desktop: logo + 4 links + CTA. Mobile: hamburger that morphs to X with fullscreen overlay and staggered link reveal.

```tsx
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
```

- [ ] **Commit**

```bash
git add -A && git commit -m "feat: add Navbar with floating pill and mobile overlay"
```

---

### Task 4: Build Hero

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Create `Hero.tsx`**

```tsx
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
          className="mt-16 flex items-center justify-center gap-6 text-xs text-[#52525b]"
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
```

- [ ] **Commit**

```bash
git add -A && git commit -m "feat: add Hero section with gradient, badge, CTAs"
```

---

### Task 5: Build LogoBar

**Files:**
- Create: `components/LogoBar.tsx`

- [ ] **Create `LogoBar.tsx`**

```tsx
export function LogoBar() {
  const logos = [
    { name: "GitHub", slug: "github" },
    { name: "GitLab", slug: "gitlab" },
    { name: "AWS", slug: "amazonwebservices" },
    { name: "Google Cloud", slug: "googlecloud" },
    { name: "Azure", slug: "microsoftazure" },
    { name: "Kubernetes", slug: "kubernetes" },
    { name: "Docker", slug: "docker" },
    { name: "Terraform", slug: "terraform" },
  ];

  return (
    <section className="py-16 border-t border-[#27272a]">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-center text-xs text-[#52525b] font-mono uppercase tracking-widest mb-8">
          Trusted by engineering teams
        </p>
        <div className="overflow-hidden">
          <div className="flex gap-12 items-center animate-marquee w-max">
            {[...logos, ...logos].map((logo, i) => (
              <img
                key={`${logo.slug}-${i}`}
                src={`https://cdn.simpleicons.org/${logo.slug}/a1a1aa`}
                alt={logo.name}
                className="h-6 md:h-7 opacity-50 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Commit**

```bash
git add -A && git commit -m "feat: add LogoBar with marquee social proof"
```

---

### Task 6: Build Features

**Files:**
- Create: `components/Features.tsx`

- [ ] **Create `Features.tsx`**

```tsx
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
```

- [ ] **Commit**

```bash
git add -A && git commit -m "feat: add Features section with asymmetric bento grid"
```

---

### Task 7: Build HowItWorks

**Files:**
- Create: `components/HowItWorks.tsx`

- [ ] **Create `HowItWorks.tsx`**

```tsx
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
```

- [ ] **Commit**

```bash
git add -A && git commit -m "feat: add HowItWorks with 3-step timeline"
```

---

### Task 8: Build Integrations

**Files:**
- Create: `components/Integrations.tsx`

- [ ] **Create `Integrations.tsx`**

```tsx
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
                src={`https://cdn.simpleicons.org/${item.slug}/a1a1aa`}
                alt={item.name}
                className="h-6 md:h-7 opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110"
              />
              <span className="text-xs text-[#52525b] group-hover:text-[#a1a1aa] transition-colors">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Commit**

```bash
git add -A && git commit -m "feat: add Integrations grid with partner logos"
```

---

### Task 9: Build Testimonials

**Files:**
- Create: `components/Testimonials.tsx`

- [ ] **Create `Testimonials.tsx`**

```tsx
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
                  <span className="block text-xs text-[#52525b]">
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
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-brand-500 w-6" : "bg-[#27272a]"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
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
```

- [ ] **Commit**

```bash
git add -A && git commit -m "feat: add Testimonials carousel with auto-advance"
```

---

### Task 10: Build Pricing

**Files:**
- Create: `components/Pricing.tsx`

- [ ] **Create `Pricing.tsx`**

```tsx
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
                    <span className="text-sm text-[#52525b]">{tier.period}</span>
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
```

- [ ] **Commit**

```bash
git add -A && git commit -m "feat: add Pricing section with 3 tiers"
```

---

### Task 11: Build CTA Banner + Footer

**Files:**
- Create: `components/CtaBanner.tsx`
- Create: `components/Footer.tsx`

- [ ] **Create `CtaBanner.tsx`**

```tsx
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
```

- [ ] **Create `Footer.tsx`**

```tsx
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
            <p className="text-xs text-[#52525b] leading-relaxed max-w-xs">
              One platform for CI/CD, monitoring, and infrastructure.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-[#52525b] hover:text-[#a1a1aa] transition-colors"
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
          <p className="text-xs text-[#52525b]">
            &copy; 2026 DevOps Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Subscribe to updates"
                className="px-3 py-1.5 rounded-full bg-[#18181b] border border-[#27272a] text-xs text-[#fafafa] placeholder:text-[#52525b] focus:outline-none focus:border-brand-500/50 w-48"
              />
              <button className="p-1.5 rounded-full bg-brand-500 text-black hover:bg-brand-400 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Commit**

```bash
git add -A && git commit -m "feat: add CTA Banner and Footer"
```

---

### Task 12: Assemble page

**Files:**
- Create: `app/page.tsx`

- [ ] **Create `app/page.tsx`**

```tsx
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoBar } from "@/components/LogoBar";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Integrations } from "@/components/Integrations";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LogoBar />
      <Features />
      <HowItWorks />
      <Integrations />
      <Testimonials />
      <Pricing />
      <CtaBanner />
      <Footer />
    </main>
  );
}
```

- [ ] **Run dev server to verify**

Run: `npm run dev`
Expected: dev server starts, page renders all sections at localhost:3000

- [ ] **Commit**

```bash
git add -A && git commit -m "feat: assemble all sections into landing page"
```

---

### Task 13: Build & Lighthouse audit

**Files:** None (verification only)

- [ ] **Build production bundle**

Run: `npm run build`
Expected: Build succeeds, no errors.

- [ ] **Run Lighthouse audit** (start dev server first)

Run the dev server in background, open Chrome DevTools Lighthouse, audit the page.
Target: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90, Best Practices ≥ 90.

---

### Spec Coverage Check

| Spec section | Task(s) |
|---|---|
| Hero (headline, subhead, CTA, visual) | Task 4 |
| Features (3 cards, icons) | Task 6 |
| Integrations (logo grid) | Task 8 |
| Testimonials (carousel card) | Task 9 |
| Pricing (3 tier) | Task 10 |
| Footer (4-column + newsletter) | Task 11 |
| Navbar (floating pill + mobile) | Task 3 |
| How It Works (3 step timeline) | Task 7 |
| Trusted by / Logo bar | Task 5 |
| CTA Banner | Task 11 |
| Responsive design (all sections) | Tasks 3-11 (mobile collapse built-in) |
| SEO (metadata) | Task 1 (layout.tsx) |
| Motion/animations | Tasks 2-11 (scroll-reveal + micro-interactions) |
