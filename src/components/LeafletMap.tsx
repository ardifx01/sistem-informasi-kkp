import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const CustomIcon = L.icon({
  iconUrl: "/assets/77.png", // path ke PNG kamu
  iconSize: [30, 30], // ukuran PNG
  iconAnchor: [10, 35], // titik "tengah bawah"
});

// Data lokasi UPT
const uptLocations = [
  {
    id: 1,
    name: "BALAI BESAR PENANGKAPAN IKAN",
    region: "Semarang, Jawa Tengah",
    lat: -6.948769867687574,
    lng: 110.41824809377214,
    employees: { male: 42, female: 25 },
  },
  {
    id: 2,
    name: "PELABUHAN PERIKANAN SAMUDERA NIZAM ZACHMAN JAKARTA",
    region: "Jakarta Utara, DKI Jakarta",
    lat: -6.0994126921206755,
    lng: 106.79975723040766,
    employees: { male: 39, female: 12 },
  },
  {
    id: 3,
    name: "PELABUHAN PERIKANAN SAMUDERA KENDARI",
    region: "Kendari, Sulawesi Tenggara",
    lat: -3.982701640689434,
    lng: 122.57253661726682,
    employees: { male: 54, female: 12 },
  },
  {
    id: 4,
    name: "PELABUHAN PERIKANAN SAMUDERA CILACAP",
    region: "Cilacap, Jawa Tengah",
    lat: -7.726856397296623,
    lng: 109.0234135865074,
    employees: { male: 42, female: 16 },
  },
  {
    id: 5,
    name: "PELABUHAN PERIKANAN SAMUDERA BUNGUS",
    region: "Padang, Sumatera Barat",
    lat: -1.029937960429952,
    lng: 100.39952082856668,
    employees: { male: 24, female: 12 },
  },
  {
    id: 6,
    name: "PELABUHAN PERIKANAN SAMUDERA BELAWAN",
    region: "Medan, Sumatera Utara",
    lat: 3.7839820670131687,
    lng: 98.71225741019045,
    employees: { male: 31, female: 18 },
  },
  {
    id: 7,
    name: "PELABUHAN PERIKANAN SAMUDERA BITUNG",
    region: "Bitung, Sulawesi Utara",
    lat: -1.45697,
    lng: 125.1895,
    employees: { male: 20, female: 13 },
  },
  {
    id: 8,
    name: "PELABUHAN PERIKANAN NUSANTARA AMBON",
    region: "Ambon, Maluku",
    lat: -3.678798905174189,
    lng: 128.18885624542827,
    employees: { male: 29, female: 10 },
  },
  {
    id: 9,
    name: "PELABUHAN PERIKANAN NUSANTARA PALABUHANRATU",
    region: "Sukabumi, Jawa Barat",
    lat: -6.98739254897458,
    lng: 106.54420852655922,
    employees: { male: 40, female: 10 },
  },
  {
    id: 10,
    name: "PELABUHAN PERIKANAN NUSANTARA TERNATE",
    region: "Ternate, Maluku Utara",
    lat: -0.767720464705649,
    lng: 127.37704999739582,
    employees: { male: 23, female: 9 },
  },
  {
    id: 11,
    name: "PELABUHAN PERIKANAN NUSANTARA PRIGI",
    region: "Trenggalek, Jawa Timur",
    lat: -8.28602225217561,
    lng: 111.7324537034615,
    employees: { male: 34, female: 15 },
  },
  {
    id: 12,
    name: "PELABUHAN PERIKANAN NUSANTARA PEMANGKAT",
    region: "Sambas, Kalimantan Barat",
    lat: -1.199331170800598,
    lng: 108.99118077116421,
    employees: { male: 22, female: 8 },
  },
  {
    id: 13,
    name: "PELABUHAN PERIKANAN NUSANTARA SIBOLGA",
    region: "Sibolga, Sumatera Utara",
    lat: -1.720193536017374,
    lng: 98.79567581349258,
    employees: { male: 26, female: 15 },
  },
  {
    id: 14,
    name: "PELABUHAN PERIKANAN NUSANTARA TUAL",
    region: "Tual, Maluku",
    lat: -5.62878,
    lng: 132.75229,
    employees: { male: 26, female: 5 },
  },
  {
    id: 15,
    name: "PELABUHAN PERIKANAN NUSANTARA KEJAWANAN",
    region: "Cirebon, Jawa Barat",
    lat: -6.734052634690557,
    lng: 108.58142606908832,
    employees: { male: 38, female: 10 },
  },
  {
    id: 16,
    name: "PELABUHAN PERIKANAN NUSANTARA PEKALONGAN",
    region: "Pekalongan, Jawa Tengah",
    lat: -6.857709930667175,
    lng: 109.69205544826815,
    employees: { male: 45, female: 10 },
  },
  {
    id: 17,
    name: "PELABUHAN PERIKANAN NUSANTARA BRONDONG",
    region: "Lamongan, Jawa Timur",
    lat: -6.867969769695164,
    lng: 112.28895843023788,
    employees: { male: 36, female: 15 },
  },
  {
    id: 18,
    name: "PELABUHAN PERIKANAN NUSANTARA TANJUNG PANDAN",
    region: "Belitung, Bangka Belitung",
    lat: -2.743716285818747,
    lng: 107.63301904232839,
    employees: { male: 24, female: 6 },
  },
  {
    id: 19,
    name: "PELABUHAN PERIKANAN NUSANTARA SUNGAILIAT",
    region: "Bangka, Bangka Belitung",
    lat: -1.863950468413297,
    lng: 106.1279322153432,
    employees: { male: 16, female: 9 },
  },
  {
    id: 20,
    name: "PELABUHAN PERIKANAN NUSANTARA PENGAMBENGAN",
    region: "Jembrana, Bali",
    lat: -8.384684044836519,
    lng: 114.5747957736732,
    employees: { male: 23, female: 15 },
  },
  {
    id: 21,
    name: "PELABUHAN PERIKANAN NUSANTARA KARANGANTU",
    region: "Serang, Banten",
    lat: -6.041793676660524,
    lng: 106.16150713068643,
    employees: { male: 17, female: 8 },
  },
  {
    id: 22,
    name: "PELABUHAN PERIKANAN NUSANTARA KWANDANG",
    region: "Gorontalo Utara, Gorontalo",
    lat: -0.8093946151146152,
    lng: 122.9214488345914,
    employees: { male: 19, female: 2 },
  },
  {
    id: 23,
    name: "PELABUHAN PERIKANAN PANTAI TELUK BATANG",
    region: "Kayong Utara, Kalimantan Barat",
    lat: -1.0074987379927087,
    lng: 109.76891412883579,
    employees: { male: 12, female: 2 },
  },
];

export default function LeafletMap() {
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
          <Marker key={upt.id} position={[upt.lat, upt.lng]} icon={CustomIcon}>
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
