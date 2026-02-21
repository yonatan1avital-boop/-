import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7C4DFF',
        eve: '#5CF2FF'
      }
    }
  },
  plugins: []
} satisfies Config;
