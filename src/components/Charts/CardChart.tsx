import clsx from "clsx";

interface CardChartProps {
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  isBar?: boolean;
}

export default function CardChart(props: CardChartProps) {
  const { children, className, isLoading, isBar } = props;
  return (
    <div
      className={clsx(
        "from-teal-700/70 to-teal-800/70 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex items-center justify-center cursor-pointer group",
        {
          "bg-gradient-to-br": !isLoading,
          "bg-teal-800 animate-pulse": isLoading,
        },
        `${isLoading ? (isBar ? "h-[14rem]" : "h-[14rem]") : "h-[13rem]"}`,
        className
      )}
    >
      {isLoading ? null : children}
    </div>
  );
}
