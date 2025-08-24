import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { uptLocations } from "@/utils/uptLocations";
import { useMapStore } from "@/store/map-store";

const CustomIcon = L.icon({
  iconUrl: "/assets/77.png", // path ke PNG kamu
  iconSize: [30, 30], // ukuran PNG
  iconAnchor: [10, 35], // titik "tengah bawah"
});

const mainIcon = L.icon({
  iconUrl: "/assets/main-pin.png",
  iconSize: [28, 28],
  iconAnchor: [10, 35],
});

export default function LeafletMap() {
  const { setLocationUpt } = useMapStore();
  return (
    <MapContainer
      center={[-2.5489, 118.0149]} // posisi tengah Indonesia
      zoom={4}
      style={{ height: "100%", width: "100%" }}
    >
      {/* Satellite Base Layer - Warna bumi asli */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>, &copy; <a href="https://www.digitalglobe.com/">DigitalGlobe</a>'
      />

      {/* Road overlay untuk detail jalan */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
        attribution=""
        opacity={0.5}
      />

      {/* Marker + Tooltip */}
      {uptLocations.map((upt) => {
        const total = upt.employees.male + upt.employees.female;
        return (
          <Marker
            eventHandlers={{
              mouseover: () => {
                setLocationUpt([upt]);
              },
              mouseout: () => {
                setLocationUpt(uptLocations);
              },
            }}
            key={upt.id}
            position={[upt.lat, upt.lng]}
            icon={
              upt.name.toLowerCase().includes("pusat") ? mainIcon : CustomIcon
            }
          >
            <Tooltip direction="top">
              <div>
                <strong>{upt.name}</strong> <br />
                <em>{upt.region}</em> <br />
                Laki-laki: {upt.employees.male} <br />
                Perempuan: {upt.employees.female} <br />
                Total: {total}
              </div>
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
