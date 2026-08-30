import React from 'react';
import { FloatingDock } from '../ui/floating-dock';
import { IconHome, IconCurrentLocation, IconDatabase, IconLayoutDashboard, IconUser } from '@tabler/icons-react';
import Image from 'next/image';

export function Dock() {
  const links = [
    {
      title: 'Admin',
      icon: <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '/admin',
    },
    {
      title: 'Home',
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '/',
    },
    {
      title: 'Database',
      icon: <IconDatabase className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '/database',
    },
    {
      title: 'Dashboard',
      icon: <IconLayoutDashboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '/dashboard',
    },
  ];
  return (
    <div className="fixed left-0 right-0 z-50 p-4 flex justify-center font-mono bottom-0">
      <FloatingDock mobileClassName="" items={links} />
    </div>
  );
}
