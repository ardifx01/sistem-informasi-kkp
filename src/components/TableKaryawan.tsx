"use client";
import { KaryawanData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Table from "./Table";
import { useTableStore } from "@/store/table-store";
import Link from "next/link";

interface TableKaryawanProps {
  dataKaryawan: KaryawanData[];
}

const columns: ColumnDef<KaryawanData>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "nip",
    header: "NIP",
    cell: ({ row }) => <span>{row.original.nip.split(" : ")[1]}</span>,
  },
  {
    accessorKey: "nama",
    header: "Nama",
    cell: ({ row }) => <span>{row.original.nama}</span>,
  },
  {
    accessorKey: "agama",
    header: "Agama",
    cell: ({ row }) => <span>{row.original.agama}</span>,
  },
  {
    accessorKey: "nama_jab",
    header: "Nama Jabatan",
    cell: ({ row }) => <span>{row.original.nama_jab}</span>,
  },
  {
    accessorKey: "jenis_kel",
    header: "Jenis Kelamin",
    cell: ({ row }) => <span>{row.original.jenis_kel}</span>,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <Link
        href={"/pegawai/" + row.original.nip.split(" : ")[1]}
        className="text-sm hover:underline cursor-pointer"
      >
        Detail
      </Link>
    ),
  },
];

export default function TableKaryawan(props: TableKaryawanProps) {
  const { dataKaryawan } = props;
  const { dataPegawai } = useTableStore();
  const dataTable =
    typeof dataPegawai === "undefined" ? dataKaryawan : dataPegawai;

  return <Table className="mt-4" columns={columns} data={dataTable} />;
}
