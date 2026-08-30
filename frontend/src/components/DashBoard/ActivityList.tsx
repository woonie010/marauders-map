'use client';
import React from 'react';
import { ExpandableActivityCard } from './ExpandableCard';
import { ActivityListProps } from '@/types/activity';

const ActivityList: React.FC<ActivityListProps> = (props) => {
  const { activities_list } = props;
  return (
    <>
      <div className="font-mono p-4 w-[78%] m-auto my-5 ring-2 rounded-xl shadow-xl overflow-hidden dark:bg-gray-900">
        <h1 className="text-4xl font-extrabold uppercase p-2 px-8 leading-7 text-white text-center my-5 underline decoration-solid underline-offset-8">
          Event List
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p>
        {<ExpandableActivityCard activities_list={activities_list} />}
      </div>
    </>
  );
};

export default ActivityList;
