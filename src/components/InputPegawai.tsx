export default function InputPegawai() {
  return (
    <div className="flex w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl md:ml-12 lg:ml-16 xl:ml-20 bg-gray-600 shadow-lg rounded-lg sm:rounded-xl lg:rounded-2xl px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 lg:py-2 items-center justify-between">
      <input
        type="search"
        placeholder="Cari Nama / NIP"
        className="bg-transparent text-white w-full me-2 xs:me-3 text-xs xs:text-sm sm:text-base placeholder-gray-300 focus:outline-none focus:border-none focus:ring-0"
      />
      <button className="cursor-pointer flex-shrink-0 p-1 hover:bg-gray-700 rounded transition-colors">
        <i className="ri-search-line text-white text-sm xs:text-base sm:text-lg"></i>
      </button>
    </div>
  );
}
