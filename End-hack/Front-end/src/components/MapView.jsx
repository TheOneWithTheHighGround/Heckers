import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ issues }) => {
  useEffect(() => {
    // Force a re-render of the map container when the component mounts
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={5} 
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {issues.map((issue) => (
          <Marker key={issue.id} position={issue.location}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{issue.title}</h3>
                <p className="text-sm">{issue.description}</p>
                <p className="text-xs mt-1 text-gray-600">Status: {issue.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
