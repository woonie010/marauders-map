import { IndividualDatabaseItemProps } from '@/types/individual';
import React from 'react';
import { format } from 'date-fns';

const DataTableItem: React.FC<IndividualDatabaseItemProps> = (props) => {
  const { individual, category, lastseen, handleIndividualSelected } = props;

  const formattedLastSeen = lastseen ? format(new Date(lastseen), 'dd MMMM yyyy, HH:mm:ss') : 'N/A';

  return (
    <tr className="border-b bg-gray-800 border-gray-700 hover:bg-customBlue_300 hover:text-white">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {individual.name}
      </th>
      <td className="px-6 py-4">{individual.description}</td>
      <td className="px-6 py-4">{category}</td>
      <td className="px-6 py-4">{formattedLastSeen}</td>
      <td className="px-6 py-4 text-right">
        <a
          href="#" // Added href to make it accessible
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleIndividualSelected(individual);
          }}
          className="font-medium text-customBlue_100 hover:underline"
        >
          View
        </a>
      </td>
    </tr>
  );
};

export default DataTableItem;
