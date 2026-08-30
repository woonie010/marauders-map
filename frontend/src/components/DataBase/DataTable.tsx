'use client';

import { Individual } from '@/types/individual';
import React, { useState, useEffect } from 'react';
import DataTableItem from './DataTableItem';
import { fetchAllIndividuals } from '@/epics/individual';
import Dropdown from './Dropdown';
import SearchBar from './SearchBar';
import { DataTableProps } from '@/types/information';

const DataTable: React.FC<DataTableProps> = (props) => {
  const { handleIndividualSelected } = props;

  const [selectedOption, setSelectedOption] = useState<string>('All');
  const [searchValue, setSearchValue] = useState<string>('');
  const [databaseItem, setDatabaseItem] = useState<Individual[]>([]);
  const [filteredData, setFilteredData] = useState<Individual[]>([]);

  const handleDropdownSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const individuals_data = await fetchAllIndividuals();
        setDatabaseItem(individuals_data);
      } catch (error) {
        console.error('Error fetching individuals:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchValue) {
      setFilteredData(databaseItem.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())));
    } else {
      const now = new Date();

      const filtered = databaseItem.filter((item) => {
        if (selectedOption === 'All') {
          return true;
        } else if (item.last_seen) {
          const lastSeenDate = new Date(item.last_seen);
          switch (selectedOption) {
            case 'Last day':
              return now.getTime() - lastSeenDate.getTime() <= 24 * 60 * 60 * 1000;
            case 'Last 7 days':
              return now.getTime() - lastSeenDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
            case 'Last 30 days':
              return now.getTime() - lastSeenDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
            case 'Last month': {
              const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
              return lastSeenDate >= lastMonth;
            }
            case 'Last year': {
              const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
              return lastSeenDate >= lastYear;
            }
            default:
              return true;
          }
        }
        return false;
      });

      setFilteredData(filtered);
    }
  }, [searchValue, selectedOption, databaseItem]);

  return (
    <>
      <div className="flex justify-between items-center pb-4">
        <Dropdown
          options={['All', 'Last day', 'Last 7 days', 'Last 30 days', 'Last month', 'Last year']}
          selectedOption={selectedOption}
          onSelect={handleDropdownSelect}
        />

        <SearchBar searchValue={searchValue} resetDateFilter={setSelectedOption} onSearch={handleSearchChange} />
      </div>

      <div className="relative m-2 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-md text-white uppercase bg-customBlue_500">
            <tr>
              <th scope="col" className="px-6 py-3">
                Individual
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Description</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Category
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Last Seen
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <DataTableItem
                key={item.id} // Add a unique key
                individual={item}
                category={item.category__name}
                lastseen={item.last_seen}
                handleIndividualSelected={handleIndividualSelected}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
