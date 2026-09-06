import type {
  PackagesResponse,
  TravelPackage,
} from "@/features/packages/types/package.types";

const PACKAGES_API_URL =
  import.meta.env.VITE_PACKAGES_API_URL;

export async function getPackages(): Promise<TravelPackage[]> {
  if (!PACKAGES_API_URL) {
    throw new Error(
      "Falta la variable de entorno VITE_PACKAGES_API_URL"
    );
  }

  const response = await fetch(
    `${PACKAGES_API_URL}?action=packages`
  );

  if (!response.ok) {
    throw new Error(
      `Error consultando paquetes: ${response.status}`
    );
  }

  const data: PackagesResponse = await response.json();

  if (!data.success) {
    throw new Error(
      data.error || "No se pudieron obtener los paquetes"
    );
  }

  return data.packages;
}