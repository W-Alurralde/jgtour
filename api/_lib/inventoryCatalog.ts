
/**
 * JGTravel - Catálogo autorizado para inventario.
 *
 * Primera etapa:
 * - Valida paquetes turísticos activos.
 * - Consulta el catálogo desde el backend.
 * - No modifica Google Sheets ni Firestore.
 */

interface PackageCatalogItem {
  id?: unknown;
  packageId?: unknown;
}

interface PackagesApiResponse {
  success?: boolean;
  packages?: unknown;
  error?: string;
}

export async function getValidPackageIds(): Promise<
  ReadonlySet<string>
> {
  const apiUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!apiUrl) {
    throw new Error(
      "Falta configurar GOOGLE_APPS_SCRIPT_URL"
    );
  }

  const url = new URL(apiUrl);
  url.searchParams.set("action", "packages");

  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store",
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(
      `Error HTTP consultando paquetes: ${response.status}`
    );
  }

  const result: PackagesApiResponse =
    await response.json();

  if (!result.success || !Array.isArray(result.packages)) {
    throw new Error(
      result.error ||
      "No se pudo obtener el catálogo de paquetes"
    );
  }

  const validIds = new Set<string>();

  for (const item of result.packages) {
    if (
      !item ||
      typeof item !== "object" ||
      Array.isArray(item)
    ) {
      continue;
    }

    const pkg = item as PackageCatalogItem;

    const id = String(
      pkg.id ?? pkg.packageId ?? ""
    ).trim();

    if (id) {
      validIds.add(id);
    }
  }

  return validIds;
}
