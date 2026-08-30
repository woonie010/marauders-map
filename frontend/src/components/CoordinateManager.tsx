// CoordinateManager.tsx
import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PersonCoords, PersonTransformedCoords, TransformedCoords, PersonInfo } from '../data/Types';
import { Constants } from '../data/Constants';
import { useSelection } from './Context/SelectionContext';

/**
 * useCoordinateManager Hook
 *
 * This custom React hook is responsible for managing person coordinates, transforming them to 3D space,
 * and updating their positions in real-time based on data from a JSON file.
 */
export const useCoordinateManager = (planeRefs: any, planeCoordRefs: any) => {
  // State to store the coordinates for each person
  const [personCoords, setPersonCoords] = useState<PersonCoords>({});
  // State to keep track of the current index for each person's coordinates
  const [indices, setIndices] = useState<{ [key: string]: number }>({});
  // State to store the transformed coordinates (x, z) for rendering
  const [transformedCoords, setTransformedCoords] = useState<PersonTransformedCoords>({});

  const [personInfo, setPersonInfo] = useState<{ [key: string]: PersonInfo }>({}); // New state for person info

  // State to keep track of the number of frames that have passed
  const [frameCount, setFrameCount] = useState(0);
  // This value controls how many frames should pass before updating the position (higher = slower)
  const frameDelay = 20;
  // Polling interval (milliseconds)
  const pollingInterval = 5000; // Poll every 5 seconds

  const { jsonSelected } = useSelection();

  // Function to fetch the coordinates from the JSON file

  const fetchCoordinates = async (filename: string) => {
    try {
      const response = await fetch('/json_generater/' + filename);
      const data: PersonCoords = await response.json();

      // Update personCoords state with new data
      setPersonCoords((prevCoords) => {
        const updatedCoords: PersonCoords = { ...prevCoords };

        // Add new persons or update existing ones
        Object.keys(data).forEach((personKey) => {
          updatedCoords[personKey] = data[personKey];

          // Only initialize index for new persons, keep existing indices
          setIndices((prevIndices) => {
            if (prevIndices[personKey] === undefined) {
              // Check if index for this person exists
              return {
                ...prevIndices,
                [personKey]: 0, // Start at the first coordinate for new person
              };
            } else {
              return prevIndices; // Keep the existing index
            }
          });
        });

        // Remove persons that are no longer in the JSON
        Object.keys(prevCoords).forEach((personKey) => {
          if (!data[personKey]) {
            delete updatedCoords[personKey];
            setIndices((prevIndices) => {
              const newIndices = { ...prevIndices };
              delete newIndices[personKey]; // Remove the index for the removed person
              return newIndices;
            });
            setTransformedCoords((prevTransformedCoords) => {
              const newTransformedCoords = { ...prevTransformedCoords };
              delete newTransformedCoords[personKey]; // Remove the transformed coordinates
              return newTransformedCoords;
            });
            setPersonInfo((prevInfo) => {
              const newInfo = { ...prevInfo };
              delete newInfo[personKey]; // Remove person info
              return newInfo;
            });
          }
        });

        return updatedCoords;
      });
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  // Poll the JSON file every few seconds
  useEffect(() => {
    fetchCoordinates(jsonSelected); // Fetch on mount
    const interval = setInterval(fetchCoordinates, pollingInterval); // Poll every 5 seconds
    return () => clearInterval(interval); // Clear interval on unmount
  }, [jsonSelected]);

  useFrame(() => {
    setFrameCount((prevCount) => prevCount + 1);

    // Only update the coordinates every 'frameDelay' frames
    if (frameCount % frameDelay === 0) {
      Object.keys(personCoords).forEach((personKey) => {
        const coordsArray = personCoords[personKey];
        const currentIndex = indices[personKey];
        // If there are still coordinates left, move the person forward by one
        if (coordsArray && currentIndex < coordsArray.length) {
          const coord = coordsArray[currentIndex];
          const transformed = coordinate_converter(coord.lat, coord.lng, coord.level); // Ensure level is passed correctly

          // Update the transformed coordinates for rendering
          setTransformedCoords((prevCoords) => ({
            ...prevCoords,
            [personKey]: transformed,
          }));

          // Update the personInfo with the lacoordinate_converter coordinate data
          setPersonInfo((prevInfo) => ({
            ...prevInfo,
            [personKey]: {
              lng: coord.lng,
              lat: coord.lat,
              level: coord.level,
              building: coord.building,
            },
          }));

          // Increment the index for this person, ensuring it doesn't exceed the array length
          if (currentIndex + 1 < coordsArray.length) {
            setIndices((prevIndices) => ({
              ...prevIndices,
              [personKey]: currentIndex + 1, // Move to the next coordinate
            }));
          } else {
            // If the person is at the last coordinate, stop incrementing
            setIndices((prevIndices) => ({
              ...prevIndices,
              [personKey]: currentIndex, // Stay at the last index
            }));
          }
        }
      });
    }
  });

  // Updated `coordinate_converter` function with correct return type including y
  const coordinate_converter = (lat: number, lng: number, level: number): TransformedCoords => {
    // Default y position if the level is not found
    let yPos = 0;

    // Get the y position for the corresponding floor from planeRefs
    const floorMesh = planeRefs.current[`f${level}`];
    if (floorMesh) {
      yPos = floorMesh.position.y; // Set y position from the floor mesh
    }

    const floorsize = planeCoordRefs.current[`f${level}`].size;
    const floorOrigin = planeCoordRefs.current[`f${level}`].pos;

    // Return the transformed x, y, z coordinates
    return {
      x: floorOrigin.x + (floorsize.x * (lng - Constants.lng_origin)) / (Constants.lng_edge - Constants.lng_origin),
      y: yPos + 0.1, // Set the y-axis based on the level
      z: floorOrigin.z - (floorsize.z * (lat - Constants.lat_origin)) / (Constants.lat_edge - Constants.lat_origin),
    };
  };

  return {
    transformedCoords,
    personInfo,
  };
};
