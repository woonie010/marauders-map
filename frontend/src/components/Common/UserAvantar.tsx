'use client';

import React, { useEffect, useState } from 'react';
import { IconUserCircle, IconDoorExit, IconDoorEnter, IconSettings } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { verifySession, deleteSession } from '@/app/_lib/session'; // Adjust the import path accordingly

const ProfileMenu = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState('');
  // find user from database

  // Function to check session status on component mount
  const checkSession = async () => {
    const session = await verifySession();

    if (session) {
      setIsLoggedIn(true);
      setUserName(session.username);
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  };

  useEffect(() => {
    // Check session on component mount
    checkSession();

    const intervalId = setInterval(checkSession, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLoginClick = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown regardless of login status
  };

  const handleLogout = async () => {
    try {
      await deleteSession(); // Await the session deletion
      setIsLoggedIn(false);
      setUserName('');
      setShowDropdown(false);
      router.push('/signin'); // Redirect to sign-in page after logout
    } catch (error) {
      console.error('Logout error:', error);
      // Optionally show an error message to the user
    }
  };

  return (
    <div className="relative text-neutral-100 font-mono">
      {/* Profile Icon */}
      <div className="cursor-pointer" onClick={handleLoginClick}>
        <Image
          src="/profile_picture.jpg"
          alt={`${userName}'s Profile Picture`}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      {/* Dropdown container */}
      {showDropdown && (
        <div className="absolute z-20 top-full w-[15rem] mt-2 right-0 bg-customBlue_700 border border-neutral-600 shadow-lg p-3 rounded-lg">
          {isLoggedIn ? (
            <>
              <p className="p-2">Hello, {userName}!</p>
              <hr className="my-2 border-neutral-400" />
              <ul className="mt-2">
                <li className="cursor-pointer hover:bg-customBlue p-2 rounded flex flex-row" onClick={handleLogout}>
                  <IconDoorExit size={25} />
                  <p className="px-2">Log Out</p>
                </li>
              </ul>
            </>
          ) : (
            <>
              <p>Please log in to continue</p>
              <hr className="my-2 border-neutral-400" />
              <li className="flex flex-row">
                <IconDoorEnter size={25} />
                <a href="/signin" className="px-2">
                  Log In
                </a>
              </li>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
