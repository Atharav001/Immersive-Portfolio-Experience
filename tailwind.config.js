/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        august: ['Bebas Neue', 'Anton', 'Impact', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        sans: ['Geist', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        canvas: '#eae5ec',
        dark: {
          DEFAULT: '#0a0a0a',
          card: '#141516',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        brand: {
          purple: '#a87cff',
          deep: '#321469',
          light: '#f0f1fa',
          green: '#219653',
        }
      }
    },
  },
  plugins: [],
}
