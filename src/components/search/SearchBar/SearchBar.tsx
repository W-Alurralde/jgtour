import { useState } from "react";
import TravelersPopover from "./components/TravelersPopover";
import "./SearchBar.css";
import { searchCategories } from "./categories";

export default function SearchBar() {
  const [showTravelers, setShowTravelers] = useState(false);
  const [activeCategory, setActiveCategory] = useState("flights");

  const [travelers, setTravelers] = useState({
    adults: 2,
    children: 1,
    pets: 1,
    cabinClass: "economy" as const,
  });

  const summary = `${travelers.adults} adultos · ${travelers.children} niño · ${travelers.pets} mascota · Económica`;

  return (
    <div className="search-bar">
      <div className="category-strip">
        {searchCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`category-pill ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="category-icon">
              {category.id === "flights" && "✈️"}
              {category.id === "hotels" && "🏨"}
              {category.id === "buses" && "🚌"}
              {category.id === "cruises" && "🛳️"}
              {category.id === "food" && "🍽️"}
              {category.id === "cars" && "🚗"}
              {category.id === "disney" && "🏰"}
            </span>

            {category.label}
          </button>
        ))}
      </div>
      <div className="search-panel">
        <div className="search-field">
          <label>Lugar</label>
          <input defaultValue="Salta, Argentina" />
        </div>

        <div className="search-field">
          <label>Desde</label>
          <input type="date" defaultValue="2026-08-05" />
        </div>

        <div className="search-field">
          <label>Hasta</label>
          <input type="date" defaultValue="2026-08-15" />
        </div>

        <div className="search-field travelers-trigger-wrapper">
          <label>Viajeros y clase</label>

          <button
            type="button"
            className="travelers-trigger"
            onClick={() => setShowTravelers((prev) => !prev)}
          >
            {summary}
          </button>

          {showTravelers && (
            <TravelersPopover
              {...travelers}
              onChange={setTravelers}
              onApply={() => setShowTravelers(false)}
            />
          )}
        </div>

        <div className="search-field">
          <label>Voucher / Cupón</label>
          <input placeholder="JGT2026" />
        </div>

        <button className="search-submit" type="button">
          🔍 Buscar
        </button>
      </div>
    </div>
  );
}
