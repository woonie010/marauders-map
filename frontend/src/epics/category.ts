import { CategoryIndividualsCountProps } from '@/types/category';

export async function fetchCategoryIndividualCounts(): Promise<CategoryIndividualsCountProps> {
  const response = await fetch('http://127.0.0.1:8000/category/get-count/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  try {
    const data: CategoryIndividualsCountProps = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to parse response as JSON');
  }
}
