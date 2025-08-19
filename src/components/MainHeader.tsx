import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";
import MyTooltip from "./MyTooltip";
import UploadExcel from "./UploadExcel";
import { ExcelFile, ResponsePayload } from "@/types";
import InputSearch from "./pages/home/InputSearch";

export default async function MainHeader() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://sistem-informasi-kkp.vercel.app"
      : process.env.BASE_URL;
  const response = await fetch(`${baseUrl}/api/upload`);
  const data = (await response.json()) as ResponsePayload<ExcelFile[]>;
  const dataExcel = data.data![0];

  return (
    <div className="mb-4 md:mb-6 animate-slide-down">
      {/* Mobile Header */}
      <div className="md:hidden">
        {/* Login button top right for mobile */}
        <div className="flex justify-end mb-4">
          <div className="md:grid flex justify-center w-full grid-cols-[2rem_1fr_2rem] gap-x-2">
            {token ? (
              <button className="bg-gray-800 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 text-whitex text-white rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-gray-300 text-sm">
                <i className="ri-file-upload-line"></i>
              </button>
            ) : null}
            <InputSearch />
            {token ? (
              <Logout />
            ) : (
              <Link
                href={"/auth/login"}
                className="bg-gray-800 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 text-white px-4 py-2 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-gray-300 text-sm"
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>

        {/* Logos and title for mobile */}
        <div className="flex flex-col items-center text-center space-y-3">
          {/* Both logos in a row */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 transform hover:scale-110 transition-transform duration-300 hover:rotate-3">
              <Image
                width={250}
                height={250}
                src="/assets/KKP.png"
                alt="Logo KKP"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <div className="w-18 h-18 transform hover:scale-110 transition-transform duration-300 hover:-rotate-3">
              <Image
                width={425}
                height={508}
                src="/assets/dirjen.png"
                className="w-full h-full object-contain drop-shadow-lg"
                alt="Logo Dirjen"
              />
            </div>
          </div>

          {/* Title text */}
          <div className="text-white">
            <div className="text-xs font-semibold hover:text-yellow-200 transition-colors duration-300">
              PROFIL KEKUATAN SUMBER DAYA MANUSIA
            </div>
            <div className="text-xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors duration-300 cursor-default">
              DIREKTORAT
            </div>
            <div className="text-xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors duration-300 cursor-default">
              JENDERAL PERIKANAN TANGKAP
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header - preserved original layout */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Logo KKP */}
          <div className="w-20 h-20 transform hover:scale-110 transition-transform duration-300 hover:rotate-3">
            <Image
              width={250}
              height={250}
              src="/assets/KKP.png"
              alt="Logo KKP"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
          <div className="text-white">
            <div className="text-sm font-semibold hover:text-yellow-200 transition-colors duration-300">
              PROFIL KEKUATAN SUMBER DAYA MANUSIA
            </div>
            <div className="text-2xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors duration-300 cursor-default">
              DIREKTORAT
            </div>
            <div className="text-2xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors duration-300 cursor-default">
              JENDERAL PERIKANAN TANGKAP
            </div>
          </div>
          {/* Logo Kementerian */}
          <div className="w-30 h-30 mr-60 transform hover:scale-110 transition-transform duration-300 hover:-rotate-3">
            <Image
              width={425}
              height={508}
              src="/assets/dirjen.png"
              className="w-full h-full object-contain drop-shadow-lg"
              alt="Logo Dirjen"
            />
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          {token ? (
            <MyTooltip id="upload-tooltip">
              <UploadExcel dataExcelUser={dataExcel} />
            </MyTooltip>
          ) : null}

          <InputSearch />

          {token ? (
            <MyTooltip id="logout-tooltip">
              <Logout />
            </MyTooltip>
          ) : (
          <Link
            href={"/auth/login"}
            className="bg-gray-800 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 text-white px-4 py-2 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-gray-300 text-sm"
          >
            LOGIN
          </Link>
          )}
        </div>
      </div>
    </div>
  );
}
