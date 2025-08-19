import Image from "next/image";

export default function IndonesiaMap() {
  return (
    <div className="group h-48 md:h-80 lg:h-96 flex items-center justify-center ">
      <Image
        width={841}
        height={297}
        src="/assets/puki.png"
        alt="Peta Sebaran SDM Indonesia"
        className="max-w-full max-h-full object-contain opacity-85 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-113"
        priority
      />

      {/* Overlay Title */}
      <div className="absolute top-2 right-2 bg-white bg-opacity-90 backdrop-blur-sm rounded p-1 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        🗺️ Peta Sebaran SDM Indonesia
      </div>
    </div>
  );
}
