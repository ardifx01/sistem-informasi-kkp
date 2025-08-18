"use client";
import { useTableStore, Value } from "@/store/table-store";
import { KaryawanData, ResponsePayload } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Options() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    setLoading,
    valueSearch,
    loading,
    category,
    setCategory,
    setDataPegawai,
  } = useTableStore();

  useEffect(() => {
    const urlCategory = (searchParams.get("category") as Value) || "all";
    setCategory(urlCategory);
  }, [searchParams, setCategory]);

  async function getDataByCategory(valueCategory: Value) {
    try {
      const params = new URLSearchParams();
      if (valueSearch) {
        params.set("q", valueSearch);
      }
      if (valueCategory && valueCategory !== "all") {
        params.set("category", valueCategory);
      }
      const query = params.toString() ? `?${params.toString()}` : "";

      console.log(query);
      const response = await fetch(`/api/pegawai${query}`);
      const dataPegawai = (await response.json()) as ResponsePayload<
        KaryawanData[]
      >;

      setDataPegawai(dataPegawai.data);
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
    <div className="flex justify-end gap-x-4">
      <select
        value={category}
        onChange={(e) => {
          router.push("/pegawai");
          setLoading(true);
          const newValue = e.target.value as Value;
          setCategory(newValue);

          getDataByCategory(newValue);
        }}
        disabled={loading}
        className="px-1 cursor-pointer py-2 border border-[#d1d5db] rounded-md bg-white focus:border-0 focus:outline-0 shadow-md"
      >
        <option value="all">All</option>
        <option value="pns">PNS</option>
        <option value="pppk">PPPK</option>
        <option value="polri">Polri</option>
        <option value="nonasn">Non Asn</option>
      </select>
    </div>
  );
}
