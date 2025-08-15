import { PersonalInfo } from "@/types";
import { getPersonalIcon } from "./GetPersonalIcon";
import { ANIMATION_DELAYS } from "@/utils/detailPegawai";

const InfoCard: React.FC<{
  data: PersonalInfo;
  index: number;
  isLoaded: boolean;
}> = ({ data, index, isLoaded }) => {
  const isImportantField = (label: string): boolean => {
    const importantFields = ["Unit Kerja", "Jabatan/TMT/TMT Awal Jabatan"];
    return importantFields.includes(label);
  };
  const isImportant = isImportantField(data.label);
  const delay = `${index * ANIMATION_DELAYS.PERSONAL_CARD_BASE}ms`;

  return (
    <div
      className={`group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 
                 hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10
                 hover:-translate-y-1 ${
                   isLoaded
                     ? "opacity-100 translate-y-0"
                     : "opacity-0 translate-y-2"
                 }`}
      style={{
        transitionDelay: delay,
        animation: isLoaded ? `fadeInUp 0.6s ease-out ${delay} forwards` : "",
      }}
    >
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300 shadow-md shadow-blue-400/50" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            {data.hasIcon && (
              <span className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                {getPersonalIcon(data.label)}
              </span>
            )}
            <dt className="text-base font-bold text-blue-900 group-hover:text-blue-800 transition-colors duration-300">
              {data.label}
            </dt>
          </div>

          <dd className="text-sm text-gray-700 leading-relaxed whitespace-pre-line font-medium">
            {data.value}
          </dd>
        </div>
      </div>

      {isImportant && (
        <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-blue-700 rounded-r-2xl shadow-lg" />
      )}
    </div>
  );
};

export default InfoCard;
