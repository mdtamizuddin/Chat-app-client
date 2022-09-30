/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#3B82F6",

          "secondary": "#f43f5e",

          "accent": "#0ea5e9",

          "neutral": "#3D4451",

          "base-100": "#FFFFFF",

          "info": "#3ABFF8",

          "success": "#36D399",

          "warning": "#eab308",

          "error": "#ef4444",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}
