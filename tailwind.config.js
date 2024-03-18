/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        "screen-50": "50vh",
      },
      margin: {
        6.25: "25px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
