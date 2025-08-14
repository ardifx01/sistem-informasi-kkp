"use client";
import InputPegawai from "@/components/InputPegawai";
import Options from "./Options";
import Link from "next/link";
import { useTableStore } from "@/store/table-store";

export default function HeaderPegawai() {
  const { setValueSearch, setDataPegawai } = useTableStore();
  return (
    <>
      <Link
        onClick={() => {
          setValueSearch("");
          setDataPegawai(undefined);
        }}
        href={"/"}
        className="hidden md:block"
      >
        <i className="text-3xl md:text-5xl fixed top-[52px] left-8 ri-arrow-left-circle-line"></i>
      </Link>
      <div className="min-w-7xl px-2 flex items-center justify-between">
        <InputPegawai />
        <Options />
      </div>
    </>
  );
}
