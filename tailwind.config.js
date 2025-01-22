/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue-1': 'rgba(79, 172, 254, 0.8)',
        'custom-blue-2': 'rgba(0, 242, 254, 0.8)',
      },
    },
  },
  plugins: [],
};