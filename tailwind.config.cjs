/** @type {import('tailwindcss').Config} */

module.exports = {
   darkMode: 'class',
   content: ['./views/**/*.ejs', './build/**/*.js'],
   theme: {
      extend: {}
   },
   plugins: [require('autoprefixer')],
}