import "./ExperienceSection.css";
const experiences = [
  {
    name: "Trekking",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Alpinismo",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ski",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Turismo",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Navegación",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Trail Running",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Fotografía",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Escalada",
    image:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ExperienceSection() {
  return (
    <section style={{ display: "grid", gap: 24 }}>
      <div>
        <h2 style={{ marginBottom: 8 }}>Experiencias para cada aventura</h2>
        <p style={{ color: "#64748b", margin: 0 }}>
          Descubrí actividades únicas para explorar Argentina y el mundo con
          JGTravel.
        </p>
      </div>

      <div className="experience-grid">
        {experiences.map((item) => (
          <article key={item.name} className="experience-card">
            <div className="experience-image-wrapper">
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/800x500/e2e8f0/64748b?text=JGTravel";
                }}
                className="experience-image"
              />
            </div>

            <div className="experience-content">
              <h3>{item.name}</h3>
              <p>Explorá experiencias únicas con JGTravel.</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
