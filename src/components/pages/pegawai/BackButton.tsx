"use client";
import { useTableStore } from "@/store/table-store";
import Link from "next/link";

export default function BackButton() {
  const { setValueSearch, setDataPegawai } = useTableStore();
  return (
    <Link
      href={"/"}
      onClick={() => {
        setValueSearch(undefined);
        setDataPegawai(undefined);
      }}
      className="hidden md:block"
    >
      <i className="text-2xl sm:text-3xl md:text-5xl fixed top-[52px] left-4 sm:left-6 md:left-8 ri-arrow-left-circle-line z-50 hover:text-blue-600 transition-colors"></i>
    </Link>
  );
}
