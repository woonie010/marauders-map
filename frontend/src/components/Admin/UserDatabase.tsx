import React from 'react';
import UserDataItem from './UserDataItem';
import { User, UserDatabaseProps } from '@/types/admin';

const UserDatabase: React.FC<UserDatabaseProps> = (props) => {
  // This component is used to render the user database component that shows all available users in the database
  const { users, updateUserStaffStatus } = props;
  return (
    <>
      <p className="text-2xl font-bold uppercase m-2">Users Database:</p>
      <table className="w-full bg-customBlue_700 m-2 rounded-lg items-center">
        <thead className="p-2 uppercase text-left">
          <tr>
            <th className="px-3 py-2">Users</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Update</th>
          </tr>
        </thead>
        <tbody className="p-2 bg-customBlueGray_700 text-left text-neutral-200">
          {users.map((item: User) => (
            <UserDataItem
              username={item.username}
              email={item.email}
              is_staff={item.is_staff}
              updateUserStaffStatus={updateUserStaffStatus}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserDatabase;
