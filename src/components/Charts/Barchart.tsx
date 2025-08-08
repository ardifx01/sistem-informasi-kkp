"use client";
import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJs,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarchartProps {
  data: ChartData<"bar">;
  title: string;
}

export default function Barchart(props: BarchartProps) {
  const { data, title } = props;
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        display: false,
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
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };
  return (
    <div className="w-full flex items-center justify-center">
      <Bar className="w-full" data={data} options={options} />
    </div>
  );
}
