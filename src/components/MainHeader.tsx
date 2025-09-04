import { cookies } from "next/headers";
import Image from "next/image";
import Logout from "./Logout";
import MyTooltip from "./MyTooltip";
import UploadExcel from "./UploadExcel";
import { ExcelFile } from "@/types";
import InputSearch from "./pages/home/InputSearch";
import Link from "next/link";
import clsx from "clsx";

interface MainHeaderProps {
  dataExcel: ExcelFile;
}

export default async function MainHeader(props: MainHeaderProps) {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  const { dataExcel } = props;

  return (
    <div className="mb-1 animate-slide-down">
      {/* Mobile Header */}
      <div className="md:hidden">
        {/* Logos and title for mobile */}
        <div className="flex flex-col items-center text-center space-y-3 mb-4">
          {/* Both logos in a row */}
          <div className="flex items-center space-x-4">
            <Link
              href={"/auth/login"}
              className="w-16 h-16 transform hover:scale-110 transition-transform duration-300 hover:rotate-3"
            >
              <Image
                width={250}
                height={250}
                src="/assets/KKP.png"
                alt="Logo KKP"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </Link>
            <Link
              href={"/auth/login"}
              className="w-18 h-18 transform hover:scale-110 transition-transform duration-300 hover:-rotate-3"
            >
              <Image
                width={425}
                height={508}
                src="/assets/dirjen.png"
                className="w-full h-full object-contain drop-shadow-lg"
                alt="Logo Dirjen"
              />
            </Link>
          </div>

          {/* Title text */}
          <div className="text-white flex flex-col">
            <span className="text-xl font-bold transition-colors duration-300">
              KEKUATAN SUMBER DAYA MANUSIA
            </span>
            <span className="text-lg uppercase font-bold text-yellow-300 transition-colors duration-300 cursor-default">
              DIREKTORAT JENDERAL PERIKANAN TANGKAP
            </span>
          </div>
        </div>
        {/* Logout button top right for mobile */}
        <div className="flex justify-end mb-4">
          <div className="flex justify-center w-full gap-x-2">
            {token ? (
              <div className="flex gap-x-2">
                <button className="bg-gray-800 hover:bg-gradient-to-r px-2 hover:from-gray-700 hover:to-gray-600 text-whitex text-white rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-gray-300 text-sm">
                  <i className="ri-file-upload-line"></i>
                </button>
                <button className="bg-gray-800 hover:bg-gradient-to-r px-2 hover:from-gray-700 hover:to-gray-600 text-whitex text-white rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-gray-300 text-sm">
                  <i className="ri-download-line"></i>
                </button>
              </div>
            ) : null}
            {token ? <InputSearch /> : null}
            {token ? <Logout /> : null}
          </div>
        </div>
      </div>

      {/* Desktop Header - preserved original layout */}
      <div className={clsx("hidden md:flex items-center justify-between")}>
        <div
          className={clsx(
            "flex items-center space-x-4 w-full",
            token ? "justify-start gap-x-1" : "justify-center gap-x-6"
          )}
        >
          {/* Logo KKP */}
          <Link
            href={"/auth/login"}
            className="w-35 0 h-35 transform hover:scale-110 transition-transform duration-300 hover:rotate-3"
          >
            <Image
              width={250}
              height={250}
              src="/assets/KKP.png"
              alt="Logo KKP"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </Link>
          <div
            className={clsx(
              "text-white flex flex-col",
              token ? "" : "text-center"
            )}
          >
            <span className="text-4xl font-bold transition-colors duration-300">
              KEKUATAN SUMBER DAYA MANUSIA
            </span>
            <span className="text-2xl uppercase font-bold text-yellow-300 transition-colors duration-300 cursor-default">
              DIREKTORAT JENDERAL PERIKANAN TANGKAP
            </span>
          </div>
          {/* Logo Kementerian */}
          <Link
            href={"/auth/login"}
            className="w-45 h-45 -ml-2 transform hover:scale-110 transition-transform duration-300 hover:-rotate-3"
          >
            <Image
              width={425}
              height={508}
              src="/assets/dirjen.png"
              className="w-full h-full object-contain drop-shadow-lg"
              alt="Logo Dirjen"
            />
          </Link>
        </div>
        <div className="flex items-center gap-x-2">
          {token ? (
            <div className="flex gap-x-2 items-center">
              <MyTooltip id="upload-tooltip">
                <UploadExcel dataExcelUser={dataExcel} />
              </MyTooltip>
              <MyTooltip id="download-icon">
                <a
                  data-tooltip-id="download-icon"
                  data-tooltip-content={"Panduan Excel"}
                  href="/guide-excel.pdf"
                  className="bg-gray-800 py-2 hover:bg-gradient-to-r px-2 hover:from-gray-700 hover:to-gray-600 text-whitex text-white rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-gray-300 text-sm"
                >
                  <i className="ri-download-line"></i>
                </a>
              </MyTooltip>
            </div>
          ) : null}

          {token ? <InputSearch /> : null}

          {token ? (
            <MyTooltip id="logout-tooltip">
              <Logout />
            </MyTooltip>
          ) : null}
        </div>
      </div>
    </div>
  );
}
