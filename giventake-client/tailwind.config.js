/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandNavy: '#425B9A',
        brandSky: '#76C0EC',
        brandCream: '#FFF6DC',
        brandPink: '#FF95A5',
      },
    },
  },
  plugins: [],
}