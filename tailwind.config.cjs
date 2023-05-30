/** @type {string[]} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lao: ["NotoSan-Lao", "sans-serif"],
      },
      gridTemplateColumns: {
        sell: "max-content 1fr",
        products: "repeat(auto-fill, minmax(10rem, 1fr))",
      },
      gridTemplateRows: {
        layout: "1fr min-content",
      },
      minWidth: {
        bill: "25rem",
      },
      animation: {
        loader: "loader 0.6s infinite alternate",
      },
      keyframes: {
        loader: {
          to: {
            opacity: 0.1,
            transform: "translate3d(0, -1rem, 0)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
    scrollbar: ["rounded"],
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
}
