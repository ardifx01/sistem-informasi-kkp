import ResponseError from "@/error/ResponseError";
import { StatsDataEmployee, useStatsStore } from "@/store/stats-store";
import { ResponsePayload } from "@/types";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function useFetchStatsEmployee() {
  const { setIsStatsDataEmployeeLoading, setStatsDataEmployee } =
    useStatsStore();

  useEffect(() => {
    const getStats = async () => {
      setIsStatsDataEmployeeLoading(true);
      try {
        const response = await fetch("/api/stats/status?polri=true");
        const dataResponse =
          (await response.json()) as ResponsePayload<StatsDataEmployee>;

        if (dataResponse.status === "failed") {
          throw new ResponseError(
            dataResponse.statusCode,
            dataResponse.message
          );
        }
        setStatsDataEmployee(dataResponse.data!);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("An error occured!");
        }
      } finally {
        setIsStatsDataEmployeeLoading(false);
      }
    };

    getStats();
  }, [setIsStatsDataEmployeeLoading, setStatsDataEmployee]);
}
