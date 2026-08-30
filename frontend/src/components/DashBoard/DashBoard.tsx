'use client';
import React, { useState, useEffect } from 'react';
import { IdentityInfo, VisitorInfo } from '@/data/DummyData';
import CharacterCategory from './IndividualCategory';
import CountChart from './CountChart';
import CountAreaChart from './CountAreaChart';
import ActivityList from './ActivityList';
import { ExpandableActivityCard } from './ExpandableCard';
import { Activity } from '@/types/activity';
import { fetchAllActivities } from '@/epics/activity';
import { fetchCategoryIndividualCounts } from '@/epics/category';
import { CategoriesProps } from '@/types/category';

const DashBoard = () => {
  const [activityItems, setActivityItems] = useState<Activity[]>([]);
  const [categoryCountInfo, setCategoryCountInfo] = useState<CategoriesProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activities_data = await fetchAllActivities();
        const category_individual_count_data = await fetchCategoryIndividualCounts();
        setActivityItems(activities_data);
        setCategoryCountInfo(category_individual_count_data.categories);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="mt-10">
        <h1 className="font-mono text-5xl text-bold text-center m-2">DASHBOARD</h1>
        <CharacterCategory individualCategories={categoryCountInfo} />
        <div className="flex flex-row w-[80%] m-auto">
          <CountChart title="Identity Category" identitiesData={categoryCountInfo} />
          <CountAreaChart title="Visitors Today v/s The Month" visitorData={VisitorInfo} />
        </div>
        <ActivityList activities_list={activityItems} />
      </div>
    </>
  );
};

export default DashBoard;
