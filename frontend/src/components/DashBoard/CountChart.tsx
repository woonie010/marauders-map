import { IdentityCategoryProps } from '@/types/information';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TooltipProps } from 'recharts';

const COLORS = ['#4ADAF9', '#4FC593', '#FFDD86', '#EF7272'];

const CustomTooltip: React.FC<TooltipProps<any, any>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-800 text-white p-2 rounded-lg">
        <p className="font-mono font-semibold">{`${data.name}: ${data.num_individuals}`}</p>
      </div>
    );
  }
  return null;
};

const CountChart: React.FC<IdentityCategoryProps> = (props) => {
  const { title, identitiesData } = props;

  return (
    <div className="flex flex-col justify-center items-center ring-2 rounded-2xl m-5 w-full sm:w-[50%] md:w-[25%] h-[400px] shadow-xl">
      <h1 className="font-mono mt-10 text-2xl font-bold">{title}</h1>
      <div className="grid grid-cols-2 gap-6 p-4 pb-0 text-sm">
        {identitiesData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
            <span className="font-mono">{entry.name}</span>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%">
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            data={identitiesData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="num_individuals"
          >
            {identitiesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CountChart;
