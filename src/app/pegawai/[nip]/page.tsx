"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Types
interface PersonalInfo {
  label: string;
  value: string;
  hasIcon?: boolean;
}

interface ContactInfo {
  type: string;
  value: string;
  iconType: "map" | "phone" | "building";
}

// Constants
const PERSONAL_DATA: PersonalInfo[] = [
  {
    label: "Nama",
    value: "Annisa Izzatul Jannah, S.Pd",
    hasIcon: true,
  },
  { label: "NIP", value: "199105212014032001" },
  {
    label: "KARPEG/KARIS-KARSU/NPWP",
    value: "047/KEP/KARPEG/2016/AB 000077426686745348310000",
  },
  {
    label: "Tempat/Tanggal Lahir",
    value: "PURWOREJO/21-05-1991",
    hasIcon: true,
  },
  { label: "Jenis Kelamin", value: "Perempuan" },
  { label: "Agama", value: "ISLAM" },
  { label: "Status Keluarga", value: "Kawin" },
  {
    label: "Pendidikan Akhir",
    value: "S1/UNIVERSITAS PERSADA INDONESIA YAI/2021",
    hasIcon: true,
  },
  { label: "Fakultas/Jurusan/Prodi", value: "/SISTEM INFORMASI" },
  {
    label: "Unit Kerja",
    value:
      "SEKRETARIAT DITJEN PERIKANAN TANGKAP\nDIREKTORAT JENDERAL PERIKANAN TANGKAP\nSUMBER DAYA MANUSIA APARATUR DAN ORGANISASI",
    hasIcon: true,
  },
  { label: "Tim Kerja", value: "-" },
  { label: "Diklat Penjenjangan", value: "-" },
  {
    label: "Pangkat,Golongan,TMT GOL/TMT CPNS",
    value: "Penata Muda, III/a, 01-04-2022 / 01-03-2014",
  },
  { label: "Masa Kerja Golongan", value: "9 Tahun 5 Bulan" },
  { label: "Masa Kerja Keseluruhan", value: "11 Tahun 5 Bulan" },
  {
    label: "Jabatan/TMT/TMT Awal Jabatan",
    value: "ARSIPARIS PERTAMA / 31-10-2023 / -",
  },
  { label: "Jabatan Tambahan", value: "-" },
  { label: "Bidang Keahlian", value: "-" },
  { label: "kampus", value: "199105212014032001" },
];

const CONTACT_DATA: ContactInfo[] = [
  {
    type: "Alamat Rumah Sesuai KTP",
    value: "SIDARUM RT.003 RW.001, KEL. SIDARUM, KEC. KUTOARJO - PURWOREJO",
    iconType: "map",
  },
  {
    type: "Alamat Rumah Domisili",
    value:
      "JALAN KEMBANG IX NO 5A RT 01 RW 03 KELURAHAN KWITANG KECAMATAN SENEN JAKARTA PUSAT",
    iconType: "map",
  },
  {
    type: "Kota/Kode Pos",
    value: "KOTA JAKARTA PUSAT/10420",
    iconType: "map",
  },
  {
    type: "Propinsi/Negara",
    value: "DKI JAKARTA/INDONESIA",
    iconType: "map",
  },
  {
    type: "Telephone Rumah/HP",
    value: "(+62)85743831098",
    iconType: "phone",
  },
  {
    type: "Alamat Kantor",
    value:
      "GEDUNG MINA BAHARI II LT.12 JL MEDAN MERDEKA TIMUR NO.16 JAKARTA 10110",
    iconType: "building",
  },
  {
    type: "Telephone/Ext",
    value: "021-3519070/",
    iconType: "phone",
  },
];

const ANIMATION_DELAYS = {
  LOGO: "0ms",
  TITLE: "200ms",
  SUBTITLE: "400ms",
  BADGE: "100ms",
  CONTACT_CARD: "100ms",
  STATUS_CARD: "400ms",
  PERSONAL_CARD_BASE: 10, // ms per card
  CONTACT_ITEM_BASE: 100, // ms + (index * 80)
  CONTACT_ITEM_MULTIPLIER: 80,
};

