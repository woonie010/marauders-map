import { Individual } from '@/types/individual';

export async function fetchAllIndividuals(): Promise<Individual[]> {
  const response = await fetch('http://127.0.0.1:8000/individual/get-all/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  try {
    const data: Individual[] = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to parse response as JSON');
  }
}
