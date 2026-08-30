import React from 'react';
import { BadgesItemProps } from '@/types/information';

interface ColorMapping {
  [key: string]: {
    text: string;
    ring: string;
  };
}

const colorMapping: ColorMapping = {
  gray: {
    text: 'text-customBrightGray',
    ring: 'ring-customBrightGray',
  },
  red: {
    text: 'text-customBrightRed',
    ring: 'ring-customBrightRed',
  },
  yellow: {
    text: 'text-customBrightYellow',
    ring: 'ring-customBrightYellow',
  },
  green: {
    text: 'text-customBrightGreen',
    ring: 'ring-customBrightGreen',
  },
  blue: {
    text: 'text-customBrightBlue',
    ring: 'ring-customBrightBlue',
  },
  indigo: {
    text: 'text-customBrightIndigo',
    ring: 'ring-customBrightIndigo',
  },
  purple: {
    text: 'text-customBrightPurple',
    ring: 'ring-customBrightPurple',
  },
  pink: {
    text: 'text-customBrightPink',
    ring: 'ring-customBrightPink',
  },
};

const Badges: React.FC<BadgesItemProps> = ({ colorTheme = 'gray', context }) => {
  const { text, ring } = colorMapping[colorTheme] || colorMapping['gray'];

  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg px-4 py-1 w-[8%] min-w-[70px] text-sm font-semibold ${text} ring-2 ${ring}`}
    >
      {context}
    </span>
  );
};

export default Badges;
