/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jura: ['Jura', 'sans-serif'],
        kaisei: ['Kaisei Tokumin', 'serif'],
        inter: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        "image-home-1": "url('https://cdn.animaapp.com/projects/654240d39508f20ebb2674a9/releases/65ce35087d06d76c9359e174/img/rectangle-33.png')",
        "image-home-2": "url('https://cdn.animaapp.com/projects/654240d39508f20ebb2674a9/releases/65ce35087d06d76c9359e174/img/rectangle-34.png')",
        "image-home-3": "url('https://cdn.animaapp.com/projects/654240d39508f20ebb2674a9/releases/65ce35087d06d76c9359e174/img/ben-scott-bcnm5p0gcpy-unsplash.png')"
      },
      colors: {
        greenEco:{
          100: "#28a42a",
          200: "#2d4b2f",
          300: "#142215"
        },
        whiteEco: {
          100: "#c7c5c9"
        }
      }
    }
  },
  plugins: [],
}