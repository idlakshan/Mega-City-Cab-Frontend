/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'screen-2xl': '1400px', 
        'screen-xl': '1200px', 
        'screen-lg': '900px', 
      },
      colors: {
        'primary-yellow': '#FCC737',
        'primary-black': "#203145",
        'primary-light': '#EDF1F2',
        'custom-opacity': 'rgba(16, 16, 16, 0.2)',
      }
    },
  },
  plugins: [],
}

