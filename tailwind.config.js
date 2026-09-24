/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sandstone: {
          50: '#FCF9F4',
          100: '#FAF7F2',
          200: '#F3ECE2',
          300: '#E5E2DD',
          400: '#DCC1B7',
          500: '#B8592E',
          600: '#984118',
          700: '#755848',
          800: '#3D2619',
          900: '#1F1B18',
        },
        terracotta: {
          DEFAULT: '#B8592E',
          deep: '#984118',
          dark: '#7D2D03',
          light: '#FFB598',
          soft: '#FFDBCE',
        },
        umber: {
          DEFAULT: '#3D2619',
          light: '#755848',
          dim: '#2B160B',
          dark: '#1F1B18',
          border: '#DCC1B7',
        },
        gold: {
          DEFAULT: '#C59B27',
          dark: '#735800',
          deep: '#926F00',
          light: '#FFDF98',
          glow: 'rgba(197, 155, 39, 0.28)',
        },
        canvas: {
          DEFAULT: '#FAF7F2',
          surface: '#FCF9F4',
          card: '#F3ECE2',
          container: '#F0EDE9',
          dim: '#DCDAD5',
        },
        basalt: {
          DEFAULT: '#1F1B18',
          charcoal: '#1C1C19',
          muted: '#56433B',
          subtle: '#89726A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        kannada: ['"Anek Kannada"', '"Noto Sans Kannada"', 'sans-serif'],
        'kannada-serif': ['"Noto Serif Kannada"', '"Tiro Kannada"', 'serif'],
        'kannada-classical': ['"Tiro Kannada"', '"Noto Serif Kannada"', 'serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(61, 38, 25, 0.05)',
        'warm-md': '0 4px 20px rgba(61, 38, 25, 0.08)',
        'warm-lg': '0 12px 32px rgba(61, 38, 25, 0.12)',
        'ai-bloom': '0 0 16px rgba(197, 155, 39, 0.35)',
        'terracotta-glow': '0 4px 16px rgba(184, 89, 46, 0.3)',
      },
      borderRadius: {
        'stone': '0.375rem',
        'chisel': '0.5rem',
        'pill': '9999px',
      },
      animation: {
        'scan-laser': 'laserScan 2.4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        laserScan: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.9' },
          '50%': { transform: 'translateY(100%)', opacity: '0.4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
