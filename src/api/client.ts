export async function apiFetch(url: string, options?: RequestInit) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return response.json();
}