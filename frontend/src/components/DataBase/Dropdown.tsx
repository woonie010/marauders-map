'use client';
import { DropdownProps } from '@/types/information';
import React, { useEffect } from 'react';
import { useState } from 'react';

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { options, selectedOption, onSelect } = props;
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState(options[0]);

  const handleChange = (option: string) => {
    setSelected(option);
    onSelect(option);
  };

  useEffect(() => {
    setSelected(selectedOption);
  }, [selectedOption]);

  return (
    <>
      <div className="relative mx-2 mt-5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center text-white font-bold bg-customBlue_300 border border-customBlue hover:bg-customBlue_500 focus:ring-3 focus:ring-customBlue rounded-lg text-sm px-3 py-1.5"
        >
          {selected}
          <svg className="w-2.5 h-2.5 ml-2" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l4 4 4-4" />
          </svg>
        </button>
        {isOpen && (
          <ul className="absolute mt-1 z-10 w-48 bg-gray-200 font-semibold text-gray-500 divide-y divide-gray-400 rounded-lg shadow">
            {options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => {
                  handleChange(option);
                  setIsOpen(false);
                }}
              >
                <div className="p-2 px-5 hover:bg-gray-300 cursor-pointer">{option}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Dropdown;
