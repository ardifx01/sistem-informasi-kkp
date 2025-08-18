"use client";
import {
  dataGolonganRuang,
  dataPositions,
  dataTingkatPendidikan,
  dataUsia,
} from "@/utils/DataCharts";
import CardChart from "./CardChart";
import Barchart from "./Barchart";
import MyDoughnut from "./Doughnut";
import { useStatsStore } from "@/store/stats-store";
import useFetchStatusPegawai from "@/hooks/useFetchStatusPegawai";
import useFetchGender from "@/hooks/useFetchGender";

export default function Charts() {
  const { dataStatusPegawai, dataGender, isGenderLoading, isStatusLoading } =
    useStatsStore();

  useFetchStatusPegawai();
  useFetchGender();
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
