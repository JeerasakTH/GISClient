import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

const MapBox = ({ currentPosition, zoom }) => {
  return (
    <MapContainer
      center={currentPosition}
      zoom={5}
      scrollWheelZoom={true}
      className="map-box"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={currentPosition}>
        <Popup>Here.</Popup>
      </Marker>
      <ChangeMapView coords={currentPosition} />
    </MapContainer>
  );
};

export default MapBox;
