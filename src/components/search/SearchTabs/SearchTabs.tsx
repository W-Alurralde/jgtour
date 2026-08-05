import { useState } from "react";
import FlightSearchForm from "@/features/flights/components/FlightSearchForm";
import HotelSearchForm from "@/features/hotels/components/HotelSearchForm";

type Tab =
  | "flights"
  | "hotels"
  | "cars"
  | "restaurants"
  | "bus"
  | "disney"
  | "cruises";

const tabs = [
  { id: "flights", label: "Vuelos", icon: "fa-plane-departure" },
  { id: "hotels", label: "Hoteles", icon: "fa-hotel" },
  { id: "cars", label: "Autos", icon: "fa-car-side" },
  { id: "restaurants", label: "Food", icon: "fa-utensils" },
  { id: "bus", label: "Bus", icon: "fa-bus" },
  { id: "disney", label: "Disney", icon: "fa-wand-magic-sparkles" },
  { id: "cruises", label: "Cruceros", icon: "fa-ship" },
] as const;

export default function SearchTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("flights");

  return (
    <section className="search-tabs">
      <div className="tabs-scroll">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={`fa-solid ${tab.icon}`} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="tab-panel">
        {activeTab === "flights" && <FlightSearchForm />}
        {activeTab === "hotels" && <HotelSearchForm />}

        {activeTab === "cars" && <p>🚧 Próximamente: Rent a Car</p>}
        {activeTab === "restaurants" && <p>🚧 Próximamente: Restaurantes</p>}
        {activeTab === "bus" && <p>🚧 Próximamente: Bus Trips</p>}
        {activeTab === "disney" && <p>🚧 Próximamente: Disney Experience</p>}
        {activeTab === "cruises" && <p>🚧 Próximamente: Cruceros</p>}
      </div>
    </section>
  );
}