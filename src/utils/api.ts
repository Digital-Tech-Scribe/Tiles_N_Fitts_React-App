export interface ContactFormData {
  name: string;
  email: string;
  project: string;
}

const API_BASE_URL = import.meta.env.PROD 
  ? '' // In production, the Express server serves the frontend
  : 'http://localhost:3001';

export async function submitContactForm(data: ContactFormData) {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to submit form');
  }

  return response.json();
}
