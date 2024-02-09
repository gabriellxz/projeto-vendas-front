/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jura: ['Jura', 'sans-serif']
      },
      backgroundImage: {
        "image-home-1": "url('/public/imagem-home-1.jpeg')"
      }
    },
  },
  plugins: [],
}