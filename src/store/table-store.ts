import { KaryawanData } from "@/types";
import { create } from "zustand";
export type Value = "all" | "pns" | "pppk" | "polri" | "nonasn";

interface TableStore {
  valueSearch: string | undefined;
  loading: boolean;
  dataPegawai: KaryawanData[] | [] | undefined;
  category: Value;
  setCategory: (v: Value) => void;
  setDataPegawai: (v: TableStore["dataPegawai"]) => void;
  setLoading: (v: boolean) => void;
  setValueSearch: (v: TableStore["valueSearch"]) => void;
}

export const useTableStore = create<TableStore>((set) => ({
  valueSearch: undefined,
  loading: false,
  dataPegawai: undefined,
  category: "all",
  setCategory: (v) => set({ category: v }),
  setDataPegawai: (v) => set({ dataPegawai: v }),
  setLoading: (v) => set({ loading: v }),
  setValueSearch: (v) => set({ valueSearch: v }),
}));
