import Container from "@/components/Container";
import HeaderPegawai from "@/components/pages/pegawai/HeaderPegawai";
import Options from "@/components/pages/pegawai/Options";
import TableKaryawan from "@/components/TableKaryawan";
// import Options from "@/components/Options";
import { KaryawanData, ResponsePayload } from "@/types";
import Link from "next/link";

// Temporary inline Options component

export default async function PegawaiPage() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://sistem-informasi-kkp.vercel.app"
      : process.env.BASE_URL;

  const response = await fetch(baseUrl + "/api/pegawai");
  const dataResponse = (await response.json()) as ResponsePayload;
  const dataPegawai = dataResponse.data as KaryawanData[];

  return (
    <Container className="flex flex-col gap-y-6 pt-10 min-h-screen">
      {/* Back Button */}
      <Link href={"/"} className="hidden md:block">
        <i className="text-2xl sm:text-3xl md:text-5xl fixed top-[52px] left-4 sm:left-6 md:left-8 ri-arrow-left-circle-line z-50 hover:text-blue-600 transition-colors"></i>
      </Link>

      {/* Header Section */}
      <div className="w-full px-4 sm:px-6 md:pl-20 md:pr-8">
        <HeaderPegawai />
      </div>

      {/* Table Section with responsive container */}
      <div className="flex-1 w-full">
        {/* Options Filter */}
        <div className="w-full px-4 sm:px-6 md:px-20 mb-4">
          <Options />
        </div>

        <div className="w-full overflow-x-auto px-4 sm:px-6 md:px-20">
          <div className="min-w-max pb-4">
            <TableKaryawan dataKaryawan={dataPegawai} />
          </div>
        </div>
      </div>
    </Container>
  );
}
