import { useEffect, useState } from "react";

import PackageCard from "./PackageCard";

import { getPackages } from "@/features/packages/services/packagesService";

import type { TravelPackage } from "@/features/packages/types/package.types";

import "./PackageSection.css";

export default function PackageSection() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadPackages() {
      try {
        setLoading(true);
        setError(null);

        const data = await getPackages();

        if (mounted) {
          setPackages(data);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "No se pudieron cargar los paquetes"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadPackages();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="packages-section">
        <p>Cargando paquetes JGTravel...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="packages-section">
        <p>No pudimos cargar los paquetes en este momento.</p>
        <small>{error}</small>
      </section>
    );
  }

  if (packages.length === 0) {
    return null;
  }

  return (
    <section className="packages-section">
      <div className="packages-heading">
        <div>
          <span className="packages-eyebrow">
            Paquetes JGTravel
          </span>

          <h2>Experiencias listas para viajar</h2>

          <p>
            Propuestas seleccionadas con alojamiento,
            experiencias y servicios para tu próximo viaje.
          </p>
        </div>
      </div>

      <div className="packages-grid">
        {packages.map((travelPackage) => (
          <PackageCard
            key={travelPackage.id}
            travelPackage={travelPackage}
          />
        ))}
      </div>
    </section>
  );
}