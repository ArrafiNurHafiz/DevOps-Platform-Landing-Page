# DevOps Platform Landing Page

A premium dark-tech landing page for a DevOps platform. Built with Next.js 14, TypeScript, Tailwind CSS, and Motion.

## Sections

- **Navbar** — floating glass-blur navigation with smooth scroll
- **Hero** — animated headline, subtitle, dual CTA buttons
- **LogoBar** — scrolling marquee of partner logos (GitHub, AWS, Azure, Google Cloud, Docker, Kubernetes, Terraform, GitLab)
- **Features** — asymmetric bento grid (CI/CD spans 2 columns)
- **How It Works** — 3-step numbered flow with connecting lines
- **Integrations** — 12 tool cards with hover scale effect
- **Testimonials** — auto-carousel with manual dot navigation
- **Pricing** — 3-tier cards with feature lists, CTA per tier
- **CTA Banner** — final conversion section
- **Footer** — 4-column link grid, copyright

## Design

- **Theme**: dark (`#0a0a0a` background)
- **Accent**: emerald (`#10b981`)
- **Text**: `#a1a1aa` body, `#7a7a82` muted (WCAG AA 4.5:1 on dark)
- **Fonts**: Geist Sans + Geist Mono via `next/font`
- **Animations**: scroll-reveal via Motion, `prefers-reduced-motion` respected

## Stack

| Tool | Purpose |
|---|---|
| Next.js 14 | App Router, static export |
| TypeScript | types |
| Tailwind CSS | utility-first styling |
| Motion | scroll / hover animations |
| Lucide | icons |
| Geist | typeface |

## Quick Start

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```sh
npm run build
npm run start
```

## Lint

```sh
npm run lint
```
