import daisyui from 'daisyui';

export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'serif'],
      },
    },
  },
  plugins: [daisyui],
};


