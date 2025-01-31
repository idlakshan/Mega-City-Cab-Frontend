/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        ring: "ring 1.2s infinite ease-in-out",
      },
      keyframes: {
        ring: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "15%": { transform: "rotate(5deg)" },
          "30%": { transform: "rotate(-5deg)" },
          "45%": { transform: "rotate(5deg)" },
          "60%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(3deg)" },
        
        },
      },

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

