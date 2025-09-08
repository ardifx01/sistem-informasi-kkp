import MainHeader from "@/components/MainHeader";
import IndonesiaMap from "@/components/IndonesiaMap";
import Charts from "@/components/Charts/Charts";
import { ExcelFile, ResponsePayload } from "@/types";
import StatsEmployee from "@/components/StatsEmployee";
import ReactPlayer from "react-player";
import { cookies } from "next/headers";

const Dashboard = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://sistem-informasi-kkp.vercel.app"
      : process.env.BASE_URL;
  const response = await fetch(`${baseUrl}/api/upload`);
  const data = (await response.json()) as ResponsePayload<ExcelFile[]>;
  const dataExcel = data.data![0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 px-5 py-1 relative">
      <ReactPlayer
        muted
        loop
        playsInline
        autoPlay
        width={"100%"}
        height={"100%"}
        src="/video/cihuy.mov"
        className="absolute top-0 left-0 w-full h-full object-cover"
      ></ReactPlayer>
      <div className="max-w-8xl mx-auto relative z-10">
        <MainHeader dataExcel={dataExcel} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr] gap-4">
          <div className="grid-cols-1 grid gap-3">
            <Charts displayBar />
          </div>
          <div className="flex gap-3 flex-col order-first md:order-none">
            <div>
              <StatsEmployee dataExcel={dataExcel} />
            </div>
            <IndonesiaMap token={token} />
          </div>
          <div className="grid grid-cols-1 gap-3">
            <Charts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
