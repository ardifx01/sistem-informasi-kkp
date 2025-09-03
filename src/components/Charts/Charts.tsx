"use client";
import { dataPositions } from "@/utils/DataCharts";
import CardChart from "./CardChart";
import Barchart from "./Barchart";
import MyDoughnut from "./Doughnut";
import { useStatsStore } from "@/store/stats-store";
import useFetchStatusPegawai from "@/hooks/useFetchStatusPegawai";
import useFetchGender from "@/hooks/useFetchGender";
import useFetchGolongan from "@/hooks/useFetchGolongan";
import useFetchPendidikan from "@/hooks/useFetchPendidikan";
import useFetchAge from "@/hooks/useFetchAge";

interface ChartsProps {
  displayBar?: boolean;
}

export default function Charts(props: ChartsProps) {
  const { displayBar } = props;
  const {
    dataStatusPegawai,
    dataGender,
    dataGolongan,
    isGenderLoading,
    isStatusLoading,
    isGolonganLoading,
    isPendidikanLoading,
    dataPendidikan,
    dataUsia,
    isAgeLoading,
  } = useStatsStore();

  useFetchGolongan();
  useFetchStatusPegawai();
  useFetchGender();
  useFetchPendidikan();
  useFetchAge();

  // return (
  //   <div>
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
  //       {/* Bar Chart 1 - Golongan Ruang */}
  //       <CardChart isBar isLoading={isGolonganLoading}>
  //         <Barchart data={dataGolongan} title="Berdasarkan Golongan Ruang" />
  //       </CardChart>

  //       <CardChart isBar isLoading={isPendidikanLoading}>
  //         <Barchart
  //           data={dataPendidikan}
  //           title="Berdasarkan Tingkat Pendidikan"
  //         />
  //       </CardChart>

  //       <CardChart isBar isLoading={isAgeLoading}>
  //         <Barchart data={dataUsia} title="Berdasarkan Usia" />
  //       </CardChart>

  //       <CardChart isLoading={isStatusLoading}>
  //         <MyDoughnut
  //           data={dataStatusPegawai}
  //           title="Berdasarkan Status Pegawai"
  //         />
  //       </CardChart>
  //       <CardChart isLoading={isGenderLoading}>
  //         <MyDoughnut data={dataGender} title="Berdasarkan Jenis Kelamin" />
  //       </CardChart>
  //       <CardChart isLoading={isGenderLoading}>
  //         <MyDoughnut data={dataPositions} title="Berdasarkan Jabatan" />
  //       </CardChart>
  //     </div>
  //   </div>
  // );

  return (
    <>
      {displayBar ? (
        <>
          <CardChart isBar isLoading={isGolonganLoading}>
            <Barchart data={dataGolongan} title="Berdasarkan Golongan Ruang" />
          </CardChart>

          <CardChart isBar isLoading={isPendidikanLoading}>
            <Barchart
              data={dataPendidikan}
              title="Berdasarkan Tingkat Pendidikan"
            />
          </CardChart>

          <CardChart isBar isLoading={isAgeLoading}>
            <Barchart data={dataUsia} title="Berdasarkan Usia" />
          </CardChart>
        </>
      ) : (
        <>
          <CardChart isLoading={isStatusLoading}>
            <MyDoughnut
              data={dataStatusPegawai}
              title="Berdasarkan Status Pegawai"
            />
          </CardChart>
          <CardChart isLoading={isGenderLoading}>
            <MyDoughnut data={dataGender} title="Berdasarkan Jenis Kelamin" />
          </CardChart>
          <CardChart isLoading={isGenderLoading}>
            <MyDoughnut data={dataPositions} title="Berdasarkan Jabatan" />
          </CardChart>
        </>
      )}
    </>
  );
}
