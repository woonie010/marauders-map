import { Activity, ActivityEvent } from '@/types/activity';

export async function fetchAllActivities(): Promise<Activity[]> {
  const response = await fetch('http://127.0.0.1:8000/activity/get-all/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  try {
    const data: Activity[] = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to parse response as JSON');
  }
}

export async function fetchNearActivities(): Promise<ActivityEvent[]> {
  const todayDate = new Date().toISOString().split('T')[0];
  const response = await fetch(`http://127.0.0.1:8000/activity/get-near/${todayDate}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  try {
    const data: ActivityEvent[] = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to parse response as JSON');
  }
}
