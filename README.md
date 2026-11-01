# Immersive Portfolio Experience — Atharav Narang

A creative developer portfolio experience created for the **Wispr Flow Challenge**, featuring exact physics-driven liquid text distortion, signature morphing navigation, and luxury contact architecture.

## ✨ Implemented Elements (Phase 2)

- **Snappy Capsule Loader:**
  - Fast, accelerated loading sequence (~1.2s total) with retro blinking cursor.
  - Smooth collapse transition into `"WELCOME"` and rapid iris-zoom reveal into the homepage.
  - Retro bouncing ball widget and typographic moving marquee.
- **Top Navigation Header (Signature Hover Morph):**
  - Custom rotating geometric emblem (`transform: rotate(360deg)` on hover).
  - Sliding name mask: hovering smoothly translates `"Atharav Narang"` to reveal `"• with ❤"` with exact cubic-bezier easing (`cubic-bezier(0.76, 0, 0.24, 1)`).
  - Live availability badge (`AVAILABLE NOW FOR WORK`).
  - Rolling text-swap navigation links (`Home`, `About`, `Contact`).
  - Instant Replay Loader button.
- **Monumental Hero Section (Cursor-Reactive Liquid Distortion):**
  - Transparent outlined job title (`CREATIVE DEVELOPER`) with 1.5px white stroke.
  - Monumental condensed bold typography (`ATHARAV NARANG`) with cursor-reactive liquid distortion physics.
  - Real-time `FluidCanvas` calculating velocity, curl, swirl, and dissipation ripples as the cursor moves across the screen.
- **Luxury Get In Touch / Contact Section:**
  - Curved silhouette card (`rounded-t-[36px] sm:rounded-t-[48px]`) with `backdrop-filter: blur(50px)` and ambient glow.
  - Monogram avatar badge + outlined heading: `LET'S BUILD YOUR IDEA TOGETHER :)`.
  - Interactive project / message inquiry form.
  - Direct contact details with one-click clipboard copy for `atharavnarang@gmail.com`.
  - Social media links (GitHub, LinkedIn, Twitter/X, Wispr Flow Story) with rolling text-swap hover animations.

## 🛠 Tech Stack

- **Framework**: Vite + React
- **Styling**: Tailwind CSS + Custom CSS Keyframes & Cubic-Bezier Engine
- **Motion & Fluid**: Real-Time Fluid Simulation Canvas + Character Vector Displacement
- **Icons**: Lucide React
- **Deployability**: 100% portable for Emergent, Vercel, Netlify, and GitHub Pages.

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Production build
npm run build
```
