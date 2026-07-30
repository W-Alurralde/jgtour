import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { saltaDestinations } from "../data/salta-destinations";

export default function DestinationMap() {
  return (
    <MapContainer
      center={[-25.0, -65.8]}
      zoom={8}
      style={{ height: "450px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {saltaDestinations.map((destination) => (
        <Marker
          key={destination.id}
          position={[destination.lat, destination.lng]}
        >
          <Popup>
            <strong>{destination.name}</strong>
            <br />
            Categoría: {destination.category}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}