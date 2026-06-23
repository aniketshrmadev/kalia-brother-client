/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kalia: {
          bg: '#0A0A0A',
          card: '#141414',
          border: '#2A2A2A',
          gold: '#C9A84C',
          offwhite: '#F5F0E8',
          muted: '#888888',
          neon: '#00FF88',
          pink: '#FF2D78',
          purple: '#A855F7',
          cyan: '#06B6D4',
        }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'gradient-shift': 'gradientShift 5s ease infinite',
        'text-shimmer': 'textShimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(201, 168, 76, 0.6), 0 0 80px rgba(201, 168, 76, 0.2)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseNeon: {
          '0%, 100%': { textShadow: '0 0 10px rgba(201, 168, 76, 0.5), 0 0 20px rgba(201, 168, 76, 0.3)' },
          '50%': { textShadow: '0 0 20px rgba(201, 168, 76, 0.8), 0 0 40px rgba(201, 168, 76, 0.5), 0 0 60px rgba(201, 168, 76, 0.2)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
    },
  },
  plugins: [],
};
