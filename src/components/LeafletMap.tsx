import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMapStore } from "@/store/map-store";
import useFetchMap from "@/hooks/useFetchMap";

const ppsIcon = L.icon({
  iconUrl: "/assets/77.png",
  iconSize: [30, 30],
  iconAnchor: [10, 35],
});

const ppnIcon = L.icon({
  iconUrl: "/assets/main-pin.png",
  iconSize: [30, 30],
  iconAnchor: [10, 35],
});

const pppIcon = L.icon({
  iconUrl: "/assets/pin-yellow.png",
  iconSize: [22, 22],
  iconAnchor: [10, 35],
});

const mainIcon = L.icon({
  iconUrl: "/assets/utama.png",
  iconSize: [50, 50],
  iconAnchor: [10, 35],
});

export default function LeafletMap() {
  const { setLocationUpt, data } = useMapStore();
  useFetchMap();
  return (
    <MapContainer
      center={[-2.5489, 118.0149]}
      zoom={4}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>, &copy; <a href="https://www.digitalglobe.com/">DigitalGlobe</a>'
      />

      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
        attribution=""
        opacity={0.5}
      />

      {data.map((upt, i) => {
        const total = upt.employees.male + upt.employees.female;
        return (
          <Marker
            eventHandlers={{
              mouseover: () => {
                setLocationUpt([upt]);
              },
              mouseout: () => {
                setLocationUpt(data);
              },
            }}
            key={i}
            position={[upt.lat, upt.lng]}
            icon={
              upt.name.toLowerCase().includes("pps")
                ? ppsIcon
                : upt.name.toLowerCase().includes("ppn")
                ? ppnIcon
                : upt.name.toLowerCase().includes("ppp")
                ? pppIcon
                : mainIcon
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
