"use client";
import { KaryawanData } from "@/types";
import Table from "./Table";
import { useTableStore } from "@/store/table-store";
import { useColumns } from "@/utils/getColumns";

interface TableKaryawanProps {
  dataKaryawan: KaryawanData[];
}

export default function TableKaryawan(props: TableKaryawanProps) {
  const { dataKaryawan } = props;
  const { dataPegawai } = useTableStore();
  const [columns] = useColumns();

  const dataTable =
    typeof dataPegawai === "undefined" ? dataKaryawan : dataPegawai;

  return <Table className="mt-4" columns={columns} data={dataTable} />;
}
