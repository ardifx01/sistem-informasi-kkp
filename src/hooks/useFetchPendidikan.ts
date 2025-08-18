import ResponseError from "@/error/ResponseError";
import { useStatsStore } from "@/store/stats-store";
import { ResponsePayload } from "@/types";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function useFetchPendidikan() {
  const { setIsPendidikanLoading, setDataPendidikan } = useStatsStore();

  useEffect(() => {
    const getStats = async () => {
      setIsPendidikanLoading(true);
      try {
        const response = await fetch("/api/stats/pendidikan");
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
        setDataPendidikan(dataResponse.data!.labels, dataResponse.data!.data);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("An error occured!");
        }
      } finally {
        setIsPendidikanLoading(false);
      }
    };

    getStats();
  }, [setIsPendidikanLoading, setDataPendidikan]);
}
