export const categories = [
  { id: "flights", label: "Vuelos", icon: "fa-plane-departure" },
  { id: "hotels", label: "Hoteles", icon: "fa-hotel" },
  { id: "cars", label: "Autos", icon: "fa-car-side" },
  { id: "food", label: "Food", icon: "fa-utensils" },
  { id: "buses", label: "Bus", icon: "fa-bus" },
  { id: "disney", label: "Disney", icon: "fa-ticket" },
  { id: "cruises", label: "Cruceros", icon: "fa-ship" },
  { id: "experiences", label: "Experiencias", icon: "fa-person-hiking" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
