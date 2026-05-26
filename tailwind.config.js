/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#080c10',
          darker: '#040608',
          card: 'rgba(8, 12, 16, 0.75)',
          accent: '#00d4aa',
          neon: '#00ffc8',
          border: 'rgba(0, 212, 170, 0.2)',
          muted: 'rgba(0, 212, 170, 0.5)',
          red: '#ff3e3e',
          text: '#c9d1d9',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'grid-scroll': 'gridScroll 30s linear infinite',
        'text-blink': 'textBlink 1s step-end infinite',
        'border-flow': 'borderFlow 4s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 212, 170, 0.2), inset 0 0 5px rgba(0, 212, 170, 0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 212, 170, 0.6), inset 0 0 10px rgba(0, 212, 170, 0.3)' },
        },
        gridScroll: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        textBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        borderFlow: {
          '0%': { borderImageSource: 'linear-gradient(to right, #00d4aa, #00ffc8)' },
          '50%': { borderImageSource: 'linear-gradient(to bottom, #00ffc8, #00d4aa)' },
          '100%': { borderImageSource: 'linear-gradient(to right, #00d4aa, #00ffc8)' },
        }
      },
      backdropBlur: {
        cyber: '12px',
      }
    },
  },
  plugins: [],
}
