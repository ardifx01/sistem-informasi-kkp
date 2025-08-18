import { ChartData } from "chart.js";
import { create } from "zustand";

interface UseStatsStore {
  isLoading: boolean;
  dataStatusPegawai: ChartData<"doughnut">;
  setDataStatusPegawai: (labels: string[], data: number[]) => void;
  setIsLoading: (v: boolean) => void;
}

export const useStatsStore = create<UseStatsStore>((set) => ({
  isLoading: false,
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
  setIsLoading: (v) => set({ isLoading: v }),
}));
