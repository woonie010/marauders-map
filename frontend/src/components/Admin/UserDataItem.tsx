'use client';
import { UserDataItemProps } from '@/types/admin';
import React, { useEffect } from 'react';
import { updateStaffStatus } from '@/epics/admin';

const UserDataItem: React.FC<UserDataItemProps> = (props) => {
  // This component is used to render the user database component that shows all available users in the database
  const { username, email, is_staff, updateUserStaffStatus } = props;

  // handle the case and change the staff state to isStaff
  const clickHandler = async () => {
    if (!is_staff) {
      const success = await updateStaffStatus(username, true);
      if (success) {
        updateUserStaffStatus(username, true);
      }
    }
  };

  return (
    <>
      <tr className="p-2">
        <td className="px-3 py-2">{username}</td>
        <td className="px-3 py-2">{email}</td>
        <td className="px-3 py-2 pt-3">
          <button
            onClick={clickHandler}
            disabled={is_staff}
            className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white focus:ring-cyan-800 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none ${is_staff ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="relative px-2 py-1 transition-all ease-in duration-75 bg-customBlueGray_700 rounded-md group-hover:bg-opacity-0">
              {is_staff ? 'Staff Member' : 'Become Staff'}
            </span>
          </button>
        </td>
      </tr>
    </>
  );
};

export default UserDataItem;
