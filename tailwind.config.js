/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    letterSpacing: {
      huge: "1em",
      wider: '0.75em',
      wide: '0.55em',
      reg: '0.25em',
      text: '0.1em'
    },
    fontFamily: {
      'days': ['Days One', 'sans-serif']

    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      "3xl": { min: "1535px" },
      // @media (max-width: 1535px) { ... }

      "2xl": { min: "1280px" },
      // @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // @media (max-width: 639px) { ... }

      xs: { max: "479px" },
      // @media (max-width: 479px) { ... }
    },
  },
  plugins: [],
}