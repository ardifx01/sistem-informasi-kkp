import { ChartData } from "chart.js";
import { create } from "zustand";

interface UseStatsStore {
  isStatusLoading: boolean;
  isGenderLoading: boolean;
  dataStatusPegawai: ChartData<"doughnut">;
  dataGender: ChartData<"doughnut">;
  setDataGender: (labels: string[], data: number[]) => void;
  setDataStatusPegawai: (labels: string[], data: number[]) => void;
  setIsStatusLoading: (v: boolean) => void;
  setIsGenderLoading: (v: boolean) => void;
}

export const useStatsStore = create<UseStatsStore>((set) => ({
  isStatusLoading: false,
  isGenderLoading: false,
  dataStatusPegawai: {
    labels: [],
    datasets: [
      {
        label: "Jumlah",
        data: [],
        backgroundColor: [
          "oklch(75% 0.183 55.934)",
          "#7ed957",
          "oklch(90.5% 0.182 98.111)",
        ],
        hoverBackgroundColor: [
          "oklch(75% 0.183 55.934)",
          "#7ed957",
          "oklch(90.5% 0.182 98.111)",
        ],
        borderWidth: 0,
      },
    ],
  },
  dataGender: {
    labels: [],
    datasets: [
      {
        label: "Jumlah",
        data: [],
        backgroundColor: ["oklch(75% 0.183 55.934)", "#7ed957"],
        hoverBackgroundColor: ["oklch(75% 0.183 55.934)", "#7ed957"],
        borderWidth: 0,
      },
    ],
  },
  setDataGender: (l, d) =>
    set({
      dataGender: {
        labels: l,
        datasets: [
          {
            label: "Jumlah",
            data: d,
            backgroundColor: ["oklch(75% 0.183 55.934)", "#7ed957"],
            hoverBackgroundColor: ["oklch(75% 0.183 55.934)", "#7ed957"],
            borderWidth: 0,
          },
        ],
      },
    }),
  setDataStatusPegawai: (l, d) =>
    set({
      dataStatusPegawai: {
        labels: l,
        datasets: [
          {
            label: "Jumlah",
            data: d,
            backgroundColor: [
              "oklch(75% 0.183 55.934)",
              "#7ed957",
              "oklch(90.5% 0.182 98.111)",
            ],
            hoverBackgroundColor: [
              "oklch(75% 0.183 55.934)",
              "#7ed957",
              "oklch(90.5% 0.182 98.111)",
            ],
            borderWidth: 0,
          },
        ],
      },
    }),
  setIsStatusLoading: (v) => set({ isStatusLoading: v }),
  setIsGenderLoading: (v) => set({ isGenderLoading: v }),
}));
