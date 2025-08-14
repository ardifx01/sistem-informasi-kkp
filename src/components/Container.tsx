import clsx from "clsx";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export default function Container(props: ContainerProps) {
  const { children, className } = props;
  return (
    <div
      className={clsx(
        "w-full flex items-center pt-2 justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
