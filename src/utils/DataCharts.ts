import { ChartData } from "chart.js";
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
