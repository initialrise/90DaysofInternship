/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#243A66",
        secondary: "#3173B0",
        // foundationgray: "#F7F8F8",
        // foundationwhite: "#FCFBFB",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        merri: ["Merriweather", "sans-serif"],
      },
    },
  },
  plugins: [],
};
