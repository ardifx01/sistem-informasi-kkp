import { ANIMATION_DELAYS, getAnimationProps } from "@/utils/detailPegawai";

export const StatusSection: React.FC<{ isLoaded: boolean }> = ({
  isLoaded,
}) => (
  <div
    {...getAnimationProps(isLoaded, ANIMATION_DELAYS.STATUS_CARD)}
    className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 shadow-xl text-center ${
      isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
  >
    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full text-base font-bold border border-green-200 shadow-md">
      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-400/50" />
      Status Aktif
    </div>
    <p className="text-sm text-gray-600 mt-4 font-medium">
      Pegawai Negeri Sipil
    </p>
  </div>
);
