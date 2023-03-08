/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#0084ff",
          secondary: "#ff5778",
          accent: "#37cdbe",
          neutral: "#171b1e",
          "base-100": "#ffffff",
          "base-content": "#000000",
        },
        dark: {
          primary: "#0084ff",
          secondary: "#ff5778",
          accent: "#37cdbe",
          neutral: "#171b1e",
          "base-100": "#07090a",
          "base-200": "#181818",
          "base-content": "#fff",
        },

      },
    ],
  },
  plugins: [
    require('daisyui')
  ],
}