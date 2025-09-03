"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export default function Back() {
  const [disabled, setDisabled] = useState(false);
  return disabled ? (
    <i
      className={clsx(
        "text-5xl fixed top-[52px] left-10 lg:left-18 ri-arrow-left-circle-line z-50 transition-colors text-gray-400 cursor-not-allowed"
      )}
    ></i>
  ) : (
    <Link
      onClick={() => setDisabled(true)}
      href={"/pegawai"}
      className={clsx("hidden md:block")}
    >
      <i
        className={clsx(
          "text-5xl fixed top-[52px] left-10 lg:left-18 text-black hover:text-blue-600 ri-arrow-left-circle-line z-50 transition-colors"
        )}
      ></i>
    </Link>
  );
}
