/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        fira: ['Fira Sans', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
      colors: {
        'moon-black': '#111111',
        'moon-gray': {
          100: '#eaeaea',
          200: '#bfbfbf',
          300: '#959595',
          400: '#6a6a6a',
          500: '#404040',
          600: '#303030',
        },
        'moon-ice': '#75F9F4',
        'moon-red': {
          100: '#BE516A',
          200: '#A53649',
        },
        'moon-blue': {
          100: '#84CEE7',
          200: '#48A5CE',
          300: '#3F849D',
          400: '#24627C',
        },
      },
    },
  },
  plugins: [],
};
