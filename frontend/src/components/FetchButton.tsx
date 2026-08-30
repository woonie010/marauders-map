'use client';

import React, { useState } from 'react';
import { fetchPosition, PositionResponse } from '../epics/position';

const PositionButton: React.FC = () => {
  const [position, setPosition] = useState<PositionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      const data = await fetchPosition();
      // setPosition(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Get Position</button>
      {position && (
        <div>
          <p>Timestamp: {position.timestamp}</p>
          <p>
            Position: x={position.position.x}, y={position.position.y}, z={position.position.z}
          </p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default PositionButton;
