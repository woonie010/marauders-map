import React from 'react';
import { VisitorInfo } from '@/data/DummyData';
import CountAreaChart from './CountAreaChart';

const MiniDashBoard = () => {
  return (
    <>
      <div className="flex mt-10 mx-auto justify-center">
        <CountAreaChart title="Visitors Today v/s The Month" visitorData={VisitorInfo} />
      </div>
    </>
  );
};

export default MiniDashBoard;
