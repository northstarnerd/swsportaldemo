/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sws: {
          red: "#7A1900",
          darkred: "#581200",
          lightred: "#FDF2F0",
          accent: "#C53030",
          gray: "#F4F6F8",
          dark: "#1A202C",
        },
      },
    },
  },
  plugins: [],
};
