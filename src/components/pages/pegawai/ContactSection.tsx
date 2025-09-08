import { BuildingIcon } from "@/components/icons/BuildingIcon";
import { ContactInfo, PegawaiDetail } from "@/types";
import { ContactCard } from "./ContactCard";
import { getFormarttedValue } from "@/utils/getForamatteddValue";

interface ContactSectionProps {
  dataPegawai: PegawaiDetail;
}

export function ContactSection(props: ContactSectionProps) {
  const { dataPegawai } = props;

  const keysToPick: (keyof PegawaiDetail)[] = [
    "alamat",
    "kota",
    "kode_pos",
    "propinsi",
    "negara2",
    "no_hp_sms",
    "no_npwp",
  ];

  const labelMap: Record<string, string> = {
    alamat: "Alamat Lengkap",
    kota: "Kota",
    kode_pos: "Kode Pos",
    propinsi: "Provinsi",
    negara2: "Negara",
    no_hp_sms: "No HP",
    no_npwp: "NPWP",
  };

  const contactData: ContactInfo[] = keysToPick.map((k) => ({
    type: labelMap[k],
    value: getFormarttedValue(
      dataPegawai[k as keyof typeof dataPegawai].toString().split(":")
    ),
  }));
  return (
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
        {contactData.map((contact, index) => (
          <ContactCard
            key={`${contact.type}-${index}`}
            contact={contact}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
