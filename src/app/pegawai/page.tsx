import Container from "@/components/Container";
import BackButton from "@/components/pages/pegawai/BackButton";
import HeaderPegawai from "@/components/pages/pegawai/HeaderPegawai";
import Options from "@/components/pages/pegawai/Options";
import TableKaryawan from "@/components/TableKaryawan";
import { KaryawanData, ResponsePayload } from "@/types";

type SearchParams = Promise<{ [key: string]: string | undefined }>;
export const dynamic = "force-dynamic";
export default async function PegawaiPage(props: {
  searchParams: SearchParams;
}) {
  const { q } = await props.searchParams;
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://sistem-informasi-kkp.vercel.app"
      : process.env.BASE_URL;

  const response = await fetch(`${baseUrl}/api/pegawai${q ? "?q=" + q : ""}`);
  const dataResponse = (await response.json()) as ResponsePayload;
  const dataPegawai = dataResponse.data as KaryawanData[];

  return (
    <Container className="flex flex-col gap-y-6 pt-10 min-h-screen">
      <BackButton />
      {/* Header Section */}
      <div className="w-full px-4 sm:px-6 md:pl-20 md:pr-8">
        <HeaderPegawai q={q} />
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
