import { uptLocations } from "@/utils/uptLocations";
import { create } from "zustand";

interface MapStore {
  locationUpt: typeof uptLocations;
  setLocationUpt: (v: typeof uptLocations) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  locationUpt: uptLocations,
  setLocationUpt: (v) => set({ locationUpt: v }),
}));
