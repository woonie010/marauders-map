import React from 'react';

const Tooltip: React.FC<{ value: string }> = ({ value }) => {
  return (
    <div className="relative shadow-md inline-block opacity-80">
      <div className="bg-customBlue_500 text-white truncate text-sm font-semibold rounded py-1 px-4 -mt-8">{value}</div>
      <svg
        className="absolute text-customBlue_500 w-full h-2 left-0 top-full"
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
      >
        <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg>
    </div>
  );
};

export default Tooltip;
