import React, { useState, useEffect } from 'react';
import { useSelection } from '../Context/SelectionContext';
import { modeKey } from '../Context/SelectionContext';

export default function ViewModeButton() {
  const { modeSelected, isOrthographic, setTwoDChosen } = useSelection();
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
      className={`absolute top-4 right-4 z-10 transition-all duration-500 ease-in-out transform
      ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}
    >
      <span className="relative inline-flex -space-x-px overflow-hidden rounded-md bg-blue-600">
        <button
          className={`inline-block px-4 py-2 text-sm font-medium transition text-white focus:relative ${
            !isOrthographic ? 'bg-blue-700' : 'hover:bg-blue-700'
          }`}
          onClick={() => setTwoDChosen(false)}
        >
          3D
        </button>

        <button
          className={`inline-block px-4 py-2 text-sm font-medium transition text-white focus:relative ${
            isOrthographic ? 'bg-blue-700' : 'hover:bg-blue-700'
          }`}
          onClick={() => setTwoDChosen(true)}
        >
          2D
        </button>
      </span>
    </div>
  );
}
