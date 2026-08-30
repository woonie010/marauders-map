'use client';
import React, { useEffect, useState } from 'react';
import DatePicker from './DatePicker';
import Slider from './Slider';
import { TimeSelectionProps } from '@/types/tracking';
import { useSelection } from '../Context/SelectionContext';

// Note: context cannot be used on a new page, so time values are exported instead
let expTimeValue: number;
let setExpTimeValue: React.Dispatch<React.SetStateAction<number>>;

const TimeSelection: React.FC<TimeSelectionProps> = (props) => {
  const { initialDate } = props;

  const [timeValue, setTimeValue] = useState<number>(0);
  const [dateValue, setDateValue] = useState<string>('');

  expTimeValue = timeValue;

  const setCurrentTime = () => {
    // For time value
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // For date value
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    // initialise the time and date value
    setTimeValue(hours * 60 + minutes);
    setDateValue(dateString);
  };

  useEffect(() => {
    if (initialDate) {
      setDateValue(initialDate);
    } else {
      setCurrentTime();
    }
  }, [initialDate]);

  return (
    <>
      <div className="flex flex-col w-full h-full space-y-8">
        <h2 className="text-xl font-bold">Time Selection</h2>
        <div className="flex flex-col h-full justify-between mt-4">
          <Slider timeValue={timeValue} setTimeValue={setTimeValue} />
          <DatePicker dateValue={dateValue} setDateValue={setDateValue} />
        </div>
      </div>
    </>
  );
};

export { expTimeValue };
export default TimeSelection;
