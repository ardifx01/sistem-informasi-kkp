import clsx from "clsx";

interface CardChartProps {
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function CardChart(props: CardChartProps) {
  const { children, className, isLoading } = props;
  return (
    <div
      className={clsx(
        "from-teal-700 to-teal-800 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group",
        {
          "bg-gradient-to-br": !isLoading,
          "bg-teal-800 animate-pulse h-[26rem]": isLoading,
        },
        className
      )}
    >
      {isLoading ? null : children}
    </div>
  );
}
