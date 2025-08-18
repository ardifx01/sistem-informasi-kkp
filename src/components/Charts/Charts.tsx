"use client";
import { dataPositions, dataUsia } from "@/utils/DataCharts";
import CardChart from "./CardChart";
import Barchart from "./Barchart";
import MyDoughnut from "./Doughnut";
import { useStatsStore } from "@/store/stats-store";
import useFetchStatusPegawai from "@/hooks/useFetchStatusPegawai";
import useFetchGender from "@/hooks/useFetchGender";
import useFetchGolongan from "@/hooks/useFetchGolongan";
import useFetchPendidikan from "@/hooks/useFetchPendidikan";

export default function Charts() {
  const {
    dataStatusPegawai,
    dataGender,
    dataGolongan,
    isGenderLoading,
    isStatusLoading,
    isGolonganLoading,
    isPendidikanLoading,
    dataPendidikan,
  } = useStatsStore();

  useFetchGolongan();
  useFetchStatusPegawai();
  useFetchGender();
  useFetchPendidikan();

  return (
    <>
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* Bar Chart 1 - Golongan Ruang */}
        <CardChart isLoading={isGolonganLoading}>
          <Barchart data={dataGolongan} title="Berdasarkan Golongan Ruang" />
        </CardChart>

        <CardChart isLoading={isPendidikanLoading}>
          <Barchart
            data={dataPendidikan}
            title="Berdasarkan Tingkat Pendidikan"
          />
        </CardChart>

        <CardChart>
          <Barchart data={dataUsia} title="Berdasarkan Usia" />
        </CardChart>

        <CardChart isLoading={isStatusLoading}>
          <MyDoughnut
            data={dataStatusPegawai}
            title="Berdasarkan Status Pegawai"
          />
        </CardChart>
        <CardChart isLoading={isGenderLoading}>
          <MyDoughnut data={dataGender} title="Berdasarkan Jenis Kelamin" />
        </CardChart>
        <CardChart>
          <MyDoughnut data={dataPositions} title="Berdasarkan Jabatan" />
        </CardChart>
      </div>
    </>
  );
}
