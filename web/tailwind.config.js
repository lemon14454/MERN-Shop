module.exports = {
  purge: ["./src/**/.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        text: "1E1E1E",
        main: "#07b53b",
        bg: "#f7f8f9",
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
