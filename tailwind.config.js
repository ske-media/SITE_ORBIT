/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Neon/Holographic inspired color palette
        neon: {
          purple: '#b026ff',
          blue: '#2f73ff',
          cyan: '#05d9e8',
          pink: '#ff3864',
          green: '#36f9c5',
          yellow: '#ffe53b',
        },
        // Dark background shades
        dark: {
          100: '#202124',
          200: '#18181b',
          300: '#111113',
          400: '#0c0c0e',
          500: '#070709',
          900: '#030304',
        },
        // Surface colors for UI elements
        surface: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#b4b4b4',
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#5a5a5a',
          900: '#4e4e4e',
          950: '#121212',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'noise': 'noise 0.5s steps(1) infinite',
        'scanning': 'scanning 8s ease-in-out infinite',
        'scanning-reverse': 'scanning-reverse 8s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'fade-in': 'fade-in 1.5s ease-out forwards',
        'scale-fade-in': 'scale-fade-in 0.5s ease-out forwards',
        'tracking-in': 'tracking-in 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'slide-down': 'slide-down 0.5s ease-out forwards',
        'slide-right': 'slide-right 0.5s ease-out forwards',
        'slide-left': 'slide-left 0.5s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow': {
          '0%, 100%': { 
            textShadow: '0 0 5px rgba(176, 38, 255, 0.5), 0 0 15px rgba(176, 38, 255, 0.3), 0 0 25px rgba(176, 38, 255, 0.2)',
            boxShadow: '0 0 5px rgba(176, 38, 255, 0.5), 0 0 15px rgba(176, 38, 255, 0.3), 0 0 25px rgba(176, 38, 255, 0.2)',
          },
          '50%': { 
            textShadow: '0 0 10px rgba(176, 38, 255, 0.7), 0 0 20px rgba(176, 38, 255, 0.5), 0 0 30px rgba(176, 38, 255, 0.3)',
            boxShadow: '0 0 10px rgba(176, 38, 255, 0.7), 0 0 20px rgba(176, 38, 255, 0.5), 0 0 30px rgba(176, 38, 255, 0.3)',
          },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'noise': {
          '0%, 100%': { backgroundPosition: '0 0' },
          '10%': { backgroundPosition: '-5% -10%' },
          '20%': { backgroundPosition: '-15% 5%' },
          '30%': { backgroundPosition: '7% -25%' },
          '40%': { backgroundPosition: '-5% 25%' },
          '50%': { backgroundPosition: '-15% 10%' },
          '60%': { backgroundPosition: '15% 0%' },
          '70%': { backgroundPosition: '0% 15%' },
          '80%': { backgroundPosition: '3% 35%' },
          '90%': { backgroundPosition: '-10% 10%' },
        },
        'scanning': {
          '0%': { transform: 'translateY(-100%)' },
          '15%, 85%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'scanning-reverse': {
          '0%': { transform: 'translateY(100%)' },
          '15%, 85%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'scale-fade-in': {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'tracking-in': {
          '0%': { 
            'letter-spacing': '0.5em',
            opacity: 0,
          },
          '40%': {
            opacity: 0.6,
          },
          '100%': {
            'letter-spacing': 'normal',
            opacity: 1,
          },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'slide-left': {
          '0%': { transform: 'translateX(20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(176, 38, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(176, 38, 255, 0.2) 1px, transparent 1px)',
        'diagonal-lines': 'repeating-linear-gradient(-45deg, rgba(176, 38, 255, 0.1), rgba(176, 38, 255, 0.1) 1px, transparent 1px, transparent 6px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'dots': "radial-gradient(rgba(176, 38, 255, 0.2) 2px, transparent 2px)",
        'glitch': "url('/images/glitch-texture.png')",
      },
      backgroundSize: {
        'grid': '25px 25px',
        'dots': '20px 20px',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(176, 38, 255, 0.5), 0 0 20px rgba(176, 38, 255, 0.3)',
        'neon-strong': '0 0 5px rgba(176, 38, 255, 0.8), 0 0 15px rgba(176, 38, 255, 0.5), 0 0 30px rgba(176, 38, 255, 0.3)',
        'neon-blue': '0 0 10px rgba(47, 115, 255, 0.5), 0 0 20px rgba(47, 115, 255, 0.3)',
        'neon-cyan': '0 0 10px rgba(5, 217, 232, 0.5), 0 0 20px rgba(5, 217, 232, 0.3)',
      },
      textShadow: {
        'neon': '0 0 5px rgba(176, 38, 255, 0.7), 0 0 10px rgba(176, 38, 255, 0.5)',
        'neon-strong': '0 0 10px #b026ff, 0 0 20px rgba(176, 38, 255, 0.8), 0 0 30px rgba(176, 38, 255, 0.6)',
        'neon-blue': '0 0 5px rgba(47, 115, 255, 0.7), 0 0 10px rgba(47, 115, 255, 0.5)',
        'neon-cyan': '0 0 5px rgba(5, 217, 232, 0.7), 0 0 10px rgba(5, 217, 232, 0.5)',
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray.300'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.gray.300'),
            '--tw-prose-links': theme('colors.neon.purple'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray.400'),
            '--tw-prose-bullets': theme('colors.gray.400'),
            '--tw-prose-hr': theme('colors.gray.700'),
            '--tw-prose-quotes': theme('colors.white'),
            '--tw-prose-quote-borders': theme('colors.neon.purple'),
            '--tw-prose-captions': theme('colors.gray.400'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.gray.200'),
            '--tw-prose-pre-bg': theme('colors.dark.200'),
            '--tw-prose-th-borders': theme('colors.gray.700'),
            '--tw-prose-td-borders': theme('colors.gray.800'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-neon': {
          textShadow: '0 0 5px rgba(176, 38, 255, 0.7), 0 0 10px rgba(176, 38, 255, 0.5)',
        },
        '.text-shadow-neon-strong': {
          textShadow: '0 0 10px #b026ff, 0 0 20px rgba(176, 38, 255, 0.8), 0 0 30px rgba(176, 38, 255, 0.6)',
        },
        '.text-shadow-neon-blue': {
          textShadow: '0 0 5px rgba(47, 115, 255, 0.7), 0 0 10px rgba(47, 115, 255, 0.5)',
        },
        '.text-shadow-neon-cyan': {
          textShadow: '0 0 5px rgba(5, 217, 232, 0.7), 0 0 10px rgba(5, 217, 232, 0.5)',
        },
        '.text-gradient-purple': {
          background: 'linear-gradient(90deg, #b026ff, #2f73ff)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'text-fill-color': 'transparent',
        },
        '.text-gradient-cyan': {
          background: 'linear-gradient(90deg, #05d9e8, #36f9c5)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'text-fill-color': 'transparent',
        },
        '.glass-effect': {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(12, 12, 14, 0.6)',
          border: '1px solid rgba(176, 38, 255, 0.1)',
        },
        '.glass-card': {
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(18, 18, 27, 0.4)',
          border: '1px solid rgba(176, 38, 255, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        },
        '.glass-effect-dark': {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(3, 3, 4, 0.8)',
          border: '1px solid rgba(176, 38, 255, 0.05)',
        },
        '.mask-gradient-b': {
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        },
        '.blend-color-dodge': {
          mixBlendMode: 'color-dodge',
        },
        '.blend-overlay': {
          mixBlendMode: 'overlay',
        },
        '.blend-screen': {
          mixBlendMode: 'screen',
        },
        '.blend-difference': {
          mixBlendMode: 'difference',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};