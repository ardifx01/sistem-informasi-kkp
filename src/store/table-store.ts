import { KaryawanData } from "@/types";
import { create } from "zustand";
interface TableStore {
  valueSearch: string | undefined;
  loading: boolean;
  dataPegawai: KaryawanData[] | [] | undefined;
  setDataPegawai: (v: TableStore["dataPegawai"]) => void;
  setLoading: (v: boolean) => void;
  setValueSearch: (v: string) => void;
}

export const useTableStore = create<TableStore>((set) => ({
  valueSearch: undefined,
  loading: false,
  dataPegawai: undefined,
  setDataPegawai: (v) => set({ dataPegawai: v }),
  setLoading: (v) => set({ loading: v }),
  setValueSearch: (v) => set({ valueSearch: v }),
}));
