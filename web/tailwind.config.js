module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/.html", "./src/**/*.{js,jsx,ts,tsx}"],
  },
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: "#09B53C",
        "light-red": "#fc5e44",
        bg: "#F5F4F7",
      },
      fontFamily: {
        inter: ["Noto Sans TC", "Inter", "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
