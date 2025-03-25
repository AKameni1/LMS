import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'bebas-neue': ['Bebas Neue', 'sans-serif'],
        'ibm-plex-sans-bold': ['IBMPlexSans-Bold', 'sans-serif'],
        'ibm-plex-sans-medium': ['IBMPlexSans-Medium', 'sans-serif'],
        'ibm-plex-sans': ['IBMPlexSans-Regular', 'sans-serif'],
        'ibm-plex-sans-semibold': ['IBMPlexSans-SemiBold', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#E7C9A5',
          admin: '#25388C',
        },
        green: {
          '100': '#ECFDF3',
          '400': '#4C7B62',
          '500': '#2CC171',
          '800': '#027A48',
          DEFAULT: '#027A48',
        },
        red: {
          '400': '#F46F70',
          '500': '#E27233',
          '800': '#EF3A4B',
          DEFAULT: '#EF3A4B',
        },
        blue: {
          '100': '#0089F1',
        },
        light: {
          '100': '#D6E0FF',
          '200': '#EED1AC',
          '300': '#F8F8FF',
          '400': '#EDF1F1',
          '500': '#757575',
          '600': '#F9FAFB',
          '700': '#E2E8F0',
          '800': '#F8FAFC',
        },
        dark: {
          '100': '#16191E',
          '200': '#3A354E',
          '300': '#232839',
          '400': '#1E293B',
          '500': '#0F172A',
          '600': '#333C5C',
          '700': '#464F6F',
          '800': '#1E2230',
        },
        gray: {
          '100': '#CBD5E1',
        },
      },
      screens: {
        xs: '480px',
      },
      backgroundImage: {
        pattern: "url('./assets/images/pattern.webp')",
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
