import { ANIMATION_DELAYS } from "@/utils/detailPegawai";
import Image from "next/image";

export const LogoSection: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => (
  <div
    className={`w-25 h-25 mx-auto mb-8 flex items-center justify-center transform hover:scale-110 transition-transform duration-300 hover:rotate-3 ${
      isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-75"
    }`}
    style={{
      transitionDelay: ANIMATION_DELAYS.LOGO,
      animation: isLoaded
        ? `fadeInUp 0.8s ease-out ${ANIMATION_DELAYS.LOGO} forwards`
        : "",
    }}
  >
    <Image
      width={250}
      height={250}
      src="/assets/KKP.png"
      alt="Logo KKP"
      className="w-full h-full object-contain drop-shadow-lg"
    />
  </div>
);
