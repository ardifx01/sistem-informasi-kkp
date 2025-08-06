"use client";

import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [hoveredChart, setHoveredChart] = useState<string | null>(null);
  const [animatedBars, setAnimatedBars] = useState(false);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  // Animation trigger on mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedBars(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const statsData = [
    { label: "PNS", value: 1656, color: "bg-gray-600", percentage: 69.1 },
    { label: "PPPK", value: 452, color: "bg-gray-600", percentage: 18.8 },
    { label: "POLRI", value: 1, color: "bg-gray-600", percentage: 0.04 },
    { label: "NON ASN", value: 290, color: "bg-gray-600", percentage: 12.1 },
  ];

  const chartData = {
    golongan: [25, 20, 15, 30, 45, 60, 80, 50, 35, 25],
    pendidikan: [40, 55, 70, 90, 75, 60],
    usia: [30, 45, 60, 80, 95, 85, 70, 55, 40, 25],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 p-2 md:p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-40 h-40 md:w-80 md:h-80 bg-white opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 w-48 h-48 md:w-96 md:h-96 bg-white opacity-3 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Mobile: logos stacked with login top-right, Desktop: original layout */}
        <div className="mb-4 md:mb-6 animate-slide-down">
          {/* Mobile Header */}
          <div className="md:hidden">
            {/* Login button top right for mobile */}
            <div className="flex justify-end mb-4">
              <button className="bg-gray-800 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 text-white px-4 py-2 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-gray-300 text-sm">
                LOGIN
              </button>
            </div>

            {/* Logos and title for mobile */}
            <div className="flex flex-col items-center text-center space-y-3">
              {/* Both logos in a row */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 transform hover:scale-110 transition-transform duration-300 hover:rotate-3">
                  <img
                    src="/assets/KKP.png"
                    alt="Logo KKP"
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </div>
                <div className="w-18 h-18 transform hover:scale-110 transition-transform duration-300 hover:-rotate-3">
                  <img
                    src="/assets/dirjen.png"
                    className="w-full h-full object-contain drop-shadow-lg"
                    alt="Logo Dirjen"
                  />
                </div>
              </div>

              {/* Title text */}
              <div className="text-white">
                <div className="text-xs font-semibold hover:text-yellow-200 transition-colors duration-300">
                  PROFILE KEKUATAN SUMBER DAYA MANUSIA
                </div>
                <div className="text-xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors duration-300 cursor-default">
                  DIREKTORAT
                </div>
                <div className="text-xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors duration-300 cursor-default">
                  JENDRAL PERIKANAN TANGKAP
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Header - preserved original layout */}
          <div className="hidden md:flex justify-between items-center">
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
        </div>

        {/* Indonesia Map Section - Mobile first, then stats */}
        <div className="md:hidden bg-gradient-to-br from-cyan-300 to-cyan-400 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] group mb-4 animate-fade-in">
          <div className="h-48 flex items-center justify-center relative overflow-hidden">
            <img
              src="/assets/INDONESIA.webp"
              alt="Peta Indonesia"
              className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105"
            />

            <div className="absolute top-2 left-2 bg-white bg-opacity-90 rounded-lg p-1 text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              🗺️ Peta Sebaran SDM Indonesia
            </div>
          </div>
        </div>

        {/* Main Content - Desktop 12-col grid preserved, mobile stacked */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 animate-fade-in">
          {/* Indonesia Map Section - Desktop only */}
          <div className="hidden md:block md:col-span-8 bg-gradient-to-br from-cyan-300 to-cyan-400 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] group">
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
                  <div className="animate-pulse">2.399</div>
                  <div className="text-xs mt-1 opacity-80">Total Pegawai</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section - Desktop 6-col grid preserved, mobile responsive */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 mt-4 md:mt-6">
          {/* Bar Chart 1 - Golongan Ruang */}
          <div
            className="bg-gradient-to-br from-teal-700 to-teal-800 rounded-xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
            onMouseEnter={() => setHoveredChart("golongan")}
            onMouseLeave={() => setHoveredChart(null)}
          >
            <h4 className="text-white text-xs font-semibold mb-3 text-center hover:text-teal-200 transition-colors duration-300">
              Distribusi Pegawai Berdasarkan Golongan Ruang
            </h4>
            <div className="flex items-end justify-center space-x-1 h-16 md:h-24">
              {chartData.golongan.map((height, index) => (
                <div
                  key={index}
                  className={`bg-yellow-400 w-2 md:w-3 rounded-t transition-all duration-700 hover:bg-yellow-300 ${
                    hoveredChart === "golongan" ? "animate-bounce" : ""
                  }`}
                  style={{
                    height: animatedBars ? `${height}%` : "0%",
                    animationDelay: `${index * 100}ms`,
                  }}
                ></div>
              ))}
            </div>
            <div className="text-white text-xs mt-2 text-center hover:text-teal-200 transition-colors duration-300">
              I/a - IV/e
            </div>
            {hoveredChart === "golongan" && (
              <div className="absolute bg-black bg-opacity-80 text-white text-xs p-2 rounded mt-2 animate-fade-in">
                📊 Hover untuk detail data
              </div>
            )}
          </div>

          {/* Bar Chart 2 - Tingkat Pendidikan */}
          <div
            className="bg-gradient-to-br from-teal-700 to-teal-800 rounded-xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
            onMouseEnter={() => setHoveredChart("pendidikan")}
            onMouseLeave={() => setHoveredChart(null)}
          >
            <h4 className="text-white text-xs font-semibold mb-3 text-center hover:text-teal-200 transition-colors duration-300">
              Distribusi Tingkat Pendidikan
            </h4>
            <div className="flex items-end justify-center space-x-1 h-16 md:h-24">
              {chartData.pendidikan.map((height, index) => (
                <div
                  key={index}
                  className={`bg-yellow-400 w-3 md:w-4 rounded-t transition-all duration-700 hover:bg-yellow-300 ${
                    hoveredChart === "pendidikan" ? "animate-pulse" : ""
                  }`}
                  style={{
                    height: animatedBars ? `${height}%` : "0%",
                    animationDelay: `${index * 150}ms`,
                  }}
                ></div>
              ))}
            </div>
            <div className="text-white text-xs mt-2 text-center hover:text-teal-200 transition-colors duration-300">
              SD - S3
            </div>
          </div>

          {/* Bar Chart 3 - Distribusi Usia */}
          <div
            className="bg-gradient-to-br from-teal-700 to-teal-800 rounded-xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
            onMouseEnter={() => setHoveredChart("usia")}
            onMouseLeave={() => setHoveredChart(null)}
          >
            <h4 className="text-white text-xs font-semibold mb-3 text-center hover:text-teal-200 transition-colors duration-300">
              Distribusi Usia
            </h4>
            <div className="flex items-end justify-center space-x-1 h-16 md:h-24">
              {chartData.usia.map((height, index) => (
                <div
                  key={index}
                  className={`bg-yellow-400 w-2 md:w-3 rounded-t transition-all duration-700 hover:bg-yellow-300 ${
                    hoveredChart === "usia" ? "animate-wiggle" : ""
                  }`}
                  style={{
                    height: animatedBars ? `${height}%` : "0%",
                    animationDelay: `${index * 80}ms`,
                  }}
                ></div>
              ))}
            </div>
            <div className="text-white text-xs mt-2 text-center hover:text-teal-200 transition-colors duration-300">
              20 - 59 Tahun
            </div>
          </div>

          {/* Pie Chart 1 - Jabatan Struktural */}
          <div className="bg-gradient-to-br from-teal-700 to-teal-800 rounded-xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group">
            <h4 className="text-white text-xs font-semibold mb-3 text-center group-hover:text-teal-200 transition-colors duration-300">
              Distribusi Jenis Jabatan Struktural
            </h4>
            <div className="flex justify-center mb-2">
              <div className="relative w-16 h-16 md:w-20 md:h-20 group-hover:animate-spin-slow">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 42 42"
                  className="transform -rotate-90 transition-transform duration-1000 group-hover:rotate-45"
                >
                  <circle
                    cx="21"
                    cy="21"
                    r="15.91549430918953"
                    fill="transparent"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeDasharray="50 100"
                    strokeDashoffset="0"
                    className="hover:stroke-red-300 transition-colors duration-300"
                  />
                  <circle
                    cx="21"
                    cy="21"
                    r="15.91549430918953"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="30 100"
                    strokeDashoffset="-50"
                    className="hover:stroke-blue-300 transition-colors duration-300"
                  />
                  <circle
                    cx="21"
                    cy="21"
                    r="15.91549430918953"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="20 100"
                    strokeDashoffset="-80"
                    className="hover:stroke-green-300 transition-colors duration-300"
                  />
                </svg>
              </div>
            </div>
            <div className="text-white text-xs text-center space-y-1">
              <div className="flex items-center justify-center space-x-1 hover:text-red-300 transition-colors duration-300 cursor-pointer">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>Eselon II: 50%</span>
              </div>
              <div className="flex items-center justify-center space-x-1 hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
                <span>Eselon III: 30%</span>
              </div>
              <div className="flex items-center justify-center space-x-1 hover:text-green-300 transition-colors duration-300 cursor-pointer">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200"></div>
                <span>Eselon IV: 20%</span>
              </div>
            </div>
          </div>

          {/* Pie Chart 2 - Jenis Kelamin */}
          <div className="bg-gradient-to-br from-teal-700 to-teal-800 rounded-xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group">
            <h4 className="text-white text-xs font-semibold mb-3 text-center group-hover:text-teal-200 transition-colors duration-300">
              Distribusi Jenis Kelamin
            </h4>
            <div className="flex justify-center mb-2">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 42 42"
                  className="transform -rotate-90 transition-transform duration-1000 group-hover:rotate-180"
                >
                  <circle
                    cx="21"
                    cy="21"
                    r="15.91549430918953"
                    fill="transparent"
                    stroke="#ec4899"
                    strokeWidth="3"
                    strokeDasharray="64 100"
                    strokeDashoffset="0"
                    className="hover:stroke-pink-300 transition-colors duration-300"
                  />
                  <circle
                    cx="21"
                    cy="21"
                    r="15.91549430918953"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="36 100"
                    strokeDashoffset="-64"
                    className="hover:stroke-blue-300 transition-colors duration-300"
                  />
                </svg>
              </div>
            </div>
            <div className="text-white text-xs text-center space-y-1">
              <div className="flex items-center justify-center space-x-1 hover:text-pink-300 transition-colors duration-300 cursor-pointer transform hover:scale-105">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
                <span>♀ Perempuan: 64%</span>
              </div>
              <div className="flex items-center justify-center space-x-1 hover:text-blue-300 transition-colors duration-300 cursor-pointer transform hover:scale-105">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                <span>♂ Laki-laki: 36%</span>
              </div>
            </div>
          </div>

          {/* Pie Chart 3 - Distribusi Generasi */}
          <div className="bg-gradient-to-br from-teal-700 to-teal-800 rounded-xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group">
            <h4 className="text-white text-xs font-semibold mb-3 text-center group-hover:text-teal-200 transition-colors duration-300">
              Distribusi Generasi
            </h4>
            <div className="flex justify-center mb-2">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 42 42"
                  className="transform -rotate-90 transition-transform duration-1000 group-hover:-rotate-90"
                >
                  <circle
                    cx="21"
                    cy="21"
                    r="15.91549430918953"
                    fill="transparent"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeDasharray="45 100"
                    strokeDashoffset="0"
                    className="hover:stroke-yellow-300 transition-colors duration-300"
                  />
                  <circle
                    cx="21"
                    cy="21"
                    r="15.91549430918953"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="35 100"
                    strokeDashoffset="-45"
                    className="hover:stroke-blue-300 transition-colors duration-300"
                  />
                  <circle
                    cx="21"
                    cy="21"
                    r="15.91549430918953"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="20 100"
                    strokeDashoffset="-80"
                    className="hover:stroke-green-300 transition-colors duration-300"
                  />
                </svg>
              </div>
            </div>
            <div className="text-white text-xs text-center space-y-1">
              <div className="flex items-center justify-center space-x-1 hover:text-yellow-300 transition-colors duration-300 cursor-pointer transform hover:scale-105">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
                <span>Gen X: 45%</span>
              </div>
              <div className="flex items-center justify-center space-x-1 hover:text-blue-300 transition-colors duration-300 cursor-pointer transform hover:scale-105">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping delay-150"></div>
                <span>Gen Y: 35%</span>
              </div>
              <div className="flex items-center justify-center space-x-1 hover:text-green-300 transition-colors duration-300 cursor-pointer transform hover:scale-105">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping delay-300"></div>
                <span>Gen Z: 20%</span>
              </div>
            </div>
          </div>
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
  );
};

export default Dashboard;
