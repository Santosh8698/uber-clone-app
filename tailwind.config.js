/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        uber: {
          black: '#000000',
          white: '#FFFFFF',
          gray: '#F5F5F5',
          green: '#00B14F',
        },
      },
    },
  },
  plugins: [],
}