/** @type {import("tailwindcss").Config} */

module.exports = {
  content: ["./views/*.hbs"],
  theme: {
    fontFamily: {
      sans: ['Helvetica', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("daisyui")
  ],
} 