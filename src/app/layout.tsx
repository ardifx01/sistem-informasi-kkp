import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistem Informasi KKP",
  description:
    "Sistem Informasi KKP adalah platform digital yang dikembangkan untuk mendukung pengelolaan data, layanan, dan informasi di lingkungan Kementerian Kelautan dan Perikanan. Aplikasi ini memfasilitasi pengolahan data kelautan dan perikanan, pelaporan, pemantauan program, serta penyajian informasi publik secara cepat, akurat, dan terintegrasi. Dengan sistem ini, proses administrasi dan pengambilan keputusan di sektor kelautan dan perikanan dapat dilakukan lebih efektif dan transparan.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
