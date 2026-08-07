export const searchCategories = [
  { id: "flights", label: "Vuelos", icon: "fa-plane-departure" },
  { id: "hotels", label: "Hoteles", icon: "fa-hotel" },
  { id: "buses", label: "Bus", icon: "fa-bus" },
  { id: "cruises", label: "Cruceros", icon: "fa-ship" },
  { id: "food", label: "Food", icon: "fa-utensils" },
  { id: "cars", label: "Autos", icon: "fa-car-side" },
  { id: "disney", label: "Disney", icon: "fa-ticket" },
] as const;

export type SearchCategoryId =
  typeof searchCategories[number]["id"];