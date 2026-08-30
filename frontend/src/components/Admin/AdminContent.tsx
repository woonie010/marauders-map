// src/components/AdminContent.tsx

'use client';

import React, { useEffect, useState } from 'react';
import CalendarView from '@/components/Common/CalanderView';
import Sidebar from '@/components/Common/Sidebar';
import SparklesHeader from '@/components/Common/SparkleHeader';
import { fetchAllUsers } from '@/epics/admin';
import { User } from '@/types/admin';
import UserDatabase from './UserDatabase';
import ActivityManageCard from './ActivityManageCard';
import LocationManageCard from './LocationManageCard';
import FileUploadComponent from '../Common/FileUpload';

interface AdminContentProps {
  isAdmin: boolean;
  username: string | undefined;
  session: any;
}

const AdminContent: React.FC<AdminContentProps> = (props) => {
  // Render the Admin Content based on user state
  // initialise states
  const [users, setUsers] = useState<User[]>([]);
  const [databaseUsers, setDatabaseUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isAdmin, username, session } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // show admin content only if the user isStaff
  const updateUserStaffStatus = (username: string, isStaff: boolean) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.username === username ? { ...user, is_staff: isStaff } : user)),
    );
  };

  // fetch all available user from database
  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchAllUsers();
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="flex font-mono flex-row w-full">
      <div className="flex items-end justify-start h-full">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>
      <div className="flex flex-row flex-grow justify-between">
        <div className="mt-[3%] w-full m-auto px-2">
          <SparklesHeader header={`Hello ${session.username.toUpperCase()}`} />
          {isAdmin && (
            <>
              <div className="mb-10 flex flex-row px-5">
                <div className="mr-5">
                  <ActivityManageCard />
                </div>
                <div className="mr-5">
                  <LocationManageCard />
                </div>
              </div>
              <div className="w-[45%] m-2 px-2 mb-5">
                <FileUploadComponent />
              </div>
              <UserDatabase users={users} updateUserStaffStatus={updateUserStaffStatus} />
            </>
          )}
        </div>

        <div className="flex h-[50%] mt-[15rem] justify-end">
          <CalendarView />
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
