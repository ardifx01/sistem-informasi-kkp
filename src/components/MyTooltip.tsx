"use client";
import { Tooltip } from "react-tooltip";

interface MyTooltipProps {
  id: string;
  children: React.ReactNode;
}
export default function MyTooltip(props: MyTooltipProps) {
  const { id, children } = props;
  return (
    <>
      {children}
      <Tooltip id={id} className="z-[9999]" place="top" noArrow />
    </>
  );
}
