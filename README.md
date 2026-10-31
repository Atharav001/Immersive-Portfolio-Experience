# Immersive Portfolio Experience (Wispr Flow Challenge)

An interactive portfolio experience created for the **Wispr Flow Challenge**. Designed to tell an authentic story through voice-driven ideas, high animations, and creative web craft.

## ✨ Features Built (Phase 1)

- **Exact Replica of the Redoyanul Haque Capsule Loader:**
  - Interactive pill/capsule container with dynamic cursor-following purple radial spotlight (`#a87cff`).
  - Smooth loading percentage count (`0%` to `100%`) with retro blinking terminal cursor box.
  - Collapse transition: at 100%, the loading counter collapses down to 0 width, smoothly revealing the uppercase **`WELCOME`** greeting.
  - Iris Zoom Reveal: triggers an expansive `min-width: calc(100vw + 5000px); min-height: calc(100vh + 500px); border-radius: 5000px;` animation with smooth cubic-bezier easing (`cubic-bezier(.33, .11, .15, 1)`) that opens into the homepage.
  - Retro Header Widget: animated jumping ball that bounces rhythmically over obstacle lines.
  - Typographic Marquee: infinite moving background ticker running behind the loader.
  - Quick Replay Button: test or watch the capsule sequence anytime without hard-refreshing.
- **Story Architecture (Wispr Flow Brief):**
  - Voice Frequency Wave Visualizer reflecting audio input.
  - Four Core Story Pillars: *The Chances I Took*, *The Mistakes I Learned From*, *What I Care About*, *How I Think*.
  - Flexible modular architecture ready for additional interactive 3D/video elements.

## 🛠 Tech Stack

- **Framework**: Vite + React
- **Styling**: Tailwind CSS + Custom High-Performance Keyframe Engine
- **Icons**: Lucide React
- **Animation Capabilities**: Framer Motion, Canvas, ready for Three.js / WebGL / Spline
- **Deployability**: 100% portable, works seamlessly with Emergent, Vercel, Netlify, and GitHub Pages.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```
