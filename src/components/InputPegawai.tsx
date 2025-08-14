export default function InputPegawai() {
  return (
    <div className="flex w-xl bg-gray-600 shadow-lg rounded-2xl px-3 py-2 items-center justify-between ">
      <input
        type="search"
        placeholder="Cari Nama / NIP"
        className="bg-transparent text-white w-full me-3 text-sm focus:outline-none focus:border-none focus:ring-0 focus:"
      />
      <button className="cursor-pointer">
        <i className="ri-search-line text-white"></i>
      </button>
    </div>
  );
}
