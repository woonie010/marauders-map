// Activities
export interface Activity {
  id: number;
  name: string;
  description: string;
  status: string;
  content: string;
  location__floor: number;
  location__building: number;
}

export interface ActivityEvent extends Activity {
  date: string;
}

export interface ActivityListProps {
  activities_list: Activity[];
}
