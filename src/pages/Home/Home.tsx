import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

import DestinationMap from "@/features/maps/components/DestinationMap";
import SearchCategories from "@/components/search/SearchCategories/SearchCategories";

export default function Home() {
  return (
    <Container>
      <section style={{ display: "grid", gap: 32, padding: "32px 0" }}>
        {/* HERO */}
        <section
          style={{
            position: "relative",
            borderRadius: 32,
            overflow: "hidden",
            minHeight: 340,
            display: "flex",
            alignItems: "center",
            padding: "3rem",
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
          }}
        >
          <div style={{ maxWidth: 560, display: "grid", gap: 16 }}>
            <Badge variant="success">Experiencias premium</Badge>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                color: "#ffffff",
                textShadow: "0 4px 16px rgba(0, 0, 0, 0.45)",
              }}
            >
              Descubrí el mundo con experiencias únicas
            </h1>

            <p
              style={{
                margin: 0,
                fontSize: "1.05rem",
                lineHeight: 1.6,
                color: "#f8fafc",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
              }}
            >
              Vuelos, hoteles, autos, cruceros y aventuras diseñadas para
              viajeros que buscan algo más que un simple destino.
            </p>
          </div>
        </section>

        {/* CATEGORÍAS */}
        <SearchCategories />

        {/* MAPA */}
        <section style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <h2 style={{ margin: 0 }}>Destinos destacados de Salta</h2>
            <p style={{ margin: 0, color: "#64748b" }}>
              Explorá los puntos más emblemáticos de la provincia y planificá tu
              próxima aventura desde JGTravel.
            </p>
          </div>

          <DestinationMap />
        </section>
      </section>
    </Container>
  );
}
