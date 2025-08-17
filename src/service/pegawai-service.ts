import { db } from "@/lib/firebase";
import { ExcelFile, KaryawanData, ResponsePayload } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import { read, SSF, utils } from "xlsx";

export default class PegawaiService {
  static async getAllPegawai(query: URLSearchParams): Promise<ResponsePayload> {
    const headerRegistered: string[] = [
      "nama",
      "nip",
      "agama",
      "nama_jab",
      "jenis_kel",
    ];

    const querySnapshot = await getDocs(collection(db, "excelFile"));
    const dataExcel: ExcelFile[] = [];
    querySnapshot.forEach((docSnap) => {
      dataExcel.push({
        id: docSnap.id,
        ...(docSnap.data() as Omit<ExcelFile, "id">),
      });
    });

    const response = await fetch(dataExcel[0].urlExcel);
    const arrayBuffer = await response.arrayBuffer();

    const workbook = read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const workSheets = workbook.Sheets[sheetName];
    const data: string[][] = utils.sheet_to_json(workSheets, {
      header: 1,
      defval: "",
    });

    const indexHeaders = headerRegistered.map((h) =>
      data[0].indexOf(h.toUpperCase())
    );
    const dataPegawai = data.slice(1).map((d) => ({
      nama: d[indexHeaders[0]],
      nip: d[indexHeaders[1]],
      agama: d[indexHeaders[2]],
      nama_jab: d[indexHeaders[3]],
      jenis_kel: d[indexHeaders[4]],
    })) as KaryawanData[];
    const q = query.get("q");

    if (q) {
      let dataFiltered = dataPegawai.filter((data) => data.nip.includes(q));
      if (dataFiltered.length === 0) {
        dataFiltered = dataPegawai.filter((data) =>
          data.nama.toUpperCase().includes(q.toUpperCase())
        );
      }
      return {
        status: "success",
        statusCode: 200,
        message: "Successfully get data user by NIP",
        data: dataFiltered,
      };
    }

    return {
      status: "success",
      statusCode: 201,
      message: "Successfully get data!",
      data: dataPegawai,
    };
  }

  static async getDetailPegawai(nip: string): Promise<ResponsePayload> {
    const headersRegistered: string[] = [
      "nama",
      "nip",
      "agama",
      "nama_jab",
      "jenis_kel",
      "stat_kawin",
      "gol_darah",
      "pend_akhir",
      "alamat",
      "kota",
      "kode_pos",
      "propinsi",
      "nama_unker",
      "almt_email",
      "negara2",
      "no_hp_sms",
      "no_npwp",
      "tmp_lahir",
      "tgl_lahir",
      "nama_sek",
      "prog_studi",
      "stat_kepeg"
    ];

    const querySnapshot = await getDocs(collection(db, "excelFile"));
    const dataExcel: ExcelFile[] = [];
    querySnapshot.forEach((docSnap) => {
      dataExcel.push({
        id: docSnap.id,
        ...(docSnap.data() as Omit<ExcelFile, "id">),
      });
    });

    const response = await fetch(dataExcel[0].urlExcel);
    const arrayBuffer = await response.arrayBuffer();

    const workbook = read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const workSheets = workbook.Sheets[sheetName];
    const data: string[][] = utils.sheet_to_json(workSheets, {
      header: 1,
      defval: "",
    });

    const indexHeaders = headersRegistered.map((h) =>
      data[0].indexOf(h.toUpperCase())
    );

    const dataPegawai = data.slice(1).map((d) =>
      headersRegistered.reduce((acc, cu, i) => {
        acc[cu] = d[indexHeaders[i]];
        return acc;
      }, {} as Record<string, string>)
    );

    const filteredByNip = dataPegawai.find((data) => {
      const nipExcel = data.nip.split(" : ")[1];
      return nipExcel == nip;
    });

    let dataPegawaiNip;

    if (filteredByNip) {
      const { tgl_lahir, ...rest } = filteredByNip;
      const tglLahirObj = SSF.parse_date_code(tgl_lahir) as {
        y: number;
        m: number;
        d: number;
        h: number;
        M: number;
        s: number;
      };

      const tglLahirFormatted = `${tglLahirObj.d
        .toString()
        .padStart(2, "0")}/${tglLahirObj.m.toString().padStart(2, "0")}/${
        tglLahirObj.y
      }`;

      dataPegawaiNip = {
        ...rest,
        tgl_lahir: tglLahirFormatted,
      };
    }

    return {
      status: "success",
      statusCode: 200,
      message: "Sucessfully get detail data",
      data: filteredByNip ? dataPegawaiNip : null,
    };
  }
}
