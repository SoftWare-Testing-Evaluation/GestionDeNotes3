/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#990000',
        secondary: '#F26100',
        bg: '#F2F2F2',
        white: '#FFFFFF',
        black: '#000000',
        red: '#cb1313',
        green: '#00B517'
      },
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio")
  ],
};