import { useState } from "react";
import MapBox from "./MapBox";
import TableAirport from "./TableAirport";
import Logout from "../component/Logout";

const Dashboard = () => {
  const [currentPosition, setCurrentPosition] = useState([
    13.736717, 100.523186,
  ]);
  const [zoom, setZoom] = useState(5);

  const handleGetInfo = (e, info) => {
    const newPosition = [info.lat, info.lon];
    setZoom(13);
    setCurrentPosition(newPosition);
  };

  return (
    <div className="map-card">
      <div className="navbar">
        <Logout />
      </div>
      <MapBox currentPosition={currentPosition} zoom={zoom} />
      <TableAirport handleGetInfo={handleGetInfo} />
    </div>
  );
};

export default Dashboard;
