import { useState } from "react";

import FlightSearchForm from "@/features/flights/components/FlightSearchForm";
import HotelSearchForm from "@/features/hotels/components/HotelSearchForm";
import ExperienceSection from "@/features/experiences/components/ExperienceSection";

import { categories, type CategoryId } from "./categories";
import "./SearchCategories.css";

export default function SearchCategories() {
  const [active, setActive] = useState<CategoryId>("flights");

  return (
    <section className="search-categories">
      <div className="category-grid">
        {categories.map((item) => (
          <button
            key={item.id}
            className={`category-card ${active === item.id ? "active" : ""}`}
            onClick={() => setActive(item.id)}
          >
            <i className={`fa-solid ${item.icon}`} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="search-panel">
        {active === "flights" && <FlightSearchForm />}
        {active === "hotels" && <HotelSearchForm />}

        {active === "cars" && <p>🚧 Próximamente: Rent a Car</p>}
        {active === "food" && (
          <p>🚧 Próximamente: Restaurantes y experiencias gastronómicas</p>
        )}
        {active === "buses" && <p>🚧 Próximamente: Bus Trips y promociones</p>}
        {active === "disney" && <p>🚧 Próximamente: Disney Experience</p>}
        {active === "cruises" && (
          <p>🚧 Próximamente: Cruceros y paquetes completos</p>
        )}
        {active === "experiences" && <ExperienceSection />}
      </div>
    </section>
  );
}
