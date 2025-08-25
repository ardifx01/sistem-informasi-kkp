import ResponseError from "@/error/ResponseError";
import { KaryawanData, ResponsePayload } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

export function useColumns(): ColumnDef<KaryawanData>[][] {
  const [loadingNip, setLoadingNip] = useState<string | null>();
  const router = useRouter();
  const handleClickDetail = async (nip: string) => {
    setLoadingNip(nip);
    try {
      const response = await fetch("/api/auth/verify");
      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.statusCode, dataResponse.message);
      }
      router.push("/pegawai/" + nip);
    } catch (error) {
      setLoadingNip(null);
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        console.error(error);
        toast.error("An error occurred");
      }
    }
  };

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
          <div className="w-full flex items-center justify-center">
            <BeatLoader color="white" size={10} />
          </div>
        ) : (
          <button
            onClick={() => handleClickDetail(nip)}
            className="text-sm text-white hover:underline cursor-pointer"
          >
            Detail
          </button>
        );
      },
    },
  ];

  return [columns];
}
