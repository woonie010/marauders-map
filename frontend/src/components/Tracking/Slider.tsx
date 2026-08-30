import React, { useEffect, useState } from 'react';
import Tooltip from './Tooltip';
import { trackingSliderProps } from '@/types/tracking';
import { expData } from '@/app/tracking/TrackingManager';

const convertSecondsToTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const TimeRangeInput: React.FC<trackingSliderProps> = (props) => {
  const { timeValue, setTimeValue } = props;
  const [range, setRange] = useState<[number, number]>([0, 0]);
  const [sliderValues, setSliderValues] = useState<number[]>([]);
  const [timestampOffsets, setTimestampOffsets] = useState<number[]>([]);
  const [currentSliderPosition, setCurrentSliderPosition] = useState<number>(0);

  // Parse a timestamp into seconds
  const parseTimestampToSeconds = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    return hours * 3600 + minutes * 60 + seconds; // Convert to seconds
  };

  // Function to handle when slider value changes
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderPosition = Number(e.target.value);

    // Find the closest value from sliderValues based on the slider position
    const closestIndex = sliderValues.reduce((prevIndex, currentValue, currentIndex) => {
      return Math.abs(currentValue - sliderPosition) < Math.abs(sliderValues[prevIndex] - sliderPosition)
        ? currentIndex
        : prevIndex;
    }, 0);

    setCurrentSliderPosition(sliderPosition);
    setTimeValue(timestampOffsets[closestIndex]);
  };

  useEffect(() => {
    if (expData && expData.length > 0) {
      // Convert all timestamps in expData to seconds
      const timestampsInSeconds = expData.map((data: any) => parseTimestampToSeconds(data['timestamp']));

      const lowerBound = Math.min(...timestampsInSeconds); // Minimum timestamp
      const upperBound = Math.max(...timestampsInSeconds); // Maximum timestamp

      setRange([lowerBound, upperBound]);

      timestampsInSeconds.sort((a: number, b: number) => a - b);
      setTimestampOffsets(timestampsInSeconds);

      // Normalize all timestamps to a scale between 0 and 100 (as percentages of slider)
      const normalizedValues = timestampsInSeconds.map((time: number) => {
        return ((time - lowerBound) / (upperBound - lowerBound)) * 100;
      });

      setSliderValues(normalizedValues);

      setCurrentSliderPosition(normalizedValues[0]);
      setTimeValue(normalizedValues[0]);
    }
  }, [expData]);

  // Calculate the position for the tooltip based on the slider's current value
  const tooltipPosition = ((currentSliderPosition - range[0]) / (range[1] - range[0])) * 100;

  return (
    <div className="relative mb-6 w-full">
      <label htmlFor="time-range-input" className="sr-only">
        Select Time
      </label>

      {/* Tooltip showing the current time */}
      <div className="absolute -top-10 left-0 transform -translate-x-1/2" style={{ left: `${tooltipPosition}%` }}>
        <Tooltip value={convertSecondsToTime(timeValue)} />
      </div>

      {/* Range input (slider) */}
      <input
        id="time-range-input"
        type="range"
        value={currentSliderPosition}
        min={range[0]}
        max={range[1]}
        step={5}
        onChange={(e) => {
          const newValue = Number(e.target.value);
          setTimeValue(newValue);
          setCurrentSliderPosition(newValue);
          console.log(newValue);
        }}
        className="w-full h-2 bg-customBlueGray_800 rounded-lg appearance-none cursor-pointer"
      />

      {/* Time labels below the slider */}
      <div className="flex justify-between mt-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{convertSecondsToTime(range[0])}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{convertSecondsToTime(range[1])}</span>
      </div>
    </div>
  );
};

export default TimeRangeInput;
