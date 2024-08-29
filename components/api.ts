const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const apiFetch = async (endpoint: string, options?: RequestInit) => {
  const token = localStorage.getItem('X-User-Token');

  if (token) {
    options = {
      ...options,
      headers: {
        ...options?.headers,
        'X-User-Token': token,
      },
    };
  }
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
};
