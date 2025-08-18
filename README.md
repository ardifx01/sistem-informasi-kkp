# Sistem Informasi KKP

Aplikasi berbasis web untuk menampilkan dan mengelola data pegawai. Dibangun menggunakan **Next.js**, **Tailwind CSS**, dan **TypeScript**.

## Deskripsi

Sistem Informasi KKP adalah aplikasi internal untuk pengelolaan data pegawai.  
Fitur utamanya meliputi:

- Menampilkan daftar pegawai lengkap beserta detail informasi.
- Pencarian pegawai berdasarkan query tertentu.
- Menampilkan jumlah pegawai berdasarkan kategori usia atau kriteria lainnya.
- Pembaruan data pegawai melalui **upload file Excel** (hanya untuk pengguna terautentikasi).
- Halaman **/pegawai** yang menampilkan data pegawai secara interaktif.

Aplikasi ini bersifat **privat** dan hanya digunakan secara internal.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Instalasi & Menjalankan Proyek

1. Clone repository ini
   ```bash
   git clone <url-repo>
   cd sistem-informasi-kkp
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Jalankan aplikasi di mode pengembangan
   ```bash
   npm run dev
   ```
4. Buka browser di [http://localhost:3000](http://localhost:3000)

## Struktur Fitur

- **Autentikasi pengguna** – hanya user login yang dapat mengunggah data pegawai.
- **Manajemen data pegawai** – upload file Excel untuk memperbarui data.
- **Filter & Pencarian** – temukan pegawai berdasarkan nama atau kriteria lain.
- **Kategori pegawai** – lihat distribusi pegawai berdasarkan kelompok usia.
- **Detail pegawai** – lihat profil lengkap setiap pegawai.

## Tim Pengembang

- **Fullstack Developer** – Ariel Rizki Muhtamad Bakri
- **Frontend Developer** – Muhammad Davy Wibowo
- **UI/UX Designer** – Faizh Adi Anugrah

## Lisensi

Proyek ini bersifat **Privat**. Segala hak cipta dilindungi dan tidak untuk penggunaan publik.
