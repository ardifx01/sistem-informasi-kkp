"use client";
import useFetchStatsEmployee from "@/hooks/useFetchStatsEmployee";
import { useStatsStore } from "@/store/stats-store";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import Marquee from "react-fast-marquee";

export default function StatsEmployee() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStats, setLoadingStats] = useState<string | null>();
  const { isStatsDataEmployeeLoading, statsDataEmployee } = useStatsStore();
  useFetchStatsEmployee();
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
      <div className="h-[21rem]">
        <div className="bg-gradient-to-br h-full from-orange-400 to-orange-500 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
          <h3 className="text-white font-bold text-lg mb-2 hover:text-orange-100 transition-colors duration-300">
            PEGAWAI DJPT
          </h3>
          <div className="text-xs font-semibold text-orange-100 mb-4 hover:text-white transition-colors duration-300">
            PER 31 DESEMBER 2024
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
                "bg-gradient-to-r justify-between px-4 flex items-center from-cyan-500 to-cyan-600 text-white text-center rounded-lg font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer hover:from-cyan-400 hover:to-cyan-500",
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
          <div className="w-full text-white font-semibold text-lg flex flex-col gap-y-5 mt-10">
            <Marquee speed={10} gradient={false}>
              BALAI BESAR PENANGKAPAN IKAN
            </Marquee>
            <Marquee className="text-base" speed={50} gradient={false}>
              Semarang, Jawa Tengah. Laki-laki: 42, Perempuan: 25. Total: 67
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
}
