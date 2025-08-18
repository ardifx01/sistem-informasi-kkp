import { useStatsStore } from "@/store/stats-store";
import clsx from "clsx";

interface CardChartProps {
  className?: string;
  children: React.ReactNode;
}

export default function CardChart(props: CardChartProps) {
  const { children, className } = props;
  const { isLoading } = useStatsStore();
  return (
    <div
      className={clsx(
        "from-teal-700 to-teal-800 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group",
        {
          "bg-gradient-to-br": !isLoading,
          "bg-teal-800 animate-pulse h-[10rem]": isLoading
        },
        className
      )}
    >
      {isLoading ? null : children}
    </div>
  );
}
