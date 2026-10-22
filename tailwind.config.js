/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdbff',
          300: '#8ec4ff',
          400: '#59a3ff',
          500: '#3380ff',
          600: '#1d60f5',
          700: '#164ae0',
          800: '#183cb5',
          900: '#1a3790',
          950: '#0b1c52',
        },
      },
      boxShadow: {
        'glow': '0 0 60px -15px rgba(51, 128, 255, 0.45)',
        'glow-lg': '0 0 90px -10px rgba(51, 128, 255, 0.55)',
        'card': '0 20px 50px -20px rgba(11, 28, 82, 0.25)',
        'card-dark': '0 30px 60px -25px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
