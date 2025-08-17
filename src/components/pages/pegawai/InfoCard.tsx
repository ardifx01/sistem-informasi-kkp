import { PersonalInfo } from "@/types";

const InfoCard: React.FC<{
  data: PersonalInfo;
}> = ({ data }) => {
  return (
    <div
      className={
        "group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
      }
    >
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300 shadow-md shadow-blue-400/50" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <dt className="text-base font-bold text-blue-900 group-hover:text-blue-800 transition-colors duration-300">
              {data.label}
            </dt>
          </div>

          <dd className="text-sm text-gray-700 leading-relaxed whitespace-pre-line font-medium">
            {data.value}
          </dd>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
