import { IdentityCardItemProps } from '@/types/information';
import React from 'react';

const InfoCards: React.FC<IdentityCardItemProps> = (props) => {
  const { label, amount } = props;
  return (
    <div className="rounded-2xl flex-1 h-30 p-6 m-3 shadow-lg ring-2">
      <h1 className="text-center text-4xl font-bold">{amount}</h1>
      <h2 className="pt-1 text-xl font-medium text-center w-full">{label}</h2>
    </div>
  );
};

export default InfoCards;
