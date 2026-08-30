import React from 'react';
import { useSelection } from '../Context/SelectionContext';
import { modeKey } from '../Context/SelectionContext';

export default function ModeButton() {
  const { modeSelected, setModeSelected } = useSelection();

  return (
    <div className="absolute top-4 left-4 z-10">
      <span className="relative inline-flex -space-x-px overflow-hidden rounded-md bg-blue-600">
        <button
          className={`inline-block px-4 py-2 text-sm font-medium transition text-white focus:relative ${
            modeSelected === modeKey['exterior'] ? 'bg-blue-700' : 'hover:bg-blue-500'
          }`}
          onClick={() => setModeSelected(modeKey['exterior'])}
        >
          Exterior
        </button>

        <button
          className={`inline-block px-4 py-2 text-sm font-medium transition text-white focus:relative ${
            modeSelected === modeKey['navigation'] ? 'bg-blue-700' : 'hover:bg-blue-500'
          }`}
          onClick={() => setModeSelected(modeKey['navigation'])}
        >
          Navigate
        </button>

        <button
          className={`inline-block px-4 py-2 text-sm font-medium transition text-white focus:relative ${
            modeSelected === modeKey['building'] ? 'bg-blue-700' : 'hover:bg-blue-500'
          }`}
          onClick={() => setModeSelected(modeKey['building'])}
        >
          Building
        </button>
      </span>
    </div>
  );
}
