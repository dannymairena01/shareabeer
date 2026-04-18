import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#f5a623',
          dark: '#b87300',
        },
      },
    },
  },
  plugins: [],
};

export default config;
