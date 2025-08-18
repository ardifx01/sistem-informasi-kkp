"use client";
import {
  dataGenders,
  dataGolonganRuang,
  dataPositions,
  dataTingkatPendidikan,
  dataUsia,
} from "@/utils/DataCharts";
import CardChart from "./CardChart";
import Barchart from "./Barchart";
import MyDoughnut from "./Doughnut";
import { useStatsStore } from "@/store/stats-store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ResponsePayload } from "@/types";
import ResponseError from "@/error/ResponseError";

export default function Charts() {
  const { setIsLoading, dataStatusPegawai, setDataStatusPegawai } =
    useStatsStore();

  useEffect(() => {
    const getStats = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/stats/status");
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
        setDataStatusPegawai(
          dataResponse.data!.labels,
          dataResponse.data!.data
        );
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("An error occured!");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getStats();
  }, [setIsLoading, setDataStatusPegawai]);
  return (
    <>
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* Bar Chart 1 - Golongan Ruang */}
        <CardChart>
          <Barchart
            data={dataGolonganRuang}
            title="Berdasarkan Golongan Ruang"
          />
        </CardChart>

        <CardChart>
          <Barchart
            data={dataTingkatPendidikan}
            title="Berdasarkan Tingkat Pendidikan"
          />
        </CardChart>

        <CardChart>
          <Barchart data={dataUsia} title="Berdasarkan Usia" />
        </CardChart>

        <CardChart>
          <MyDoughnut
            data={dataStatusPegawai}
            title="Berdasarkan Status Pegawai"
          />
        </CardChart>
        <CardChart>
          <MyDoughnut data={dataGenders} title="Berdasarkan Jenis Kelamin" />
        </CardChart>
        <CardChart>
          <MyDoughnut data={dataPositions} title="Berdasarkan Jabatan" />
        </CardChart>
      </div>
    </>
  );
}
