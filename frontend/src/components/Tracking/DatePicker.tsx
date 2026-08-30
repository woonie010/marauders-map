import { trackingDatePickerProps } from '@/types/tracking';
import React from 'react';

const DatePicker: React.FC<trackingDatePickerProps> = (props) => {
  const { setDateValue, dateValue } = props;

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value);
  };

  return (
    <>
      <div className="relative max-w-sm">
        {/* Calendar Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>

        {/* Date input */}
        <input
          id="datepicker-autohide"
          type="date" // Replaced with type="date" for better compatibility
          value={dateValue}
          onChange={handleDateChange} // Set value and onChange handler
          className="bg-customBlueGray_700 border border-customBlueGray_800 text-gray-300 placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date"
        />
      </div>
    </>
  );
};

export default DatePicker;
