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
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#d4d4d8",
          secondary: "#ffffff",
          accent: "#ff0055",
          neutral: "#52525b",
          "base-100": "#27272a",
          "base-200": "#18181b",
          "base-300": "#09090b",
          info: "#4f46e5",
          success: "#059669",
          warning: "#ea580c",
          error: "#e11d48",
        },
        light: {
          primary: "#3f3f46",
          secondary: "#000000",
          accent: "#ff0055",
          neutral: "#52525b",
          "base-100": "#e4e4e7",
          "base-200": "#f4f4f5",
          "base-300": "#fafafa",
          info: "#4f46e5",
          success: "#059669",
          warning: "#ea580c",
          error: "#e11d48",
        },
      },
    ],
    
    darkTheme: "dark",
  },
  plugins: [daisyui],
};


