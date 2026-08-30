import { User } from '@/types/admin';

export async function fetchAllUsers(): Promise<User[]> {
  const response = await fetch('http://127.0.0.1:8000/api/get-users/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  try {
    const data: User[] = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to parse response as JSON');
  }
}

export async function updateStaffStatus(username: string, isStaff: boolean) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/permision-update/${username}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_staff: isStaff }), // Send is_staff data
    });

    if (response.ok) {
      alert('User staff status updated successfully.');
      return true;
    } else {
      const errorData = await response.json();
      console.error('Error updating staff status:', errorData);
      alert('Error updating staff status: ' + (errorData.error || 'Unknown error.'));
      return false;
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
    return false;
  }
}
