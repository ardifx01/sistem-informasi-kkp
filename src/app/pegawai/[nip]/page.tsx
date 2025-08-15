"use client";
import { Header } from "@/components/pages/pegawai/Header";
import PersonalDataSection from "@/components/pages/pegawai/PersonalDataSection";
import { Sidebar } from "@/components/pages/pegawai/Sidebar";
import React, { useState, useEffect } from "react";

const DetailPegawaiPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 to-cyan-900">
      <Header isLoaded={isLoaded} />

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <PersonalDataSection isLoaded={isLoaded} />
          <Sidebar isLoaded={isLoaded} />
        </div>
      </main>
    </div>
  );
};

export default DetailPegawaiPage;
