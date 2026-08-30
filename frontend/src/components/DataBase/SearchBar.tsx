'use client';

import { SearchbarProps } from '@/types/information';
import React, { useEffect } from 'react';

const SearchBar: React.FC<SearchbarProps> = (props) => {
  const { searchValue, resetDateFilter, onSearch } = props;

  const handleOnSearch = (value: string) => {
    onSearch(value);
    resetDateFilter('All');
  };

  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue]);

  return (
    <>
      <div className="relative mx-2 mt-5 opacity-80">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 bg-gr text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleOnSearch(e.target.value)}
          className="block w-full p-2 pl-10 text-gray-500 text-sm border border-gray-300 rounded-lg"
          placeholder="Search..."
        />
      </div>
    </>
  );
};

export default SearchBar;
