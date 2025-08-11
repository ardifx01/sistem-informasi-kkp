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
      <Tooltip id={id} place="top" noArrow />
    </>
  );
}
