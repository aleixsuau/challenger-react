const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
  ],
  daisyui: {
    themes: [
      'garden',
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          'base-300': colors.gray[500],
        },
      },
    ],
  },
};
