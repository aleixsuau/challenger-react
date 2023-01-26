const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.gray['500'],
          light: colors.gray['300'],
          dark: colors.gray['800'],
        },
        secondary: {
          DEFAULT: colors.blue['500'],
          light: colors.blue['300'],
          dark: colors.blue['800'],
        },
        accent: {
          DEFAULT: colors.pink['500'],
          light: colors.pink['300'],
          dark: colors.pink['800'],
        },
      },
    },
  },
  plugins: [],
};
