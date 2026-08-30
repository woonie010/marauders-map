import React, { useEffect } from 'react';
import { Html } from '@react-three/drei';
import { WallGroup, BuildingButtonPos } from '@/data/Constants';
import { useSelection, modeKey } from '../Context/SelectionContext';

type BuildingButtonProps = {
  position: [number, number, number];
  label: string;
  onClick: () => void;
};

function BuildingButton({ position, label, onClick }: BuildingButtonProps) {
  return (
    <Html position={position}>
      <div className="absolute top-5 right-5 z-10">
        <button
          className="relative w-20 h-10 bg-blue-600 opacity-70 text-white font-medium text-xs rounded-full transition transform hover:scale-105 
                     hover:opacity-100 hover:bg-blue-700"
          onClick={onClick}
        >
          {label}
        </button>
      </div>
    </Html>
  );
}

Object.entries(BuildingButtonPos).forEach(([floorKey, pos]) => {
  const floorNumber = Number(floorKey);
});

export function BuildingButtons({
  onClick,
  building, // Default value
}: {
  onClick: (buildingNumber: number) => void;
  building?: number; // Optional prop
}) {
  const { modeSelected, setBuildingSelected, buildingSelected, setFloorSelected } = useSelection();
  return (
    <>
      {Object.entries(BuildingButtonPos).map(([buildingKey, position]) => {
        const buildingNumber = Number(buildingKey);
        if (modeSelected !== modeKey['building'] || (building !== 0 && building !== buildingNumber)) return null;

        return (
          <BuildingButton
            key={`b${buildingNumber}`}
            position={position as [number, number, number]} // Ensure position is correctly typed
            label={`Building ${buildingNumber}`} // Adjust label as needed
            onClick={() => onClick(buildingNumber)}
          />
        );
      })}
    </>
  );
}
