import ResponseError from "@/error/ResponseError";
import { useStatsStore } from "@/store/stats-store";
import { ResponsePayload } from "@/types";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function useFetchAge() {
  const { setIsAgeLoading, setDataUsia } = useStatsStore();

  useEffect(() => {
    const getStats = async () => {
      setIsAgeLoading(true);
      try {
        const response = await fetch("/api/stats/age");
        const dataResponse = (await response.json()) as ResponsePayload<{
          labels: string[];
          data: number[];
        }>;

        if (dataResponse.status === "failed") {
          throw new ResponseError(
            dataResponse.statusCode,
            dataResponse.message
          );
        }
        setDataUsia(dataResponse.data!.labels, dataResponse.data!.data);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("An error occured!");
        }
      } finally {
        setIsAgeLoading(false);
      }
    };

    getStats();
  }, [setIsAgeLoading, setDataUsia]);
}
