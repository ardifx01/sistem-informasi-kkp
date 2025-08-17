import { UserIcon } from "@/components/icons/UserIcon";
import InfoCard from "./InfoCard";
import { PegawaiDetail, PersonalInfo } from "@/types";
import { getFormarttedKey } from "@/utils/getFormarttedKey";
import { getFormarttedValue } from "@/utils/getForamatteddValue";

interface PersonalDataSectionProps {
  dataPegawai: PegawaiDetail;
}

export function PersonalDataSection(props: PersonalDataSectionProps) {
  const { dataPegawai } = props;

  const personalData: PersonalInfo[] = Object.keys(dataPegawai).map((k) => ({
    label: getFormarttedKey(k.split("_")),
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
