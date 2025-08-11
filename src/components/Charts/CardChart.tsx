import clsx from "clsx";

interface CardChartProps {
  className?: string;
  children: React.ReactNode;
}

export default function CardChart(props: CardChartProps) {
  const { children, className } = props;
  return (
    <div
      className={clsx(
        "bg-gradient-to-br from-teal-700 to-teal-800 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group",
        className
      )}
    >
      {children}
    </div>
  );
}
