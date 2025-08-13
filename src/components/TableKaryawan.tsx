"use client";
import { KaryawanData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Table from "./Table";

export default function TableKaryawan() {
  const dataKaryawan: KaryawanData[] = [
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
    {
      npm: "10123178",
      nama: "Ariel Rizki",
      kelas: "2KA04",
      hobby: "membaca",
      age: 20,
    },
  ];
  const columns: ColumnDef<KaryawanData>[] = [
    {
      accessorKey: "no",
      header: "No",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "npm",
      header: "NPM",
      cell: ({ row }) => <span>{row.original.npm}</span>,
    },
    {
      accessorKey: "nama",
      header: "Nama",
      cell: ({ row }) => <span>{row.original.nama}</span>,
    },
    {
      accessorKey: "kelas",
      header: "Kelas",
      cell: ({ row }) => <span>{row.original.kelas}</span>,
    },
    {
      accessorKey: "hobby",
      header: "Hobby",
      cell: ({ row }) => <span>{row.original.hobby}</span>,
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: ({ row }) => <span>{row.original.age}</span>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: () => <span className="text-sm hover:underline cursor-pointer">Detail</span>,
    },
  ];

  return (
    <>
      <Table className="mt-4" columns={columns} data={dataKaryawan} />
    </>
  );
}
