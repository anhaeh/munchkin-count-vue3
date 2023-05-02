/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          300: '#816e65',
          500: '#816e65',
          700: '#65534b',
          800: '#59473f',
          900: '#574237'
        },
        'secondary': {
          100: '#e5deda',
          300: '#d9cfc9',
          500: '#c9b8a1',
          700: '#fdd397'
        }
      },
    },
  },
  plugins: [],
}
