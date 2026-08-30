import React from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-monashBlue animate-backgroundPulse z-50">
      <Image src="/icons/monash_icon.png" alt="Loading Icon" width={200} height={200} />
    </div>
  );
};

export default LoadingScreen;
