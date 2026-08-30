import Image from 'next/image';

const SearchBar: React.FC<{}> = (props) => {
  const {} = props;
  return (
    <>
      <form className="flex items-center max-w-sm mx-auto">
        <label className="sr-only">Search</label>
        <div className="relative w-full">
          <input
            type="text"
            id="simple-search"
            className="font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-customBlue_300 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-customBlue_300"
            placeholder="Search..."
            required
          />
        </div>
        <button
          type="submit"
          className="px-2 py-1 ms-2 text-sm font-medium text-white bg-customBlue_300 rounded-lg border border-customBlue hover:bg-customBlue_500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-customBlue_300 dark:hover:bg-customBlue_500 dark:focus:ring-blue-800"
        >
          <Image src="/icons/search.png" alt="Organisation Icon" width={25} height={25} />
        </button>
      </form>
    </>
  );
};

export default SearchBar;
