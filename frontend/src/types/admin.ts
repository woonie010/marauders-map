export interface User {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
}

export interface UserDataItemProps {
  username: string;
  email: string;
  is_staff: boolean;
  updateUserStaffStatus: (username: string, isStaff: boolean) => void;
}

export interface UserDatabaseProps {
  users: User[];
  updateUserStaffStatus: (username: string, isStaff: boolean) => void;
}
