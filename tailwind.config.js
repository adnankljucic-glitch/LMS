/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        danske: {
          navy: '#003755',
          cyan: '#009FDA',
          navyLight: '#004d75',
          navyDark: '#002540',
          cyanLight: '#33b5e5',
          cyanDark: '#007ab5',
          gray: '#f4f6f8',
          border: '#dde3e9',
          text: '#1a2e3b',
          muted: '#6b7e8c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
