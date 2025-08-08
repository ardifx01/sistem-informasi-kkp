import {
  dataGenders,
  dataGolonganRuang,
  dataPositions,
  dataStatusPegawai,
  dataTingkatPendidikan,
  dataUsia,
} from "@/utils/DataCharts";
import CardChart from "./CardChart";
import Barchart from "./Charts/Barchart";
import MyDoughnut from "./Charts/Doughnut";

export default function Charts() {
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
