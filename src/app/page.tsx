"use client";

import Barchart from "@/components/Charts/Barchart";
import CardChart from "@/components/CardChart";
import {
  dataGenders,
  dataGolonganRuang,
  dataPositions,
  dataStatusPegawai,
  dataTingkatPendidikan,
  dataUsia,
} from "@/utils/DataCharts";
import React, { useState } from "react";
import MyDoughnut from "@/components/Charts/Doughnut";

const Dashboard = () => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const statsData = [
    { label: "PNS", value: 1656, color: "bg-gray-600", percentage: 69.1 },
    { label: "PPPK", value: 452, color: "bg-gray-600", percentage: 18.8 },
    { label: "POLRI", value: 1, color: "bg-gray-600", percentage: 0.04 },
    { label: "POLRI", value: 1, color: "bg-gray-600", percentage: 0.04 },
    { label: "NON ASN", value: 290, color: "bg-gray-600", percentage: 12.1 },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-3 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 animate-slide-down">
            <div className="flex items-center space-x-4">
              {/* Logo KKP */}
              <div className="w-20 h-20 transform hover:scale-110 transition-transform duration-300 hover:rotate-3">
                <img
                  src="/assets/KKP.png"
                  alt="Logo KKP"
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              <div className="text-white">
                <div className="text-sm font-semibold hover:text-yellow-200 transition-colors duration-300">
                  PROFILE KEKUATAN SUMBER DAYA MANUSIA
                </div>
                <div className="text-2xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors duration-300 cursor-default">
                  DIREKTORAT
                </div>
                <div className="text-2xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors duration-300 cursor-default">
                  JENDRAL PERIKANAN TANGKAP
                </div>
              </div>
              {/* Logo Kementerian */}
              <div className="w-30 h-30 mr-60 transform hover:scale-110 transition-transform duration-300 hover:-rotate-3">
                <img
                  src="/assets/dirjen.png"
                  className="w-full h-full object-contain drop-shadow-lg"
                  alt="Logo Dirjen"
                />
              </div>
            </div>
            <button className="bg-gray-800 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 text-white px-6 py-2 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-gray-300">
              LOGIN
            </button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-6 animate-fade-in">
            {/* Indonesia Map Section */}
            <div className="col-span-8 bg-gradient-to-br from-cyan-300 to-cyan-400 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] group">
              <div className="h-80 flex items-center justify-center relative overflow-hidden">
                <img
                  src="/assets/INDONESIA.webp"
                  alt="Peta Indonesia"
                  className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-2 text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  🗺️ Peta Sebaran SDM Indonesia
                </div>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="col-span-4">
              <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                <h3 className="text-white font-bold text-lg mb-2 hover:text-orange-100 transition-colors duration-300">
                  PEGAWAI DJPT
                </h3>
                <div className="text-xs text-orange-100 mb-4 hover:text-white transition-colors duration-300">
                  PER 31 DESEMBER 2024
                </div>
                <div className="space-y-3">
                  {statsData.map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`flex justify-between ${
                        stat.color
                      } text-white px-4 py-2 rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-lg ${
                        selectedStat === stat.label ? "ring-2 ring-white" : ""
                      }`}
                      onClick={() =>
                        setSelectedStat(
                          selectedStat === stat.label ? null : stat.label
                        )
                      }
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="font-medium">{stat.label}</span>
                      <span className="font-bold">
                        {stat.value.toLocaleString()}
                      </span>
                      {selectedStat === stat.label && (
                        <span className="text-xs ml-2 animate-pulse">
                          ({stat.percentage}%)
                        </span>
                      )}
                    </div>
                  ))}
                  <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-center py-3 rounded-lg font-bold text-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer hover:from-cyan-400 hover:to-cyan-500">
                    <div className="animate-pulse text-red">2.399</div>
                    <div className="text-xs mt-1 opacity-80">Total Pegawai</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {/* Bar Chart 1 - Golongan Ruang */}
            <CardChart>
              <Barchart
                data={dataGolonganRuang}
                title="Berdasarkan Golongan Ruang"
              />
            </CardChart>

            <CardChart>
              <Barchart
                data={dataTingkatPendidikan}
                title="Berdasarkan Tingkat Pendidikan"
              />
            </CardChart>

            <CardChart>
              <Barchart data={dataUsia} title="Berdasarkan Usia" />
            </CardChart>

            <CardChart>
              <MyDoughnut
                data={dataStatusPegawai}
                title="Berdasarkan Status Pegawai"
              />
            </CardChart>
            <CardChart>
              <MyDoughnut
                data={dataGenders}
                title="Berdasarkan Jenis Kelamin"
              />
            </CardChart>
            <CardChart>
              <MyDoughnut
                data={dataPositions}
                title="Berdasarkan Jabatan"
              />
            </CardChart>
          </div>
        </div>

        <style jsx>{`
          @keyframes slide-down {
            from {
              transform: translateY(-20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes wiggle {
            0%,
            7% {
              transform: rotateZ(0);
            }
            15% {
              transform: rotateZ(-15deg);
            }
            20% {
              transform: rotateZ(10deg);
            }
            25% {
              transform: rotateZ(-10deg);
            }
            30% {
              transform: rotateZ(6deg);
            }
            35% {
              transform: rotateZ(-4deg);
            }
            40%,
            100% {
              transform: rotateZ(0);
            }
          }
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-slide-down {
            animation: slide-down 0.6s ease-out;
          }
          .animate-fade-in {
            animation: fade-in 0.8s ease-out;
          }
          .animate-wiggle {
            animation: wiggle 2s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default Dashboard;
