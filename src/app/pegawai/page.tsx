import Container from "@/components/Container";
import BackButton from "@/components/pages/pegawai/BackButton";
import HeaderPegawai from "@/components/pages/pegawai/HeaderPegawai";
import Options from "@/components/pages/pegawai/Options";
import TableKaryawan from "@/components/TableKaryawan";
import { KaryawanData, ResponsePayload } from "@/types";
import ReactPlayer from "react-player";

type SearchParams = Promise<{ [key: string]: string | undefined }>;
export const dynamic = "force-dynamic";
export default async function PegawaiPage(props: {
  searchParams: SearchParams;
}) {
  const { q, category } = await props.searchParams;
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://sistem-informasi-kkp.vercel.app"
      : process.env.BASE_URL;

  const query = `${q ? `?q=${q}` : category ? `?category=${category}` : ""} `;

  const response = await fetch(`${baseUrl}/api/pegawai${query}`);
  const dataResponse = (await response.json()) as ResponsePayload;
  const dataPegawai = dataResponse.data as KaryawanData[];

  return (
    <Container className="flex flex-col gap-y-6 pt-10 min-h-screen">
      <ReactPlayer
              muted
              loop
              playsInline
              autoPlay
              width={"100%"}
              height={"100%"}
              src="/video/marlin.mp4"
              className="absolute top-0 left-0 bottom-0 right-0 w-full h-full object-cover -z-50"
            ></ReactPlayer>
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
