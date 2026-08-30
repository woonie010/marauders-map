'use client';

import DataTable from '@/components/DataBase/DataTable';
import IndividualInfo from '@/components/DataBase/IndividualInfo';
import { Individual } from '@/types/individual';
import React, { useState, useEffect } from 'react';

/**
 * Main component for displaying a data table of individuals.
 * On selecting an individual from the table, it opens a modal with detailed information.
 */

const Page: React.FC = () => {
  // State to store the currently selected individual
  const [selectedIndividual, setSelectedIndividual] = useState<Individual | null>(null);
  // State to manage the visibility of the IndividualInfo modal
  const [showModal, setShowModal] = useState<boolean>(false);

  // Handles the selection of an individual from the DataTable component
  const handleIndividualSelected = (individual: Individual) => {
    setSelectedIndividual(individual);
    setShowModal(true);
  };

  // Effect to log selected individual data to the console whenever it changes
  useEffect(() => {
    if (selectedIndividual) {
      console.log('Selected Individual:', selectedIndividual);
    }
  }, [selectedIndividual]);

  return (
    <>
      <div className="">
        <DataTable handleIndividualSelected={handleIndividualSelected} />
      </div>
      <div className="font-mono">
        {showModal && selectedIndividual && (
          <IndividualInfo onClose={() => setShowModal(false)} individual={selectedIndividual} />
        )}
      </div>
    </>
  );
};

export default Page;
