import { ANIMATION_DELAYS, getAnimationProps } from "@/utils/detailPegawai";

export const HeaderContent: React.FC = () => (
  <>
    <h1 {...getAnimationProps(true, ANIMATION_DELAYS.TITLE)}>
      <span className="text-5xl font-bold text-white mb-4 tracking-tight block drop-shadow-lg">
        DATA RIWAYAT HIDUP
      </span>
    </h1>

    <p {...getAnimationProps(true, ANIMATION_DELAYS.SUBTITLE)}>
      <span className="text-blue-50 text-xl max-w-4xl mx-auto leading-relaxed block font-medium mb-2">
        Profil Lengkap Pegawai Direktorat Jenderal Perikanan Tangkap
      </span>
    </p>

    <div {...getAnimationProps(true, ANIMATION_DELAYS.BADGE)}>
      <span className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-white/15 backdrop-blur-sm rounded-full text-white text-base font-semibold border border-white/25 shadow-lg hover:bg-white/20 transition-all duration-300">
        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
        Kementerian Kelautan dan Perikanan
      </span>
    </div>
  </>
);
