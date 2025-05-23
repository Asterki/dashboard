/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust to your source files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

