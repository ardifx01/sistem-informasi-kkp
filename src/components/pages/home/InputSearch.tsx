"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

export default function InputSearch() {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <div className="flex w-auto md:w-[20rem] flex-1 bg-gray-600 bg-opacity-20 rounded-full px-4 py-1 md:py-2 items-center">
        <input
          type="search"
          value={value}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setIsLoading(true);
              router.push("/pegawai?q=" + value.trim());
            }
          }}
          readOnly={isLoading}
          disabled={isLoading}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Cari nama / NIP"
          className="text-white w-full placeholder:text-gray-400 placeholder-opacity-70 border-opacity-30 focus:outline-none focus:border-white focus:bg-opacity-30 transition-all duration-300 text-sm sm:text-base"
        />
        {isLoading ? <PulseLoader color="white" size={12} /> : null}
      </div>
    </>
  );
}
