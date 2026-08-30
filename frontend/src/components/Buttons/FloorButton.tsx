import React from 'react';
import { Html } from '@react-three/drei';
import { WallGroup, FloorButtonPos } from '@/data/Constants';
import { useSelection } from '../Context/SelectionContext';

type FloorButtonProps = {
  position: [number, number, number];
  label: string;
  onClick: () => void;
  floorNumber: number;
};

function FloorButton({ position, label, onClick, floorNumber }: FloorButtonProps) {
  const { floorHighlighted, setFloorHighlighted, setFloorSelected } = useSelection();
  return (
    <Html position={position}>
      <div className="absolute top-5 right-5 z-10">
        <button
          className="relative w-10 h-10 bg-blue-500 text-white text-xs rounded-full transition transform hover:scale-110 
                     opacity-70 hover:opacity-100 hover:bg-blue-600"
          onMouseEnter={() => setFloorHighlighted(floorNumber)} // This is where the hover function is called
          onMouseLeave={() => setFloorHighlighted(0)}
        >
          {label}
        </button>
      </div>
    </Html>
  );
}

const meshNames: string[] = [];

// Loop through each object in WallGroup
Object.values(WallGroup).forEach((floor) => {
  Object.values(floor).forEach((meshName) => {
    meshNames.push(meshName);
  });
});

export function FloorButtons({
  onClick,
  building, // Default value
}: {
  onClick: (meshName: string) => void;
  building?: number; // Optional prop
}) {
  return (
    <>
      {Object.entries(FloorButtonPos).map(([buildingNumberStr, floors]) => {
        const buildingNumber = Number(buildingNumberStr);
        // Only show buttons for the specified building, or show all if `building` is 0
        if (building !== buildingNumber) return null;

        return Object.entries(floors).map(([floorKey, position]) => {
          const floorNumber = Number(floorKey);
          const meshes = WallGroup[buildingNumber];

          return (
            <FloorButton
              key={`f${floorNumber}-${floorNumber}`}
              position={position}
              label={floorNumber.toString()}
              onClick={() => onClick(meshes[Number(floorNumber)])}
              floorNumber={floorNumber}
            />
          );
        });
      })}
    </>
  );
}
