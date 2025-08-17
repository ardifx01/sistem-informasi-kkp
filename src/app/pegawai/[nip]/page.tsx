import { Header } from "@/components/pages/pegawai/Header";
import PersonalDataSection from "@/components/pages/pegawai/PersonalDataSection";
import { Sidebar } from "@/components/pages/pegawai/Sidebar";
import { PegawaiDetail, ResponsePayload } from "@/types";
import Link from "next/link";

interface DetailPegawaiPageProps {
  params: Promise<{ nip: string }>;
}

export const dynamic = "force-dynamic";
export default async function DetailPegawaiPage(props: DetailPegawaiPageProps) {
  const { params } = props;
  const { nip } = await params;
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://sistem-informasi-kkp.vercel.app"
      : process.env.BASE_URL;

  const response = await fetch(`${baseUrl}/api/pegawai/detail?nip=${nip}`);
  const dataResponse = (await response.json()) as ResponsePayload;
  const dataPegawai = dataResponse.data as PegawaiDetail | null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 to-cyan-900">
      {dataPegawai ? (
        <>
          <Link href={"/pegawai"} className="hidden md:block">
            <i className="text-5xl fixed top-[52px] left-10 lg:left-18 ri-arrow-left-circle-line z-50 hover:text-blue-600 transition-colors"></i>
          </Link>

          <Header />
          <main className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
              <PersonalDataSection dataPegawai={dataPegawai} />
              <Sidebar />
            </div>
          </main>
        </>
      ) : (
        <div className="w-full min-h-screen gap-y-2 flex-col flex items-center justify-center">
          <h1 className="font-bold text-2xl md:text-4xl max-w-lg md:max-w-xl text-white text-center">
            Data Pegawai dengan NIP: {nip} tidak dapat ditemukan!
          </h1>
          <Link
            href={"/pegawai"}
            className="bg-orange-400 text-white shadow rounded-xl py-1 cursor-pointer px-3 font-semibold text-lg"
          >
            Kembali
          </Link>
        </div>
      )}
    </div>
  );
}
