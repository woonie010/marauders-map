import { ActivityItemProps } from '@/types/information';
import Badges from '../Common/Badge';
import React from 'react';

const ActivityItem: React.FC<ActivityItemProps> = (props) => {
  const { title, description, status, statusColor } = props;
  return (
    <>
      <div className="flex flex-row m-2 px-5 py-2 justify-between text-left">
        <h1 className="text-xl font-semibold text-customBlue_300 w-[30%]">{title}</h1>
        <p className="text-stone-300 w-[60%]">{description}</p>
        <Badges colorTheme={statusColor} context={status} />
      </div>
    </>
  );
};

export default ActivityItem;
