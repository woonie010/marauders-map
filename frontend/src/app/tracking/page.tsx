'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TimeSelection from '@/components/Tracking/TimeSelection';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Lights from '@/components/Lights';
import School from '@/components/3D/School';
import LoadingScreen from '@/components/LoadingScreen';

const TrackingPage: React.FC = () => {
  const searchParams = useSearchParams();
  const individualId = searchParams.get('individualId'); // Accessing individualId from URL query
  const date = searchParams.get('date'); // Accessing date from URL query

  const [dataLoaded, setDataLoaded] = useState(false); // Tracks data load completion
  const [data, setData] = useState<any>([]); // Stores fetched tracking data
  const [loading, setLoading] = useState<boolean>(true); // Tracks loading state for data fetch
  const [error, setError] = useState<string | null>(null); // Stores any error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensures individualId and date are defined before fetching data
        if (individualId && date) {
          const response = await fetch(`http://127.0.0.1:8000/capture/positions/${individualId}/${date}/`);
          if (!response.ok) {
            throw new Error('Failed to fetch data'); // Handles non-OK responses
          }
          const result = await response.json();
          setData(result); // Assumes API returns data array
        }
      } catch (error) {
        console.error(error);
        setError('There was an error fetching the data.'); // Displays fetch error message
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [individualId, date]);

  useEffect(() => {
    setDataLoaded(true); // Sets dataLoaded to true after data is fetched
  }, [data]);

  if (loading) {
    return <LoadingScreen />; // Displays loading screen during data fetch
  }

  if (error) {
    return <div>{error}</div>; // Displays error message if fetch fails
  }

  return (
    dataLoaded && ( // Renders component only if data is loaded
      <div className="relative w-full h-[100vh]">
        <section className="relative h-full w-full">
          <Canvas>
            <ambientLight intensity={1} />
            <Lights />
            <PerspectiveCamera />
            <OrbitControls />
            <School isMain={false} personData={data} />
          </Canvas>
        </section>

        {/* TimeSelection Component - Overlayed */}
        <div className="absolute top-5 left-5 z-10 w-[300px] h-[300px] bg-customBlue_900 p-5 rounded-md">
          <TimeSelection initialDate={date || new Date().toISOString().split('T')[0]} />
        </div>
      </div>
    )
  );
};

export default TrackingPage;
