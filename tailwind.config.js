/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'button-gray-background':
          'linear-gradient(98.51deg, #FFFFFF -92.7%, rgba(255, 255, 255, 0.05) 23.72%, rgba(255, 255, 255, 0.09) 68.89%, rgba(255, 255, 255, 0.07) 100%)',
        'button-bg': 'linear-gradient(180deg, #EA9000 0%, #C16201 100%)',
        'button-green-background':
          'linear-gradient(179.21deg, #0FA40D 0.61%, #006300 83.91%)',
        'vip-background':
          'radial-gradient(128.27% 437.03% at 93.88% -18.38%, rgba(11, 24, 54, 0.5) 0%, rgba(2, 17, 53, 0.5) 29.74%, rgba(13, 30, 68, 0.5) 50.97%, rgba(1, 14, 44, 0.5) 100%)',
        'progress-bar-inducator':
          'linear-gradient(180deg, #EA9000 0%, #C16201 100%)',
        'buy-blue-background':
          ' linear-gradient(180deg, #006FFD 0%, #004297 100%)',
        'select-button-background':
          'linear-gradient(180deg, rgba(234, 144, 0, 0) 0%, rgba(234, 144, 0, 0.5) 100%)',
        'vip-capsule-background':
          'linear-gradient(180deg, #041D57 0%, #21213B 100%)',
        'border-gradient': 'linear-gradient(180deg, #52a862 0%, #815e0e 100%)',
        'vip-button-background':
          'linear-gradient(180deg, #161F45 0%, #1F203D 100%)',
        'custom-popover-gradient':
          'linear-gradient(180deg, #1B2846 0%, #061D54 42.08%, #0B1836 100%)',
        'blue-gradient':
          'linear-gradient(97.58deg, #051D55 -70.97%, #030F2D 206.59%)',
        'leaderboard-background':
          'linear-gradient(180deg, #162A59 0%, #010E2C 100%)',
        'daily-bonus-background': 'var(--daily-bonus-background)',
        'day-background': 'var(--day-background)',
        'day-text-background': 'var(--day-text-background)',
        'next-day-text-background': 'var(--next-day-text-background)',
        'claim-button-background': 'var(--claim-button-background)',
        'popup-pkg-background': 'var(--popup-pkg-background)',
        'confirm-overlay': 'var(--confirm-overlay-background)',
        'confirm-danger': 'var(--confirm-danger-background)',
        'confirm-success': 'var(--confirm-success-background)',
        'popup-close-btn': 'var(--popup-close-btn-background)',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        khand: ['Khand', 'sans-serif'],
        lexend: ['lexend', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        dmSans: ['DM Sans', 'sans-serif'],
        carter: ['Carter One', 'cursive'],
      },
      screens: {
        sm: '533px',
        md: '768px',
      },
      transitionProperty: {
        height: 'height',
        opacity: 'opacity',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        vipPopupText: 'var(--vip-popup-text)',
        rewardsBackground: 'var(--rewards-background)',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      boxShadow: {
        'claim-btn': 'var(--claim-button-shadow)',
        'claim-btn-active': 'var(--claim-button-shadow-active)',
        'popup-ring': '0 0 0 2px #f6d860, 0 0 24px 2px #0ea5e938, 0 14px 40px rgba(0,0,0,0.8)',
        'confirm-icon': '0 0 0 3px #f6d860, 0 4px 16px rgba(0,0,0,0.6)',
        'confirm-btn': '0 2px 10px rgba(0,0,0,0.5)',
        'close-btn': '0 0 0 2px #f6d860, 0 2px 10px rgba(0,0,0,0.7)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        glowYellow: {
          '0%, 100%': {
            boxShadow:
              '0 0 6px rgba(255,140,0,0.5), 0 0 10px rgba(255,120,0,0.4)',
          },
          '50%': {
            boxShadow:
              '0 0 14px rgba(255,140,0,0.8), 0 0 22px rgba(255,120,0,0.6)',
          },
        },
        glowYellow2: {
          '0%, 100%': {
            boxShadow:
              '0 0 2px rgba(255,140,0,0.3), 0 0 3px rgba(255,120,0,0.2)',
          },
          '50%': {
            boxShadow:
              '0 0 10px rgba(255,140,0,0.8), 0 0 14px rgba(255,120,0,0.6)',
          },
        },

        pulseGlow: {
          '0%,100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.03)',
          },
        },
        pulseGlowInner: {
          '0%,100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(0.95)', 
          },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(-2px) rotate(-5deg)' },
          '20%': { transform: 'translateX(2px) rotate(5deg)' },
          '30%': { transform: 'translateX(-2px) rotate(-5deg)' },
          '40%': { transform: 'translateX(2px) rotate(5deg)' },
          '50%': { transform: 'translateX(0)' },
        }
      },

      animation: {
        shake: 'shake 1.2s ease-in-out infinite',
        glowYellow: 'glowYellow 1.2s ease-in-out infinite',
        glowYellow2: 'glowYellow2 1.2s ease-in-out infinite',
        glowYellowPulse:
          'glowYellow 1.2s ease-in-out infinite, pulseGlow 1.2s ease-in-out infinite',
        glowYellowPulseInner:
          'glowYellow2 1.2s ease-in-out infinite, pulseGlowInner 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