// Icon Components
const UserIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CalendarIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const GraduationIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 14l9-5-9-5-9 5 9 5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
    />
  </svg>
);

const BriefcaseIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v6M8 6v6m0 0H4m4 0H8"
    />
  </svg>
);

const MapIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const PhoneIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const BuildingIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

// Helper Functions
const getPersonalIcon = (label: string): React.ReactNode => {
  const iconMap: Record<string, React.ReactNode> = {
    Nama: <UserIcon />,
    "Tempat/Tanggal Lahir": <CalendarIcon />,
    "Pendidikan Akhir": <GraduationIcon />,
    "Unit Kerja": <BriefcaseIcon />,
  };
  return iconMap[label] || null;
};

const getContactIcon = (iconType: string): React.ReactNode => {
  const iconMap: Record<string, React.ReactNode> = {
    map: <MapIcon />,
    phone: <PhoneIcon />,
    building: <BuildingIcon />,
  };
  return iconMap[iconType] || <MapIcon />;
};

const isImportantField = (label: string): boolean => {
  const importantFields = ["Unit Kerja", "Jabatan/TMT/TMT Awal Jabatan"];
  return importantFields.includes(label);
};

const getAnimationProps = (isLoaded: boolean, delay: string) => ({
  className: `transition-all duration-600 ease-out ${
    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
  }`,
  style: {
    transitionDelay: delay,
    animation: isLoaded ? `fadeInUp 0.6s ease-out ${delay} forwards` : "",
  },
});

// Animation Styles
const AnimationStyles: React.FC = () => (
  <style jsx global>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>
);

// Sub Components
const LogoSection: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => (
  <div
    className={`w-25 h-25 mx-auto mb-8 flex items-center justify-center transform hover:scale-110 transition-transform duration-300 hover:rotate-3 ${
      isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-75"
    }`}
    style={{
      transitionDelay: ANIMATION_DELAYS.LOGO,
      animation: isLoaded
        ? `fadeInUp 0.8s ease-out ${ANIMATION_DELAYS.LOGO} forwards`
        : "",
    }}
  >
    <Image
      width={250}
      height={250}
      src="/assets/KKP.png"
      alt="Logo KKP"
      className="w-full h-full object-contain drop-shadow-lg"
    />
  </div>
);

const HeaderContent: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => (
  <>
    <h1 {...getAnimationProps(isLoaded, ANIMATION_DELAYS.TITLE)}>
      <span className="text-5xl font-bold text-white mb-4 tracking-tight block drop-shadow-lg">
        DATA RIWAYAT HIDUP
      </span>
    </h1>

    <p {...getAnimationProps(isLoaded, ANIMATION_DELAYS.SUBTITLE)}>
      <span className="text-blue-50 text-xl max-w-4xl mx-auto leading-relaxed block font-medium mb-2">
        Profil Lengkap Pegawai Direktorat Jenderal Perikanan Tangkap
      </span>
    </p>

    <div {...getAnimationProps(isLoaded, ANIMATION_DELAYS.BADGE)}>
      <span className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-white/15 backdrop-blur-sm rounded-full text-white text-base font-semibold border border-white/25 shadow-lg hover:bg-white/20 transition-all duration-300">
        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
        Kementerian Kelautan dan Perikanan
      </span>
    </div>
  </>
);

const Header: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => (
  <div className="relative max-w-7xl mx-auto px-6 py-20">
    <div className="text-center">
      <LogoSection isLoaded={isLoaded} />
      <HeaderContent isLoaded={isLoaded} />
    </div>
  </div>
);

