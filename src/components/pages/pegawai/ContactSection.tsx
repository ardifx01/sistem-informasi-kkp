import { BuildingIcon } from "@/components/icons/BuildingIcon";
import { ContactInfo } from "@/types";
import { ContactCard } from "./ContactCard";

const CONTACT_DATA: ContactInfo[] = [
  {
    type: "Alamat Rumah Sesuai KTP",
    value: "SIDARUM RT.003 RW.001, KEL. SIDARUM, KEC. KUTOARJO - PURWOREJO",
    iconType: "map",
  },
  {
    type: "Alamat Rumah Domisili",
    value:
      "JALAN KEMBANG IX NO 5A RT 01 RW 03 KELURAHAN KWITANG KECAMATAN SENEN JAKARTA PUSAT",
    iconType: "map",
  },
  {
    type: "Kota/Kode Pos",
    value: "KOTA JAKARTA PUSAT/10420",
    iconType: "map",
  },
  {
    type: "Propinsi/Negara",
    value: "DKI JAKARTA/INDONESIA",
    iconType: "map",
  },
  {
    type: "Telephone Rumah/HP",
    value: "(+62)85743831098",
    iconType: "phone",
  },
  {
    type: "Alamat Kantor",
    value:
      "GEDUNG MINA BAHARI II LT.12 JL MEDAN MERDEKA TIMUR NO.16 JAKARTA 10110",
    iconType: "building",
  },
  {
    type: "Telephone/Ext",
    value: "021-3519070/",
    iconType: "phone",
  },
];

export const ContactSection: React.FC = () => (
  <div
    className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 shadow-xl ${"opacity-100 translate-y-0"}`}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
        <BuildingIcon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-xl font-bold text-blue-900">Informasi Kontak</h3>
    </div>

    <div className="space-y-4">
      {CONTACT_DATA.map((contact, index) => (
        <ContactCard
          key={`${contact.type}-${index}`}
          contact={contact}
          index={index}
        />
      ))}
    </div>
  </div>
);
