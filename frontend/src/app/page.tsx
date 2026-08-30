'use client';

import Head from 'next/head';
import ModelView from '@/components/3D/ModelView';
import MiniDashBoard from '@/components/DashBoard/MiniDashBoard';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PositionButton from '@/components/FetchButton';
import { useEffect, useState } from 'react';

import { SelectionProvider } from '../components/Context/SelectionContext';
import LoadingScreen from '../components/LoadingScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false); // Set loading to false after async tasks are done
    };

    loadApp();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SelectionProvider>
        <Head>
          <title>Marauders Map: Real-Time Magical Navigation</title>
        </Head>
        <ModelView />
        <div className="absolute top-5 right-5 z-10">
          <button
            className="absolute w-10 h-10 bg-grey-500 text-white text-xs rounded-full transition transform hover:scale-110 
                     opacity-30 hover:opacity-100 hover:bg-blue-600"
          >
            Hi!
          </button>
        </div>
        <MiniDashBoard />
        <PositionButton />
      </SelectionProvider>
    </>
  );
}
