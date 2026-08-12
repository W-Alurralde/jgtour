const API_BASE = import.meta.env.VITE_APP_API_BASE || "";

export async function apiGet<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}