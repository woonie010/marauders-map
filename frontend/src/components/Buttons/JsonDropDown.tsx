"use client";

import React, { useState, useEffect } from 'react';
import { useSelection } from '../Context/SelectionContext';

interface Filenames {
  name: string;
}

async function fetchAllActivities(): Promise<Filenames[]> {
  const response = await fetch('http://127.0.0.1:8000/filenames/get-all/', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  try {
      const data: Filenames[] = await response.json();
      return data;
  } catch (err) {
      throw new Error('Failed to parse response as JSON');
  }
}

const JsonDropDown = () => {
  const { setJsonSelected } = useSelection();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [dropdownItems, setDropdownItems] = useState<Filenames[]>([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (name: string) => {
    setSelectedOption(name);
    setIsOpen(false);
    setJsonSelected(name);  // Setting the selected option in the context
  };

  useEffect(() => {
    const loadFilenames = async () => {
      try {
        const filenames = await fetchAllActivities();
        setDropdownItems(filenames);  // Setting the fetched data
      } catch (error) {
        console.error('Error fetching filenames:', error);
      }
    };

    loadFilenames();
  }, []); // Empty dependency array ensures it only runs once when component mounts

  return (
    <div className="absolute top-20 left-4 z-10">
      <button
        onClick={handleToggle}
        className="text-white bg-customBlue hover:bg-customBlue_700 focus:ring-4 focus:outline-none focus:ring-customBlue_500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
      >
        {selectedOption ? selectedOption : 'Select JSON file'}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div className="flex z-10 w-[20rem] absolute justify-start mt-2 divide-y rounded-lg shadow bg-customBlue_700 divide-customBlue">
          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
            {dropdownItems.map((item, index) => (
              <li key={index}>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id={item.name}
                    type="radio"
                    value={item.name}
                    name="dropdown-radio"
                    checked={selectedOption === item.name}
                    onChange={() => handleSelect(item.name)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={item.name}
                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    {item.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JsonDropDown;
