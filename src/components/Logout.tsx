"use client";
import { ResponsePayload } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Logout() {
  const router = useRouter();
  async function handleLogout() {
    try {
      const response = await fetch("/api/auth", {
        method: "DELETE",
      });

      const responseData = (await response.json()) as ResponsePayload;
      if (responseData.status === "failed") {
        throw new Error(responseData.message);
      }

      toast.success("Successfully logout");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error durring logout: " + error.message);
        return;
      }

      toast.error("Internal Server error");
    }
  }
  return (
    <button
      data-tooltip-id="logout-tooltip"
      data-tooltip-content={"Logout"}
      onClick={handleLogout}
      className="cursor-pointer"
    >
      <i className="ri-logout-box-r-line text-2xl md:text-3xl text-gray-800"></i>
    </button>
  );
}
