'use client';
import React from 'react';
import { SparklesCore } from '../ui/sparkles';
import { headerProps } from '@/types/common';

const SparklesHeader: React.FC<headerProps> = (props) => {
  const { header } = props;

  return (
    <div className="h-[10rem] flex flex-col items-center overflow-hidden rounded-md">
      <h1 className="text-5xl font-bold text-center text-white relative z-20">{header}</h1>
      <div className="w-[30rem] h-20 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={0.8}
          particleDensity={800}
          className="w-full h-[50%]"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
};

export default SparklesHeader;
