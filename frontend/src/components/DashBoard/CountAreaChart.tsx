'use client';
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { curveCardinal } from 'd3-shape';
import { TooltipProps } from 'recharts';

import { visitorInformationProps } from '@/types/information';

const cardinal = curveCardinal.tension(0.2);

const CustomTooltip: React.FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { visitorToday, visitorMonth } = payload[0].payload;
    return (
      <div className="font-mono bg-gray-800 text-white p-4 px-5 rounded-lg shadow-lg">
        <p className="font-semibold pb-1 text-lg text-sky-100">{`Time: ${label}`}</p>
        <p className="text-sm">{`Visitor Today: ${visitorToday}`}</p>
        <p className="text-sm">{`Visitor Month: ${visitorMonth}`}</p>
      </div>
    );
  }
  return null;
};

const CountAreaChart: React.FC<visitorInformationProps> = (props) => {
  const { title, visitorData } = props;
  return (
    <>
      <div className="flex flex-col justify-center items-center ring-2 rounded-2xl p-5 pb-15 m-5 w-[75%] h-[400px] shadow-xl">
        <h1 className="font-mono mt-5 mb-5 text-2xl font-bold">{title}</h1>
        <ResponsiveContainer width="100%">
          <AreaChart
            data={visitorData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area type={cardinal} dataKey="visitorToday" stroke="#B27CC5" fill="#B27CC5" fillOpacity={0.5} />
            <Area type={cardinal} dataKey="visitorMonth" stroke="#50BCD4" fill="#50BCD4" fillOpacity={0.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default CountAreaChart;
