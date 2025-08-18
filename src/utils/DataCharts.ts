import { ChartData } from "chart.js";

export const dataTingkatPendidikan: ChartData<"bar"> = {
  labels: ["S3", "S2", "S1", "D4", "SM", "D3", "D1", "SLTA", "SLTP", "SD"],
  datasets: [
    {
      label: "Jumlah",
      data: [7, 197, 610, 198, 0, 211, 1, 423, 6, 2],
      backgroundColor: "oklch(90.5% 0.182 98.111)",
      hoverBackgroundColor: "oklch(75% 0.183 55.934)",
      borderRadius: 6,
    },
  ],
};

export const dataUsia: ChartData<"bar"> = {
  labels: [
    "<25",
    "25-30",
    "31-35",
    "36-40",
    "41-45",
    "46-50",
    "51-55",
    "56",
    "57",
    "58",
    ">58",
  ],
  datasets: [
    {
      label: "Jumlah",
      data: [1, 207, 235, 304, 308, 277, 200, 37, 32, 33, 21],
      backgroundColor: "oklch(90.5% 0.182 98.111)",
      hoverBackgroundColor: "oklch(75% 0.183 55.934)",
      borderRadius: 6,
    },
  ],
};

export const dataPositions: ChartData<"doughnut"> = {
  labels: ["Struktural", "JFT", "JFU"],
  datasets: [
    {
      label: "Jumlah",
      data: [1583, 744, 72],
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
};
