import { useEffect, useState } from 'react';
import { Constants } from '@/data/Constants';
import React from 'react';
import { Sphere } from '@react-three/drei';
import { expTimeValue } from '@/components/Tracking/TimeSelection';
import { coordPlaneOrigin, coordPlaneSize } from '@/data/Constants';
import { MeshStandardMaterial } from 'three';

let expData: any;

interface TrackingProps {
  data?: any;
}

const TrackingManager = ({ data }: TrackingProps) => {
  const [positions, setPositions] = useState<Array<{ x: number; y: number; z: number; timestamp: any }>>([]);
  const [recvData, setRecvData] = useState<any>();
  const [timeMeshPair, setTimeMeshPair] = useState<{ [key: string]: JSX.Element }>({});

  expData = recvData;

  useEffect(() => {
    if (data) {
      setRecvData(data);

      const newPositions = data.map((timestamp: any) => {
        const level = timestamp['level'] as number;
        const floorOrigin = coordPlaneOrigin[level];
        const floorSize = coordPlaneSize;

        const x =
          floorOrigin.x +
          (floorSize.x * (timestamp['longitude'] - Constants.lng_origin)) / (Constants.lng_edge - Constants.lng_origin);
        const y = floorOrigin.y + 0.1; // Set the y-axis based on the level
        const z =
          floorOrigin.z -
          (floorSize.z * (timestamp['latitude'] - Constants.lat_origin)) / (Constants.lat_edge - Constants.lat_origin);

        return { x, y, z, timestamp: timestamp['timestamp'] }; // Return x, y, z, and the timestamp
      });

      setPositions(newPositions); // Update the state with the new positions
    }
  }, [data]);

  useEffect(() => {
    if (positions.length > 0) {
      const meshObject: { [key: string]: JSX.Element } = {};

      positions.forEach((pos) => {
        const selected = parseTimestampToSeconds(pos.timestamp) === expTimeValue;
        const scale = selected ? 0.5 : 0.15;
        const color = selected ? 'green' : 'red';

        const renderOrder = selected ? 1 : 0;

        const sphereMesh = (
          <Sphere
            key={pos.timestamp}
            args={[0.5, 32, 32]}
            position={[pos.x, pos.y, pos.z]}
            scale={scale}
            renderOrder={renderOrder}
          >
            <lineBasicMaterial color={color} depthTest={!selected} />
          </Sphere>
        );

        // Store the entire sphere mesh in the object using timestamp as key
        meshObject[pos.timestamp] = sphereMesh;
      });

      setTimeMeshPair(meshObject);
    }
  }, [positions, expTimeValue]);

  const parseTimestampToSeconds = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    return hours * 3600 + minutes * 60 + seconds;
  };

  return <>{Object.values(timeMeshPair)}</>;
};

export { expData };
export default TrackingManager;
