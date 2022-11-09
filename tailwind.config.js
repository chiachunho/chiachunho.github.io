/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /(bg|text|border)-(teal|cyan)-(600)/,
      variants: ['hover'],
    },
    {
      pattern: /(bg|text|border)-(black|white)/,
      variants: ['hover'],
    },
  ],
  plugins: [],
};
