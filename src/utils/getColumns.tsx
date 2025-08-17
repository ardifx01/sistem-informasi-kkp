import { KaryawanData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

export function useColumns(): ColumnDef<KaryawanData>[][] {
  const [loadingNip, setLoadingNip] = useState<string | null>();

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
      cell: ({ row }) => {
        const nip = row.original.nip.split(" : ")[1];
        const isRowLoading = loadingNip === nip;
        return isRowLoading ? (
          <BeatLoader color="white" size={10} />
        ) : (
          <Link
            onClick={() => setLoadingNip(nip)}
            href={"/pegawai/" + row.original.nip.split(" : ")[1]}
            className="text-sm text-white hover:underline cursor-pointer"
          >
            Detail
          </Link>
        );
      },
    },
  ];

  return [columns];
}
