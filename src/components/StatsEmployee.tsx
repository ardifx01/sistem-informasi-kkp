"use client";
import Link from "next/link";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

export default function StatsEmployee() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStats, setLoadingStats] = useState<string | null>();
  const statsData = [
    { label: "PNS", value: 1656, color: "bg-gray-600", percentage: 69.1 },
    { label: "PPPK", value: 452, color: "bg-gray-600", percentage: 18.8 },
    { label: "POLRI", value: 1, color: "bg-gray-600", percentage: 0.04 },
    { label: "NON ASN", value: 290, color: "bg-gray-600", percentage: 12.1 },
  ];
  return (
    <>
      {/* Stats Panel - Desktop col-span-4 preserved */}
      <div className="md:col-span-4">
        <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
          <h3 className="text-white font-bold text-lg mb-2 hover:text-orange-100 transition-colors duration-300">
            PEGAWAI DJPT
          </h3>
          <div className="text-xs text-orange-100 mb-4 hover:text-white transition-colors duration-300">
            PER 31 DESEMBER 2024
          </div>
          <div className="space-y-3">
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
                  className={`flex justify-between ${stat.color} text-white px-4 py-2 rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-lg `}
                  onClick={() => {
                    setLoadingStats(stats);
                  }}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="font-medium">{stat.label}</span>
                  <span className="font-bold">
                    {stat.value.toLocaleString()}
                  </span>
                </Link>
              );
            })}
            <Link
              href={"/pegawai"}
              onClick={() => setLoading(true)}
              className="bg-gradient-to-r block from-cyan-500 to-cyan-600 text-white text-center py-3 rounded-lg font-bold text-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer hover:from-cyan-400 hover:to-cyan-500"
            >
              {loading ? (
                <div className="w-full">
                  <PulseLoader color="white" />
                </div>
              ) : (
                <div className="flex flex-col">
                  <span className="animate-pulse">2.399</span>
                  <span className="text-xs mt-1 opacity-80">Total Pegawai</span>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
