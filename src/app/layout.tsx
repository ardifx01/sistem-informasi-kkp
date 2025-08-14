import type { Metadata } from "next";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "AFD.KKP",
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
      <body className={`bg-cyan-400 antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
