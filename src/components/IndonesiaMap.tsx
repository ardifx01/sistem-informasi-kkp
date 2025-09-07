"use client";
import React from "react";
import dynamic from "next/dynamic";
import MyTooltip from "./MyTooltip";
import UploadMap from "./pages/home/UploadMap";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

interface IndonesiaMapProps {
  token: RequestCookie | undefined;
}

export default function IndonesiaMap(props: IndonesiaMapProps) {
  const { token } = props;
  return (
    <div className="group relative opacity-95 select-none">
      {/* Main Container with Professional Styling */}
      <div className="relative h-20 md:h-80 lg:h-72 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50">
        {/* Subtle Inner Border */}
        <div className="absolute inset-1 rounded-xl border border-white/30 pointer-events-none z-10"></div>

        {/* Map Container */}
        <div className="h-full w-full relative">
          <LeafletMap />
        </div>

        {/* Professional Header Overlay */}
        <div className="absolute top-4 left-4 right-4 z-20">
          <div className="bg-white/95 backdrop-blur-md rounded-xl border border-gray-200/50 shadow-lg px-4 py-3 transform transition-all duration-500 opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <h3 className="text-sm font-semibold text-gray-800">
                  Peta Sebaran SDM Indonesia
                </h3>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <span className="bg-blue-100 px-2 py-1 rounded-full">
                  23 Lokasi
                </span>
                <span>🗺️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info Panel */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="bg-gradient-to-r from-slate-900/90 to-blue-900/90 backdrop-blur-md rounded-xl border border-white/20 shadow-lg px-4 py-3 transform transition-all duration-500 opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-0">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-xs font-medium">
                    Pelabuhan Perikanan
                  </span>
                </div>
                <div className="text-xs text-blue-200">
                  Hover untuk detail lokasi
                </div>
              </div>
              <div className="text-xs font-mono bg-white/20 px-2 py-1 rounded">
                Kementerian KP
              </div>
            </div>
          </div>
        </div>

        {/* Corner Accent Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-3xl"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-tr-3xl"></div>

        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
      {token ? (
        <div className="absolute top-5 right-5 z-[99999]">
          <MyTooltip id="upload-map">
            <UploadMap />
          </MyTooltip>
        </div>
      ) : null}

      {/* Professional Drop Shadow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/10 to-cyan-600/10 transform translate-y-1 translate-x-1 -z-10 group-hover:translate-y-2 group-hover:translate-x-2 transition-transform duration-300"></div>
    </div>
  );
}
