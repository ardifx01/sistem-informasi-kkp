import clsx from "clsx";

interface CardChartProps {
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  size?: string;
}

export default function CardChart(props: CardChartProps) {
  const { children, className, isLoading, size = "26rem" } = props;
  return (
    <div
      className={clsx(
        "from-teal-700 to-teal-800 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group",
        {
          "bg-gradient-to-br": !isLoading,
          "bg-teal-800 animate-pulse": isLoading,
        },
        `${isLoading ? `h-${size}` : ""}`,
        className
      )}
    >
      {isLoading ? null : children}
    </div>
  );
}
