import { CharRefsType } from '@/data/Types';
import { MutableRefObject, useEffect, useState } from 'react';
import { useSelection } from '../Context/SelectionContext';
import { floor } from 'three/webgpu';
import { Html } from '@react-three/drei';

interface FloorInfoCard {
  charRef: MutableRefObject<CharRefsType>;
}

/**
 * FloorInfoCard Component
 *
 * This component displays information about the selected building and highlighted floor,
 * including the number of people on the floor or in the entire building. It updates based on
 * the current building and floor selections.
 */
const FloorInfoCard = ({ charRef }: FloorInfoCard) => {
  const { buildingSelected, floorHighlighted } = useSelection();
  const [peopleCount, setPeopleCount] = useState<number>(0);
  useEffect(() => {
    if (buildingSelected !== 0 && floorHighlighted === 0) {
      setPeopleCount(0);
    }

    let counter = 0;
    if (buildingSelected === 0) {
      setPeopleCount(0);
    } else if (buildingSelected !== 0 && floorHighlighted !== 0 && charRef.current[buildingSelected]) {
      counter = 0;
      if (charRef.current[buildingSelected][floorHighlighted]) {
        charRef.current[buildingSelected][floorHighlighted].forEach((_) => {
          counter += 1;
        });
      } else {
        counter = 0;
      }
      setPeopleCount(counter);
    } else if (buildingSelected !== 0 && floorHighlighted === 0) {
      Object.keys(charRef.current[buildingSelected]).forEach((floor) => {
        console.log(charRef.current[buildingSelected][Number(floor)]);
        charRef.current[buildingSelected][Number(floor)].forEach((_) => {
          counter += 1;
          setPeopleCount(counter);
        });
      });
    }
  }, [buildingSelected, floorHighlighted]);

  return (
    buildingSelected !== 0 && (
      <Html>
        <div className="absolute top-1/2 right-20 transform -translate-y-1/2 w-64 bg-blue-700 bg-opacity-90 text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Building: {buildingSelected}</h3>
            {floorHighlighted !== 0 && <h3 className="text-lg font-semibold">Floor: {floorHighlighted}</h3>}
          </div>
          <p>
            <strong className="text-blue-200">Number of people: {peopleCount}</strong> {}
          </p>
        </div>
      </Html>
    )
  );
};

export default FloorInfoCard;
