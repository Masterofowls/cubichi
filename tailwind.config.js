/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        sky: {
          50: "#fbf7ef",
          100: "#f4ead5",
          200: "#ead4a6",
          400: "#d49a70",
          500: "#bf704f",
          600: "#a75037",
          700: "#763b2b",
          800: "#572f25",
          900: "#3b241f",
        },
      },
    },
  },
  plugins: [],
};
