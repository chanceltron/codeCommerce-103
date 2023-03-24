/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        'code-olive': {
          primary: '#eae7dc',
          100: '#eae7dc',
          200: '#dbd6c3',
          300: '#c3bb9b',
          400: '#ab9f74',
          500: '#8b7f54',
          600: '#645b3c',
          700: '#3c3724',
          800: '#14120c',
        },
        'code-tan': {
          primary: '#d8c3a5',
          100: '#e2d3bc',
          200: '#d8c3a5',
          300: '#cfb590',
          400: '#bc9763',
          500: '#9c7743',
          600: '#6f5530',
          700: '#43331d',
          800: '#16110a',
        },
        'code-gray': {
          primary: '#8e8d8a',
          100: '#d0d0ce',
          200: '#b1b0ae',
          300: '#91908e',
          400: '#8e8d8a',
          500: '#71716e',
          600: '#51504e',
          700: '#31302f',
          800: '#101010',
        },
        'code-peach': {
          primary: '#e98074',
          secondary: '#e85a4f',
          100: '#f3bcb6',
          200: '#ec8f85',
          300: '#e98074',
          400: '#e85a4f',
          500: '#dc3623',
          600: '#ab2a1b',
          700: '#7a1e13',
          800: '#49120c',
        },
      },
      backgroundImage: {
        'hero-bg': "url('src/assets/hero-bg2.jpg')",
      },
    },
    plugins: [],
  },
};