const InfoCard: React.FC<{
  data: PersonalInfo;
  index: number;
  isLoaded: boolean;
}> = ({ data, index, isLoaded }) => {
  const isImportant = isImportantField(data.label);
  const delay = `${index * ANIMATION_DELAYS.PERSONAL_CARD_BASE}ms`;

  return (
    <div
      className={`group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 
                 hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10
                 hover:-translate-y-1 ${
                   isLoaded
                     ? "opacity-100 translate-y-0"
                     : "opacity-0 translate-y-2"
                 }`}
      style={{
        transitionDelay: delay,
        animation: isLoaded ? `fadeInUp 0.6s ease-out ${delay} forwards` : "",
      }}
    >
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300 shadow-md shadow-blue-400/50" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            {data.hasIcon && (
              <span className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                {getPersonalIcon(data.label)}
              </span>
            )}
            <dt className="text-base font-bold text-blue-900 group-hover:text-blue-800 transition-colors duration-300">
              {data.label}
            </dt>
          </div>

          <dd className="text-sm text-gray-700 leading-relaxed whitespace-pre-line font-medium">
            {data.value}
          </dd>
        </div>
      </div>

      {isImportant && (
        <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-blue-700 rounded-r-2xl shadow-lg" />
      )}
    </div>
  );
};

const ContactCard: React.FC<{
  contact: ContactInfo;
  index: number;
  isLoaded: boolean;
}> = ({ contact, index, isLoaded }) => {
  const delay = `${
    ANIMATION_DELAYS.CONTACT_ITEM_BASE +
    index * ANIMATION_DELAYS.CONTACT_ITEM_MULTIPLIER
  }ms`;

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 
                 border border-blue-100 hover:border-blue-200
                 transition-all duration-300 hover:scale-[1.02] hover:shadow-md
                 ${
                   isLoaded
                     ? "opacity-100 translate-y-0"
                     : "opacity-0 translate-y-2"
                 }`}
      style={{
        transitionDelay: delay,
        animation: isLoaded ? `fadeInUp 0.6s ease-out ${delay} forwards` : "",
      }}
    >
      <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm border border-blue-100">
        <span className="text-blue-600">
          {getContactIcon(contact.iconType)}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <dt className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">
          {contact.type}
        </dt>
        <dd className="text-sm text-gray-800 font-medium leading-relaxed">
          {contact.value}
        </dd>
      </div>
    </div>
  );
};

const PersonalDataSection: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => (
  <div className="lg:col-span-3 space-y-8">
    <section>
      <div className="flex items-center gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg border border-blue-400/20">
            <UserIcon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-blue-900 tracking-tight">
            I. DATA PRIBADI
          </h2>
        </div>
        <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-400 via-blue-300 to-transparent rounded-full" />
      </div>

      <div className="grid gap-6">
        {PERSONAL_DATA.map((item, index) => (
          <InfoCard
            key={`${item.label}-${index}`}
            data={item}
            index={index}
            isLoaded={isLoaded}
          />
        ))}
      </div>
    </section>
  </div>
);

const ContactSection: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => (
  <div
    {...getAnimationProps(isLoaded, ANIMATION_DELAYS.CONTACT_CARD)}
    className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 shadow-xl ${
      isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
        <BuildingIcon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-xl font-bold text-blue-900">Informasi Kontak</h3>
    </div>

    <div className="space-y-4">
      {CONTACT_DATA.map((contact, index) => (
        <ContactCard
          key={`${contact.type}-${index}`}
          contact={contact}
          index={index}
          isLoaded={isLoaded}
        />
      ))}
    </div>
  </div>
);

const StatusSection: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => (
  <div
    {...getAnimationProps(isLoaded, ANIMATION_DELAYS.STATUS_CARD)}
    className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 shadow-xl text-center ${
      isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
  >
    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full text-base font-bold border border-green-200 shadow-md">
      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-400/50" />
      Status Aktif
    </div>
    <p className="text-sm text-gray-600 mt-4 font-medium">
      Pegawai Negeri Sipil
    </p>
  </div>
);

const Sidebar: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => (
  <div className="lg:col-span-1 space-y-6">
    <StatusSection isLoaded={isLoaded} />
    <ContactSection isLoaded={isLoaded} />
  </div>
);

// Main Component
const CVProfile: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 to-cyan-900">
      <AnimationStyles />
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

export default CVProfile;
