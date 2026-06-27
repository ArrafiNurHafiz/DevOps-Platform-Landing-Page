# Design Spec — DevOps Platform Landing Page

> Based on PRD `PRD-DevOps-Platform-Landing-Page.md` · Approved via brainstorming

## 1. Design Direction

**Read:** B2B SaaS landing for technical buyers (DevOps engineers, Tech Leads, CTOs), with a premium-dark-tech language.

| Dial | Value |
|---|---|
| DESIGN_VARIANCE | 7 |
| MOTION_INTENSITY | 6 |
| VISUAL_DENSITY | 4 |

**Theme:** Dark mode (`#0a0a0a` base), emerald/cyan accent, Geist font (sans) + Geist Mono (code elements). High contrast, precise typography, terminal-inspired visuals without literal terminal UI.

## 2. Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS v3/v4
- **Animation:** Motion (formerly Framer Motion) — scroll-reveal via `whileInView`, staggered entries, magnetic button physics
- **Icons:** Lucide React (as specified in PRD)
- **Fonts:** Geist via `next/font`
- **SEO:** next-seo

## 3. Page Sections (Flow)

### 3.1 Navigation
- Floating pill nav, glass-blur (`backdrop-blur-xl`), `mt-4 mx-auto w-max`
- Desktop: Logo + (Product, Features, Pricing, Docs) + "Get Started" CTA
- Mobile: hamburger → fullscreen overlay with staggered link reveal
- Max 80px height, single-line on desktop

### 3.2 Hero
- Full `min-h-[100dvh]`, dark radial gradient background
- Eyebrow badge: "Now in Public Beta" (small pill)
- Headline: "Ship Faster. Break Less. Own Your Infrastructure." (max 2 lines)
- Subhead: ≤ 20 words, max 4 lines
- 2 CTAs: "Start Free Trial" (primary emerald) + "Watch Demo" (ghost)
- Right side: abstract visual (geometric mesh/glow, no fake terminal divs)
- Bottom: "Trusted by" logo strip (separate section, not inside hero)

### 3.3 Logo Bar (Social Proof)
- Light divider from hero
- Row of real SVG logos (Simple Icons CDN or inline SVGs)
- Auto-scroll marquee on mobile

### 3.4 Features (Asymmetric Bento)
- 3 items in a non-uniform grid: CI/CD (col-span-2), Monitoring (col-span-1), Infrastructure as Code (col-span-1)
- Each card: icon + title + description + subtle hover lift (`translate-y-[-4px]`)
- Glass-card aesthetic with double-bezel (outer shell + inner core)

### 3.5 How It Works
- 3-step horizontal timeline: Connect → Deploy → Monitor
- Connected by a continuous line/glow path
- Each step: numbered circle + icon + title + description

### 3.6 Integrations
- Grid of partner logos with hover scale + glow
- Logos: GitHub, GitLab, AWS, GCP, Azure
- Tooltip or subtle label on hover

### 3.7 Testimonials
- Horizontal carousel/card stack
- Each card: avatar + name + role + company + quote (max 3 lines)
- Auto-advance + manual dots

### 3.8 Pricing
- 3 cards: Free / Pro ($29/user/mo) / Enterprise (Contact Sales)
- Pro card highlighted (scale: 1.05, accent border)
- Feature list per tier, CTA per card

### 3.9 CTA Banner
- Full-width dark section, subtle gradient
- Headline + single "Get Started Free" CTA

### 3.10 Footer
- 4-column grid: Product, Resources, Company, Legal
- Newsletter email input + submit
- Bottom bar: copyright + social icons

## 4. Motion Plan
- **Hero:** fade-up stagger (eyebrow → headline → subhead → CTAs → visual)
- **Features/Steps:** `whileInView` stagger reveal, `y: 32` → `y: 0`, `opacity: 0` → `1`
- **Testimonials:** auto-carousel, draggable
- **Pricing:** hover lift on cards, scale on recommended tier
- **Nav:** mobile hamburger → morph-to-X + fullscreen staggered menu
- **CTA buttons:** `scale-[0.98]` on active, icon-in-button nested pattern
- **Reduced motion:** `useReducedMotion()` collapses all to static

## 5. Performance Targets
- Lighthouse ≥ 90 (Performance, Accessibility, SEO, Best Practices)
- LCP < 2.5s (hero text preloaded)
- CLS < 0.1 (reserve space for all images/visuals)
- All animations on `transform`/`opacity` only

## 6. Breakpoints
- 320px (mobile) — single column, full width
- 768px (tablet) — 2-column grid for features
- 1024px+ (desktop) — full multi-column layout

## 7. Out of Scope (v1)
- Blog / resource center
- Interactive pricing calculator
- Authentication / dashboard
- Documentation pages
- Multi-language support
