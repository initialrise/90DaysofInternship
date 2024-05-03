/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      josefin: "Josefin Sans",
      jersey: ["'Jersey 15'"],
    },
    backgroundImage: {
      main: "url('/src/assets/images/bg-desktop-dark.jpg')",
    },
    colors: {
      primary: "#e3e5f2",
      secondary: "#64677d",
      todocolor: "#25273c",
    },
    extend: {},
  },
  darkMode: "selector",
  plugins: [],
};
