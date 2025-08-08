import Image from "next/image";

export default function IndonesiaMap() {
  return (
    <div className="h-48 md:h-80 flex items-center justify-center relative overflow-hidden">
      <Image
        width={841}
        height={297}
        src="/assets/indonesia-1.png"
        alt="Peta Indonesia"
        className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105"
      />

      <div className="absolute top-2 md:top-4 md:left-4 left-2 bg-white bg-opacity-90 rounded-lg p-1 text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        🗺️ Peta Sebaran SDM Indonesia
      </div>
    </div>
  );
}
