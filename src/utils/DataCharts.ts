import { ChartData } from "chart.js";

export const dataGolonganRuang: ChartData<"bar"> = {
  labels: ["I", "II", "III", "IV", "V", "VII", "IX"],
  datasets: [
    {
      label: "Jumlah",
      data: [1, 213, 854, 135, 139, 87, 227],
      backgroundColor: "oklch(90.5% 0.182 98.111)",
      hoverBackgroundColor: "oklch(75% 0.183 55.934)",
      borderRadius: 6,
    },
  ],
};

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

export const dataStatusPegawai: ChartData<"doughnut"> = {
  labels: ["PNS", "PPK", "NON ASN"],
  datasets: [
    {
      label: "Jumlah",
      data: [1645, 452, 390],
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

export const dataGenders: ChartData<"doughnut"> = {
  labels: ["Perempuan", "Laki-laki"],
  datasets: [
    {
      label: "Jumlah",
      data: [1655, 744],
      backgroundColor: ["oklch(75% 0.183 55.934)", "#7ed957"],
      hoverBackgroundColor: ["oklch(75% 0.183 55.934)", "#7ed957"],
      borderWidth: 0,
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
