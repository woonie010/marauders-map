'use client';
import React, { useState } from 'react';
import { IconLocation } from '@tabler/icons-react';
import AnimatedModal from '../Common/AnimatedModal';
import AddLocationForm from './add-location-form';

const LocationManageCard = () => {
  // This component is to use to manage the location avilable
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      <div className="max-w-sm p-6  ring ring-customBlue_700 bg-gray-900 rounded-lg shadow">
        <IconLocation className="h-[3rem] w-[3rem] text-neutral-100" />
        <h5 className="pt-2 mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Add New Location?
        </h5>
        <p className="text-neutral-300">New location is involved? Add them now.</p>
        <AnimatedModal
          context="Add Location Now"
          title="Add New Location"
          emoji="📍"
          buttonContext="Add"
          children={<AddLocationForm onClose={handleModalClose} />}
        />
      </div>
    </>
  );
};

export default LocationManageCard;
