const { nextui } = require('@nextui-org/react');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js',
  ],
  theme: {
    colors: {
      ...colors,
      cornflower: {
        light: '#f3f6fa',
      },
      error: '#c1170b',
      brand: {
        DEFAULT: '#00B0FF',
        700: '#00B0FF',
        800: '#008DCC',
      },
      primary: {
        light: 'rgba(0, 161, 156, 0.5)',
        DEFAULT: '#00a19c',
      },
      background: {
        DEFAULT: '#F5F5F5',
      },
      white: {
        DEFAULT: '#fff',
        off: '#f7fafc',
      },
      black: {
        light: '#2d333a',
        DEFAULT: '#000',
      },
      gray: {
        ...colors.gray,
        catskill: '#E2E8F0',
        DEFAULT: '#788494',
        athens: '#eceef1',
        trout: '#525B65',
        700: '#d0d4d9',
      },
      red: {
        ...colors.red,
        monza: '#d5190c',
        milano: '#C1170B',
        bright: '#f44336',
        bridesmaid: '#fee8e7',
      },
      blue: {
        ...colors.blue,
        cobalt: '#0152b2',
        solitude: '#e6f1ff',
        dodger: '#00B0FF',
        dodger2: '#459AFE',
      },
      green: {
        ...colors.green,
        shamrock: '#2ECC71',
        iceberg: '#E0F4F3',
      },
      yellow: {
        ...colors.yellow,
        orange: '#FFB53B',
        supernova: '#FFC600',
        pirate: '#CC7F00',
        sandy: '#FFECCC',
      },
      purple: {
        ...colors.purple,
        heart: '#5916DF',
      },
      carbon: {
        DEFAULT: '#123F68',
        700: '#0e3253',
      },
      btn: {
        focus: '#B8C5D2',
      },
    },
    extend: {
      screens: {
        ultra: '1440px',
        wide: '1180px',
        large: '880px',
        medium: '860px',
        small: '680px',
      },
      letterSpacing: {
        mobilewide: '0.08em',
      },
      boxShadow: {
        header:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      fontSize: {
        '1.5xl': ['0.875rem', '1.5'],
        '2.5xl': ['1.75rem', '1.29'],
        '4.5xl': ['2.75rem', '3.5rem'],
      },
      gridTemplateColumns: {
        14: 'repeat(14, minmax(0, 1fr))',
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  lightMode: 'class',
  plugins: [nextui()],
};
