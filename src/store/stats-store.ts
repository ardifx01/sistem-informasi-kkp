import { ChartData } from "chart.js";
import { create } from "zustand";

interface UseStatsStore {
  isStatusLoading: boolean;
  isGenderLoading: boolean;
  isGolonganLoading: boolean;
  isPendidikanLoading: boolean;
  isAgeLoading: boolean;
  dataStatusPegawai: ChartData<"doughnut">;
  dataGender: ChartData<"doughnut">;
  dataGolongan: ChartData<"bar">;
  dataPendidikan: ChartData<"bar">;
  dataUsia: ChartData<"bar">;

  setDataUsia: (labels: string[], data: number[]) => void;
  setDataPendidikan: (labels: string[], data: number[]) => void;
  setDataGolongan: (labels: string[], data: number[]) => void;
  setDataGender: (labels: string[], data: number[]) => void;
  setDataStatusPegawai: (labels: string[], data: number[]) => void;
  setIsStatusLoading: (v: boolean) => void;
  setIsGenderLoading: (v: boolean) => void;
  setIsGolonganLoading: (v: boolean) => void;
  setIsPendidikanLoading: (v: boolean) => void;
  setIsAgeLoading: (v: boolean) => void;
}

export const useStatsStore = create<UseStatsStore>((set) => ({
  isStatusLoading: false,
  isGenderLoading: false,
  isGolonganLoading: false,
  isPendidikanLoading: false,
  isAgeLoading: false,
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
  dataGolongan: {
    labels: [],
    datasets: [
      {
        label: "Jumlah",
        data: [],
        backgroundColor: "oklch(90.5% 0.182 98.111)",
        hoverBackgroundColor: "oklch(75% 0.183 55.934)",
        borderRadius: 6,
      },
    ],
  },
  dataPendidikan: {
    labels: [],
    datasets: [
      {
        label: "Jumlah",
        data: [],
        backgroundColor: "oklch(90.5% 0.182 98.111)",
        hoverBackgroundColor: "oklch(75% 0.183 55.934)",
        borderRadius: 6,
      },
    ],
  },
  dataUsia: {
    labels: [],
    datasets: [
      {
        label: "Jumlah",
        data: [],
        backgroundColor: "oklch(90.5% 0.182 98.111)",
        hoverBackgroundColor: "oklch(75% 0.183 55.934)",
        borderRadius: 6,
      },
    ],
  },
  setDataUsia: (l, d) =>
    set({
      dataUsia: {
        labels: l,
        datasets: [
          {
            label: "Jumlah",
            data: d,
            backgroundColor: "oklch(90.5% 0.182 98.111)",
            hoverBackgroundColor: "oklch(75% 0.183 55.934)",
            borderRadius: 6,
          },
        ],
      },
    }),
  setDataPendidikan: (l, d) =>
    set({
      dataPendidikan: {
        labels: l,
        datasets: [
          {
            label: "Jumlah",
            data: d,
            backgroundColor: "oklch(90.5% 0.182 98.111)",
            hoverBackgroundColor: "oklch(75% 0.183 55.934)",
            borderRadius: 6,
          },
        ],
      },
    }),
  setDataGolongan: (l, d) =>
    set({
      dataGolongan: {
        labels: l,
        datasets: [
          {
            label: "Jumlah",
            data: d,
            backgroundColor: "oklch(90.5% 0.182 98.111)",
            hoverBackgroundColor: "oklch(75% 0.183 55.934)",
            borderRadius: 6,
          },
        ],
      },
    }),
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
  setIsGolonganLoading: (v) => set({ isGolonganLoading: v }),
  setIsPendidikanLoading: (v) => set({ isPendidikanLoading: v }),
  setIsAgeLoading: (v) => set({ isAgeLoading: v }),
}));
