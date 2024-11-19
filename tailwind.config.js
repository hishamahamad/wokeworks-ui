/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        video: 'inset 0 -450px 150px 0 rgba(0, 0, 0, 0.85), inset 0 225px 75px 0 rgba(0, 0, 0, 0.75)',
      },
      colors: {
        'carbon': '#333333',
        'alizarin': '#CD1B23'
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
