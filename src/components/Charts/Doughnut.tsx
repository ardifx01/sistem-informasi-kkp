"use client";

import {
  ArcElement,
  ChartData,
  Chart as ChartJs,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);

interface DoughnutProps {
  data: ChartData<"doughnut">;
  title: string;
}

export default function MyDoughnut(props: DoughnutProps) {
  const { data, title } = props;
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    cutout: "80%",
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
        position: "bottom",
      },
      title: {
        display: true,
        text: title,
        color: "white",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        display: false,
        ticks: {
          display: false,
        },
      },
      y: {
        display: false,
        ticks: {
          display: false,
        },
      },
    },
  };
  return (
    <div className="w-full flex items-center justify-center">
      <Doughnut data={data} className="max-w-lg" options={options} />
    </div>
  );
}
