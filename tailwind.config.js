const formKitTailwind = require('@formkit/themes/tailwindcss')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './formkit.config.js',
    './node_modules/vue-tailwind-datepicker/**/*.js',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        'vtd-primary': colors.green,
        'vtd-secondary': colors.neutral,
      },
    },
  },
  plugins: [formKitTailwind, require('@tailwindcss/forms')],
}
