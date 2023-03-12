const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    path.join(path.dirname(require.resolve('quickgpt-app')), '**/*.{js,ts,jsx,tsx,html}'),
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#0084ff",
          secondary: "#cb4cff",
          accent: "#37cdbe",
          neutral: "#171b1e",
          "base-100": "#ffffff",
          "base-content": "#000000",
        },
        dark: {
          primary: "#0084ff",
          secondary: "#cb4cff",
          accent: "#37cdbe",
          neutral: "#171b1e",
          "base-100": "#07090a",
          "base-200": "#181818",
          "base-300": "#252525",
          "base-content": "#fff",
        },
      },
    ],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
}