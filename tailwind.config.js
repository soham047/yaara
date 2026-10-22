/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pearl: '#FDFBF7',
        oat: '#F7F3EE',
        espresso: '#1E1E1E',
        clay: {
          DEFAULT: '#C86D51',
          light: '#D8927B',
          dark: '#A8543D',
        },
        sage: {
          DEFAULT: '#7E8D78',
          light: '#A0AC9B',
          dark: '#5F6E5A',
        },
        linen: '#E8E2D9',
        gold: '#D4AF37',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-80px) scale(0.6)', opacity: '0' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        floatUp: 'floatUp 0.6s ease-out forwards',
        pulseSoft: 'pulseSoft 0.3s ease-in-out',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
