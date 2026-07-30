export interface DestinationMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: "wine" | "nature" | "culture";
}

export const saltaDestinations: DestinationMarker[] = [
  {
    id: "cafayate",
    name: "Cafayate",
    lat: -26.0735,
    lng: -65.9763,
    category: "wine",
  },
  {
    id: "cachi",
    name: "Cachi",
    lat: -25.1203,
    lng: -66.1656,
    category: "nature",
  },
  {
    id: "salta-capital",
    name: "Salta Capital",
    lat: -24.7829,
    lng: -65.4232,
    category: "culture",
  },
];