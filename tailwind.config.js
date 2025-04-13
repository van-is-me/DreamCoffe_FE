/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#64748b',
        dark: '#1e293b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#0ea5e9',
          secondary: '#64748b',
          accent: '#facc15',
          neutral: '#3d4451',
          'base-100': '#ffffff',
          'base-content': '#1f2937',
        },
      },
    ],
    // Đây là key quan trọng:
    defaultTheme: "light",
  },
}
