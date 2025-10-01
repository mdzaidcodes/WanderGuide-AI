/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Blue theme with different shades
        primary: {
          50: '#E6F1FF',
          100: '#CCE3FF',
          200: '#99C7FF',
          300: '#66AAFF',
          400: '#338EFF',
          500: '#0072FF',
          600: '#005BCC',
          700: '#004499',
          800: '#002E66',
          900: '#001733',
        },
        secondary: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#B8DCFF',
          300: '#8FC9FF',
          400: '#66B6FF',
          500: '#3DA3FF',
          600: '#0F82E5',
          700: '#0B62B0',
          800: '#08437A',
          900: '#042445',
        },
        accent: {
          50: '#EBF8FF',
          100: '#D6F1FF',
          200: '#ADE3FF',
          300: '#85D5FF',
          400: '#5CC7FF',
          500: '#33B9FF',
          600: '#0A9FE8',
          700: '#0877B0',
          800: '#055078',
          900: '#032840',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'blue-sm': '0 2px 4px rgba(0, 114, 255, 0.1)',
        'blue-md': '0 4px 6px rgba(0, 114, 255, 0.15)',
        'blue-lg': '0 10px 15px rgba(0, 114, 255, 0.2)',
        'blue-xl': '0 20px 25px rgba(0, 114, 255, 0.25)',
      },
    },
  },
  plugins: [],
}


