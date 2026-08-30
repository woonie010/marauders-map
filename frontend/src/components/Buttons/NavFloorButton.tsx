import React, { useState, useEffect } from 'react';
import { useSelection } from '../Context/SelectionContext';
import { modeKey } from '../Context/SelectionContext';

type NavFloorButtonProps = {
  label: number;
  onClick: () => void;
};

function NavFloorButton({ label, onClick }: NavFloorButtonProps) {
  const { floorSelected } = useSelection();
  return (
    <button
      className={`inline-block px-4 py-2 text-sm font-medium transition-colors text-white focus:relative ${
        floorSelected === label ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-500'
      }`}
      onClick={onClick}
    >
      {label.toString()}
    </button>
  );
}

export default function NavFloorButtons() {
  const { modeSelected, floorSelected, setFloorSelected } = useSelection();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (modeSelected === modeKey['navigation']) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [modeSelected]);

  return (
    <div
      className={`absolute top-1/2 right-4 transform -translate-y-1/2 z-10 transition-all duration-500 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <span className="relative inline-flex -space-y-px overflow-hidden rounded-md bg-blue-600 flex flex-col">
        {Array.from({ length: 9 }, (_, index) => 9 - index).map((value) => (
          <NavFloorButton
            key={value}
            label={value}
            onClick={() => {
              setFloorSelected(floorSelected === value ? 0 : value);
            }}
          />
        ))}
      </span>
    </div>
  );
}
