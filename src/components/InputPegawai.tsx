"use client";
import { useTableStore } from "@/store/table-store";
import { KaryawanData, ResponsePayload } from "@/types";
import toast from "react-hot-toast";

export default function InputPegawai() {
  const { valueSearch, setValueSearch, setLoading, setDataPegawai } =
    useTableStore();

  async function getDataByQuery() {
    setLoading(true);
    try {
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
    <div className="flex w-xl bg-gray-600 shadow-lg rounded-2xl px-3 py-2 items-center justify-between ">
      <input
        type="search"
        value={valueSearch || ""}
        onKeyUp={getDataByQuery}
        onChange={(e) => setValueSearch(e.target.value)}
        placeholder="Cari Nama / NIP"
        className="bg-transparent text-white w-full me-3 text-sm focus:outline-none focus:border-none focus:ring-0 focus:"
      />
      <button className="cursor-pointer">
        <i className="ri-search-line text-white"></i>
      </button>
    </div>
  );
}
