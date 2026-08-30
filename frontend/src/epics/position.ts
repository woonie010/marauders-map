// api.ts
export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface PositionResponse {
  timestamp: number;
  position: Position;
}

export async function fetchPosition(): Promise<PositionResponse> {
  const response = await fetch('http://127.0.0.1:3000/position/get/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  try {
    const data: PositionResponse = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to parse response as JSON');
  }
}
