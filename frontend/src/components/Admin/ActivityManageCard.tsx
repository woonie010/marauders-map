'use client';
import React, { useState } from 'react';
import { IconCalendarEvent } from '@tabler/icons-react';
import AnimatedModal from '../Common/AnimatedModal';
import AddActivityForm from './add-activity-form';

const ActivityManageCard = () => {
  // This component is to use to manage the activity avilable
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      <div className="max-w-sm p-6  ring ring-customBlue_700 bg-gray-900 rounded-lg shadow">
        <IconCalendarEvent className="h-[3rem] w-[3rem] text-neutral-100" />
        <h5 className="pt-2 mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Add New Event?
        </h5>
        <p className="text-neutral-300">Is there any event to be added into the database for better management?</p>
        {/* render the add activity form */}
        <AnimatedModal
          context="Add Activity Now"
          title="Add New Activity"
          emoji="📅"
          buttonContext="Add"
          children={<AddActivityForm onClose={handleModalClose} />}
        />
      </div>
    </>
  );
};

export default ActivityManageCard;
