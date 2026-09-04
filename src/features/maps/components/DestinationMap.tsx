import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { saltaDestinations } from "../data/salta-destinations";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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