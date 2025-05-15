/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#050A30",
          deep: "#000C66",
          main: "#0000FF",
          soft: "#7EC8E3"
        }
      }
    },
  },
  plugins: [],
}
