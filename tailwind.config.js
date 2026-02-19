/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        clicker: ['"Clicker Script"', "cursive"],
        cairo: ['var(--font-cairo)'],     // Cairo من next/font/google
        poppins: ['var(--font-poppins)'], // Poppins من next/font/google
      },
    },
  },
  plugins: [],
};
