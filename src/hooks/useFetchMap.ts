import ResponseError from "@/error/ResponseError";
import { UptLocation, useMapStore } from "@/store/map-store";
import { ResponsePayload } from "@/types";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function useFetchMap() {
  const { setIsLoading, setLocationUpt, setData } = useMapStore();

  useEffect(() => {
    const getDataMap = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/stats/map");
        const dataResponse = (await response.json()) as ResponsePayload<
          UptLocation[]
        >;

        if (dataResponse.status === "failed") {
          throw new ResponseError(
            dataResponse.statusCode,
            dataResponse.message
          );
        }

        setLocationUpt(dataResponse.data!);
        setData(dataResponse.data!);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("An error occured!");
        }
        setIsLoading(false);
      }
    };

    getDataMap();
  }, [setIsLoading, setLocationUpt, setData]);
}
