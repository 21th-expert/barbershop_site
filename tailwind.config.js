/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black:  '#0A0A0A',
          gold:   '#C9A84C',
          cream:  '#F5F0E8',
          gray:   '#2A2A2A',
          light:  '#E8E0D0',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body:    ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
