import { UserIcon } from "@/components/icons/UserIcon";
import InfoCard from "./InfoCard";
import { PegawaiDetail, PersonalInfo } from "@/types";
import { getFormarttedValue } from "@/utils/getForamatteddValue";

interface PersonalDataSectionProps {
  dataPegawai: PegawaiDetail;
}

export function PersonalDataSection(props: PersonalDataSectionProps) {
  const { dataPegawai } = props;

  const keysToPick: (keyof PegawaiDetail)[] = [
    "nama",
    "nip",
    "agama",
    "nama_jab",
    "jenis_kel",
    "stat_kawin",
    "gol_darah",
    "pend_akhir",
    "nama_unker",
    "almt_email",
    "no_npwp",
    "tmp_lahir",
    "tgl_lahir",
    "nama_sek",
    "prog_studi",
    "stat_kepeg",
    "diklatpim",
  ];

  const labelMap: Record<string, string> = {
    nama: "Nama Lengkap",
    nip: "NIP",
    agama: "Agama",
    nama_jab: "Jabatan",
    jenis_kel: "Jenis Kelamin",
    stat_kawin: "Status Perkawinan",
    gol_darah: "Golongan Darah",
    pend_akhir: "Pendidikan Terakhir",
    nama_unker: "Unit Kerja",
    almt_email: "Email",
    no_npwp: "NPWP",
    tmp_lahir: "Tempat Lahir",
    tgl_lahir: "Tanggal Lahir",
    nama_sek: "Sekolah/Universitas",
    prog_studi: "Program Studi",
    stat_kepeg: "Status Kepegawaian",
    diklatpim: "Diklat",
  };

  const personalData: PersonalInfo[] = keysToPick.map((k) => ({
    label: labelMap[k],
    value: getFormarttedValue(
      dataPegawai[k as keyof typeof dataPegawai].toString().split(":")
    ),
  }));

  return (
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
          {personalData.map((item, index) => (
            <InfoCard key={`${item.label}-${index}`} data={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default PersonalDataSection;
