import SearchBar from './searchbar';
import { NavInformation } from '@/types/information';
import { IconUser, IconDatabase, IconLayoutDashboard } from '@tabler/icons-react';
import Image from 'next/image';
import UserAvantar from './Common/UserAvantar';

const NavBar: React.FC<NavInformation> = (props) => {
  const { organisationName } = props;
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 h-[10%]" id="nav-bar">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center rtl:space-x-reverse">
            <Image src="/MonashUniversity.png" alt="Organisation Icon" width={40} height={40} />
            <span className="mx-2 m-auto font-mono self-center text-4xl whitespace-nowrap dark:text-white">
              {`${organisationName} Locate +`}
            </span>
          </a>
          <div className="hidden w-full md:block md:w-auto">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className="flex flex-row">
                <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
                <a
                  href="/admin"
                  className="font-mono mx-2 m-auto block py-2 px-3 text-gray-900 text-xl rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-customBlue_300 md:p-0 dark:text-white md:dark:hover:text-customBlue_300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Admin
                </a>
              </li>

              <li className="flex flex-row">
                <IconDatabase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
                <a
                  href="/database"
                  className="font-mono mx-2 m-auto block py-2 px-3 text-gray-900 text-xl rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-customBlue_300 md:p-0 dark:text-white md:dark:hover:text-customBlue_300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Database
                </a>
              </li>
              <li className="flex flex-row">
                <IconLayoutDashboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />
                <a
                  href="/dashboard"
                  className="font-mono mx-2 m-auto block py-2 px-3 text-gray-900 text-xl rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-customBlue_300 md:p-0 dark:text-white md:dark:hover:text-customBlue_300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Dashboard
                </a>
              </li>
              <UserAvantar />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
