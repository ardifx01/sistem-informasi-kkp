"use client";
import useFetchStatsEmployee from "@/hooks/useFetchStatsEmployee";
import { useStatsStore } from "@/store/stats-store";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import Marquee from "react-fast-marquee";
import { useMapStore } from "@/store/map-store";
import { ExcelFile } from "@/types";
import Image from "next/image";

interface StatsEmployeeProps {
  dataExcel: ExcelFile;
}

export default function StatsEmployee(props: StatsEmployeeProps) {
  const { dataExcel } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [time, setTime] = useState<Date | null>(null);
  const [index, setIndex] = useState<number>(0);
  const { locationUpt } = useMapStore();
  const [loadingStats, setLoadingStats] = useState<string | null>();
  const { isStatsDataEmployeeLoading, statsDataEmployee } = useStatsStore();

  useEffect(() => {
    if (locationUpt.length > 1) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % locationUpt.length);
      }, 20000);
      return () => clearInterval(interval);
    } else {
      setIndex(0);
    }
  }, [locationUpt]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const current = locationUpt[index];
  const total = current?.employees
    ? current.employees.male + current.employees.female
    : 0;
  useFetchStatsEmployee();

  const formatted = time
    ? time.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-- -- ----";

  const timeNow = time ? time.toLocaleTimeString("id-ID") : "--.--.--";

  const statsData = [
    { label: "PNS", value: statsDataEmployee.totalPns, color: "bg-gray-600" },
    { label: "PPPK", value: statsDataEmployee.totalPPPK, color: "bg-gray-600" },
    {
      label: "NON ASN",
      value: statsDataEmployee.totalNonASn,
      color: "bg-gray-600",
    },
  ];

  return (
    <>
      {/* Stats Panel - Desktop col-span-4 preserved */}
      <div className="h-[22rem]">
        <div className="bg-gradient-to-br h-full from-orange-400 to-orange-500 rounded-xl p-4 md:px-6 md:pt-6 md:pb-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
          <div className="w-full">
            <div className="flex flex-col w-[50%] shadow-lg mx-auto items-center mb-2 bg-[#b22222] pt-2 rounded-lg">
              <span className="text-white font-bold text-xl hover:text-orange-100 transition-colors duration-300">
                PEGAWAI DJPT
              </span>
              <a
                href={"/struktur-organisasi.pdf"}
                className="text-white font-semibold hover:underline"
              >
                Struktur Organisasi DJPT
              </a>
              <span className="text-xs font-semibold text-orange-100 mb-4 hover:text-white transition-colors duration-300">
                PER {dataExcel.updated}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {statsData.map((stat, index) => {
              const stats = stat.label.split(" ").join("").toLowerCase();
              const isLoading = stats === loadingStats;
              return isLoading ? (
                <div
                  key={index}
                  className="w-full justify-center items-center bg-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
                >
                  <PulseLoader color="white" className="block text-center" />
                </div>
              ) : (
                <Link
                  href={"/pegawai?category=" + stats}
                  key={index}
                  className={`flex justify-between ${
                    isStatsDataEmployeeLoading ? "animate-pulse h-10" : ""
                  } ${
                    stat.color
                  } text-white px-4 py-2 rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-lg `}
                  onClick={() => {
                    setLoadingStats(stats);
                  }}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {isStatsDataEmployeeLoading ? null : (
                    <>
                      <span className="font-medium">{stat.label}</span>
                      <span className="font-bold">{stat.value}</span>
                    </>
                  )}
                </Link>
              );
            })}
            <Link
              href={"/pegawai"}
              onClick={() => setLoading(true)}
              className={clsx(
                "bg-gradient-to-br justify-between px-4 flex items-center from-cyan-500 to-cyan-600 text-white text-center rounded-lg font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer hover:from-cyan-400 hover:to-cyan-500",
                isStatsDataEmployeeLoading ? "animate-pulse" : ""
              )}
            >
              {loading ? (
                <div className="w-full">
                  <PulseLoader color="white" />
                </div>
              ) : isStatsDataEmployeeLoading ? null : (
                <>
                  <span className="font-medium opacity-90">Total Pegawai</span>
                  <span className="animate-pulse">
                    {statsDataEmployee.totalPegawai}
                  </span>
                </>
              )}
            </Link>
          </div>
          <div
            className={clsx(
              "w-full text-white font-semibold text-xl flex flex-col gap-y-5 mt-4"
            )}
          >
            <div className="flex flex-col">
              <div className="flex items-center px-2 py-1 bg-[#b22222] rounded-tr-xl rounded-tl-xl justify-between">
                <div className="flex items-center gap-x-3">
                  <div className="h-2 w-2 aspect-square rounded-full bg-red-500" />
                  <span className="text-sm uppercase font-semibold text-white">
                    live update
                  </span>
                </div>
                <span className="text-sm text-white">
                  {formatted}, {timeNow}
                </span>
              </div>
              {current ? (
                <>
                  <div className="flex items-center gap-x-2 bg-[#003366] px-2 py-1">
                    <div className="w-12 p-2 h-12 aspect-square bg-white/20 rounded-full">
                      <Image
                        src={"/assets/horn.png"}
                        height={100}
                        width={100}
                        alt="Horn Image"
                        className="w-[150px] aspect-square"
                      />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <Marquee className="" speed={30} gradient={false}>
                        <div className="flex font-bold flex-col items-center">
                          <span>{current.name}</span>
                          <span className="text-sm font-normal">
                            {current.region}. Laki-laki:&nbsp;
                            {current.employees.male}, Perempuan:&nbsp;
                            {current.employees.female}, Total:&nbsp;
                            {total}
                          </span>
                        </div>
                      </Marquee>
                    </div>
                  </div>
                  <div className="rounded-br-xl text-xs font-semibold bg-[#003366] rounded-bl-xl flex justify-between items-center px-2 py-1">
                    <span className="">{current.region}</span>
                    <span>DJPT INFO SYSTEM | DFA</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-20 bg-[#003366] rounded-bl-xl rounded-br-xl animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
