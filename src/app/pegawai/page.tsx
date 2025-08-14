import Container from "@/components/Container";
import HeaderPegawai from "@/components/pages/pegawai/HeaderPegawai";
import TableKaryawan from "@/components/TableKaryawan";
import { KaryawanData, ResponsePayload } from "@/types";
import Link from "next/link";

export default async function PegawaiPage() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "sistem-informasi-kkp.vercel.app"
      : process.env.BASE_URL;
  const response = await fetch(baseUrl + "/api/pegawai");
  const dataResponse = (await response.json()) as ResponsePayload;
  const dataPegawai = dataResponse.data as KaryawanData[];
  return (
    <Container className="flex-col gap-y-4 pt-10">
      <Link href={"/"} className="hidden md:block">
        <i className="text-3xl md:text-5xl fixed top-[52px] left-8 ri-arrow-left-circle-line"></i>
      </Link>
      <HeaderPegawai />
      <div className="min-w-7xl px-2">
        <TableKaryawan dataKaryawan={dataPegawai} />
      </div>
    </Container>
  );
}
