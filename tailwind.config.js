import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        'indeterminate-bar': {
          '0%': { transform: 'rotate(-90deg) translateX(-30%) scaleX(0.2)' },
          '100%': { transform: 'rotate(-90deg) translateX(50%) scaleX(1)' },
        },
      },
      animation: {
        'indeterminate-bar': 'indeterminate-bar 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
