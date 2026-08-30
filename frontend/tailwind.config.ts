import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        futuristicBlue: '#50BCD4',
        futuristicPurple: '#B27CC5',
        customBg: '#C4D0D7',
        customBlue: '#014F86',
        customBlue_100: '#B9DEF8',
        customBlue_200: "#82B9DF",
        customBlue_300: '#58A6DC',
        customBlue_500: '#2484C7',
        customBlue_700: "#07304D",
        customBlue_900: "#030C17",
        customPink_200: "#E0A3CF",
        customBlueGray_100: "#BDCBD6",
        customBlueGray_200: "#9BB0BE",
        customBlueGray_300: "#678599",
        customBlueGray_500: "#4B6679",
        customBlueGray_700: "#334C5E",
        customBlueGray_800: "#24333F",
        customBrightGray: '#DFDFDF',
        customBrightRed: '#EF7272',
        customBrightOrange: '#F4955F',
        customBrightYellow: '#FFDD86',
        customBrightGreen: '#4FC593',
        customBrightBlue: '#4ADAF9',
        customBrightIndigo: '#5686FF',
        customBrightPurple: '#8344EA',
        customBrightPink: '#FD6AD4',
        monashBlue: '#00599d',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        backgroundPulse: {
          '0%, 100%': { backgroundColor: '#00599d' },
          '50%': { backgroundColor: '#111827' },
        },
      },
      animation: {
        backgroundPulse: 'backgroundPulse 3s ease-in-out infinite', // 3s animation, infinite loop
      },
    },
  },
  plugins: [],
};
export default config;
