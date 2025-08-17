import { UserIcon } from "@/components/icons/UserIcon";
import InfoCard from "./InfoCard";
import { PersonalInfo } from "@/types";

const PERSONAL_DATA: PersonalInfo[] = [
  {
    label: "Nama",
    value: "Annisa Izzatul Jannah, S.Pd",
    hasIcon: true,
  },
  { label: "NIP", value: "199105212014032001" },
  {
    label: "KARPEG/KARIS-KARSU/NPWP",
    value: "047/KEP/KARPEG/2016/AB 000077426686745348310000",
  },
  {
    label: "Tempat/Tanggal Lahir",
    value: "PURWOREJO/21-05-1991",
    hasIcon: true,
  },
  { label: "Jenis Kelamin", value: "Perempuan" },
  { label: "Agama", value: "ISLAM" },
  { label: "Status Keluarga", value: "Kawin" },
  {
    label: "Pendidikan Akhir",
    value: "S1/UNIVERSITAS PERSADA INDONESIA YAI/2021",
    hasIcon: true,
  },
  { label: "Fakultas/Jurusan/Prodi", value: "/SISTEM INFORMASI" },
  {
    label: "Unit Kerja",
    value:
      "SEKRETARIAT DITJEN PERIKANAN TANGKAP\nDIREKTORAT JENDERAL PERIKANAN TANGKAP\nSUMBER DAYA MANUSIA APARATUR DAN ORGANISASI",
    hasIcon: true,
  },
  { label: "Tim Kerja", value: "-" },
  { label: "Diklat Penjenjangan", value: "-" },
  {
    label: "Pangkat,Golongan,TMT GOL/TMT CPNS",
    value: "Penata Muda, III/a, 01-04-2022 / 01-03-2014",
  },
  { label: "Masa Kerja Golongan", value: "9 Tahun 5 Bulan" },
  { label: "Masa Kerja Keseluruhan", value: "11 Tahun 5 Bulan" },
  {
    label: "Jabatan/TMT/TMT Awal Jabatan",
    value: "ARSIPARIS PERTAMA / 31-10-2023 / -",
  },
  { label: "Jabatan Tambahan", value: "-" },
  { label: "Bidang Keahlian", value: "-" },
  { label: "kampus", value: "199105212014032001" },
];

const PersonalDataSection: React.FC = () => (
  <div className="lg:col-span-3 space-y-8">
    <section>
      <div className="flex items-center gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg border border-blue-400/20">
            <UserIcon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-blue-900 tracking-tight">
            I. DATA PRIBADI
          </h2>
        </div>
        <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-400 via-blue-300 to-transparent rounded-full" />
      </div>

      <div className="grid gap-6">
        {PERSONAL_DATA.map((item, index) => (
          <InfoCard key={`${item.label}-${index}`} data={item} index={index} />
        ))}
      </div>
    </section>
  </div>
);

export default PersonalDataSection;
