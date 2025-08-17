"use client";
import { useTableStore } from "@/store/table-store";
import { KaryawanData, ResponsePayload } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function InputPegawai(props: { q: string | undefined }) {
  const { q } = props;
  const { valueSearch, setValueSearch, setLoading, setDataPegawai } =
    useTableStore();
  const router = useRouter();

  async function getDataByQuery() {
    setLoading(true);
    try {
      router.push("/pegawai");
      const query = valueSearch ? `?q=${valueSearch}` : "";
      const response = await fetch(`/api/pegawai${query}`);
      const dataPegawai = (await response.json()) as ResponsePayload<
        KaryawanData[]
      >;
      setDataPegawai(dataPegawai.data!);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("An error occured");
      } else {
        toast.error("Something wrong!");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl md:ml-12 lg:ml-16 xl:ml-20 bg-gray-600 shadow-lg rounded-lg sm:rounded-xl lg:rounded-2xl px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 lg:py-2 items-center justify-between">
      <input
        type="search"
        value={valueSearch || ""}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            getDataByQuery();
          }
        }}
        onChange={(e) => setValueSearch(e.target.value)}
        placeholder={q || "Cari nama / NIP"}
        className="bg-transparent text-white w-full me-2 xs:me-3 text-xs xs:text-sm sm:text-base placeholder-gray-300 focus:outline-none focus:border-none focus:ring-0"
      />
      <button
        onClick={getDataByQuery}
        className="cursor-pointer flex-shrink-0 p-1 hover:bg-gray-700 rounded transition-colors"
      >
        <i className="ri-search-line text-white text-sm xs:text-base sm:text-lg"></i>
      </button>
    </div>
  );
}
