/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'neutral': {
          0: '#ffffff',
          50: '#f4f4f6',
          100: '#e9eaec',
          200: '#d1d4db',
          300: '#9096a2',
          400: '#4d566b',
          500: '#202c46',
          600: '#1b253c',
        },
        'red': {
          100: '#fce9ec',
          200: '#f9d2d9',
          300: '#f2a6b4',
          400: '#e9677f',
          500: '#df2648',
          600: '#b71f3b',
        },
        'dark-red': '#780000',
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#f43f5e'
      },
    },
  },
  plugins: [],
}
