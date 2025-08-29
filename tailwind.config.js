/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#030014", // Example primary color
        secondary: "#151312", // Example secondary color
        light:{
          100: "#D6C6FF", // Example light color
          200: "#A8B5DB", // Example light color
          300: "#9CA4AB", // Example light color
        },
        dark: {
          100: "#221F3D", // Example dark color
          200: "#0F0D23", // Example dark color
        },
        accent: "#AB8BFF" // Example accent color
    },
  },
},
  plugins: [],

}