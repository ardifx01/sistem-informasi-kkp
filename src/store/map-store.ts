import { create } from "zustand";

export type UptLocation = {
  name: string;
  region: string;
  lat: number;
  lng: number;
  employees: {
    male: number;
    female: number;
  };
};

interface MapStore {
  locationUpt: UptLocation[];
  isLoading: boolean;
  data: UptLocation[];
  setData: (v: UptLocation[]) => void;
  setIsLoading: (v: boolean) => void;
  setLocationUpt: (v: UptLocation[]) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  locationUpt: [],
  isLoading: false,
  data: [],
  setData: (v) => set({ data: v }),
  setIsLoading: (v) => set({ isLoading: v }),
  setLocationUpt: (v) => set({ locationUpt: v }),
}));
