import { transformFileMap } from "@/helper/transformFileMap";
import { db } from "@/lib/firebase";
import { ExcelFile, ResponsePayload } from "@/types";
import getAgePegawai from "@/utils/getAgePegawai";
import { collection, getDocs } from "firebase/firestore";
import { read, SSF, utils } from "xlsx";

export default class StatsService {
  static async getStatsStatus(
    query: URLSearchParams
  ): Promise<ResponsePayload> {
    const headerRegistered: string[] = ["stat_kepeg"];
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
      stat_kepeg: d[indexHeaders[0]],
    }));

    let totalPns = 0;
    let totalPPPK = 0;
    let totalNonASn = 0;

    dataPegawai.forEach((d) => {
      if (d.stat_kepeg.toLowerCase() === "pns") {
        totalPns++;
      } else if (d.stat_kepeg.toLowerCase() === "pppk") {
        totalPPPK++;
      } else {
        totalNonASn++;
      }
    });

    const findPolri = query.get("polri");
    if (findPolri) {
      let totalPns = 0;
      let totalPPPK = 0;
      let totalPolri = 0;
      let totalNonASn = 0;

      dataPegawai.forEach((d) => {
        if (d.stat_kepeg.toLowerCase() === "pns") {
          totalPns++;
        } else if (d.stat_kepeg.toLowerCase() === "pppk") {
          totalPPPK++;
        } else if (d.stat_kepeg.toLowerCase() === "polri") {
          totalPolri++;
        } else {
          totalNonASn++;
        }
      });

      return {
        status: "success",
        statusCode: 200,
        message: "Successfully get stats Status Pegawai",
        data: {
          totalPns,
          totalPPPK,
          totalPolri,
          totalNonASn,
          totalPegawai: dataPegawai.length,
        },
      };
    }

    return {
      status: "success",
      statusCode: 200,
      message: "Successfully get stats Status Pegawai",
      data: {
        labels: ["PNS", "PPPK", "NON ASN"],
        data: [totalPns, totalPPPK, totalNonASn],
      },
    };
  }

  static async getStatsGender(): Promise<ResponsePayload> {
    const headerRegistered: string[] = ["jenis_kel"];
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
      jenis_kel: d[indexHeaders[0]],
    }));

    let countMan = 0;
    let countWomen = 0;

    dataPegawai.forEach((d) => {
      if (d.jenis_kel.toLowerCase().includes("laki")) {
        countMan++;
      } else {
        countWomen++;
      }
    });

    return {
      status: "success",
      statusCode: 200,
      message: "Successfully get stats Gender Pegawai",
      data: {
        labels: ["Perempuan", "Laki-Laki"],
        data: [countMan, countWomen],
      },
    };
  }

  static async getStatsGolongan(): Promise<ResponsePayload> {
    const headerRegistered: string[] = ["gol_akhir"];
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
      gol_akhir: d[indexHeaders[0]],
    }));

    let I = 0;
    let II = 0;
    let III = 0;
    let IV = 0;
    let V = 0;
    let VII = 0;
    let IX = 0;

    dataPegawai.forEach((d) => {
      const golongan = d.gol_akhir.toUpperCase().slice(0, -2);
      switch (golongan) {
        case "I":
          I++;
          break;
        case "II":
          II++;
          break;
        case "III":
          III++;
          break;
        case "IV":
          IV++;
          break;
        case "V":
          V++;
          break;
        case "VII":
          VII++;
          break;
        case "IX":
          IX++;
          break;
        default:
          break;
      }
    });

    return {
      status: "success",
      statusCode: 200,
      message: "Successfully get stats Golongan Pegawai",
      data: {
        labels: ["I", "II", "III", "IV", "V", "VII", "IX"],
        data: [I, II, III, IV, V, VII, IX],
      },
    };
  }

  static async getStatsPendidikan(): Promise<ResponsePayload> {
    const headerRegistered: string[] = ["pend_akhir"];
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
      pend_akhir: d[indexHeaders[0]],
    }));

    let s3 = 0;
    let s2 = 0;
    let s1 = 0;
    let d4 = 0;
    let sm = 0;
    let d3 = 0;
    let d1 = 0;
    let slta = 0;
    let sltp = 0;
    let sd = 0;

    dataPegawai.forEach((d) => {
      const penAkhir = d.pend_akhir.toUpperCase();
      switch (penAkhir) {
        case "S3":
          s3++;
          break;
        case "S2":
          s2++;
          break;
        case "S1":
          s1++;
          break;
        case "D4":
          d4++;
          break;
        case "SM":
          sm++;
          break;
        case "D3":
          d3++;
          break;
        case "D1":
          d1++;
          break;
        case "SLTA":
          slta++;
          break;
        case "SLTP":
          sltp++;
          break;
        case "SD":
          sd++;
          break;
        default:
          break;
      }
    });

    return {
      status: "success",
      statusCode: 200,
      message: "Successfully get stats Pendidikan Pegawai",
      data: {
        labels: [
          "S3",
          "S2",
          "S1",
          "D4",
          "SM",
          "D3",
          "D1",
          "SLTA",
          "SLTP",
          "SD",
        ],
        data: [s3, s2, s1, d4, sm, d3, d1, slta, sltp, sd],
      },
    };
  }

  static async getStatsAge(): Promise<ResponsePayload> {
    const headerRegistered: string[] = ["tgl_lahir"];
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
      tgl_lahir: d[indexHeaders[0]],
    }));

    let lowestThen25 = 0;
    let between25n30 = 0;
    let between31n35 = 0;
    let between36n40 = 0;
    let between41n45 = 0;
    let between46n50 = 0;
    let between51n55 = 0;
    let is56 = 0;
    let is57 = 0;
    let is58 = 0;
    let greatestThen58 = 0;

    dataPegawai.forEach((d) => {
      const tglLahirObj = SSF.parse_date_code(d.tgl_lahir) as {
        y: number;
        m: number;
        d: number;
        h: number;
        M: number;
        s: number;
      };

      const year = +tglLahirObj.y;
      const ageEmployee = getAgePegawai(year);

      if (ageEmployee < 25) {
        lowestThen25++;
      } else if (ageEmployee >= 25 && ageEmployee <= 30) {
        between25n30++;
      } else if (ageEmployee >= 31 && ageEmployee <= 35) {
        between31n35++;
      } else if (ageEmployee >= 36 && ageEmployee <= 40) {
        between36n40++;
      } else if (ageEmployee >= 41 && ageEmployee <= 45) {
        between41n45++;
      } else if (ageEmployee >= 46 && ageEmployee <= 50) {
        between46n50++;
      } else if (ageEmployee >= 51 && ageEmployee <= 55) {
        between51n55++;
      } else if (ageEmployee === 56) {
        is56++;
      } else if (ageEmployee === 57) {
        is57++;
      } else if (ageEmployee === 58) {
        is58++;
      } else {
        greatestThen58++;
      }
    });

    return {
      status: "success",
      statusCode: 200,
      message: "Successfully get stats Age Pegawai",
      data: {
        labels: [
          "<25",
          "25-30",
          "31-35",
          "36-40",
          "41-45",
          "46-50",
          "51-55",
          "56",
          "57",
          "58",
          ">58",
        ],
        data: [
          lowestThen25,
          between25n30,
          between31n35,
          between36n40,
          between41n45,
          between46n50,
          between51n55,
          is56,
          is57,
          is58,
          greatestThen58,
        ],
      },
    };
  }

  static async getStatsMap(): Promise<ResponsePayload> {
    const querySnapshot = await getDocs(collection(db, "excelMap"));
    const dataExcel: ExcelFile[] = [];
    querySnapshot.forEach((doc) => {
      dataExcel.push({
        id: doc.id,
        ...(doc.data() as Omit<ExcelFile, "id">),
      });
    });

    const response = await fetch(dataExcel[0].urlExcel);
    const arrayBuffer = await response.arrayBuffer();

    const workbook = read(arrayBuffer, { type: "array" });
    const workSheets = workbook.Sheets["JENJANG JABATAN"];

    const data: string[][] = utils.sheet_to_json(workSheets, {
      defval: "",
      blankrows: false,
      skipHidden: true,
      header: 1,
    });

    const dataDir = data.slice(3, 21);
    const result = transformFileMap(dataDir);

    let lakiLaki = 0;
    let perempuan = 0;

    result.forEach((r) => {
      lakiLaki += +r.lakiLaki;
      perempuan += +r.perempuan;
    });

    const dataMap = [
      {
        name: "PELABUHAN PERIKANAN SAMUDERA NIZAM ZACHMAN JAKARTA (PPS)",
        region: "Jakarta Utara, DKI Jakarta",
        lat: -6.09954,
        lng: 106.79976,
        employees: { male: 39, female: 12 },
      },
      {
        name: "PELABUHAN PERIKANAN SAMUDERA KENDARI (PPS)",
        region: "Kendari, Sulawesi Tenggara",
        lat: -3.98105,
        lng: 122.57,
        employees: { male: 54, female: 12 },
      },
      {
        name: "PELABUHAN PERIKANAN SAMUDERA CILACAP (PPS)",
        region: "Cilacap, Jawa Tengah",
        lat: -7.72705,
        lng: 109.02339,
        employees: { male: 42, female: 16 },
      },
      {
        name: "PELABUHAN PERIKANAN SAMUDERA BUNGUS (PPS)",
        region: "Padang, Sumatera Barat",
        lat: -1.02896446,
        lng: 100.39598453,
        employees: { male: 24, female: 12 },
      },
      {
        name: "PELABUHAN PERIKANAN SAMUDERA BELAWAN (PPS)",
        region: "Medan, Sumatera Utara",
        lat: 3.78436,
        lng: 98.71218,
        employees: { male: 31, female: 18 },
      },
      {
        name: "PELABUHAN PERIKANAN SAMUDERA BITUNG (PPS)",
        region: "Bitung, Sulawesi Utara",
        lat: 1.44576,
        lng: 125.20672,
        employees: { male: 20, female: 13 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA AMBON (PPN)",
        region: "Ambon, Maluku",
        lat: -3.67747,
        lng: 128.18898,
        employees: { male: 29, female: 10 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA PALABUHANRATU (PPN)",
        region: "Sukabumi, Jawa Barat",
        lat: -6.98993,
        lng: 106.54326,
        employees: { male: 40, female: 10 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA TERNATE (PPN)",
        region: "Ternate, Maluku Utara",
        lat: 0.76757,
        lng: 127.37694,
        employees: { male: 23, female: 9 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA PRIGI (PPN)",
        region: "Trenggalek, Jawa Timur",
        lat: -8.28895,
        lng: 111.73052,
        employees: { male: 34, female: 15 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA PEMANGKAT (PPN)",
        region: "Sambas, Kalimantan Barat",
        lat: 1.19743,
        lng: 108.99157,
        employees: { male: 22, female: 8 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA SIBOLGA (PPN)",
        region: "Sibolga, Sumatera Utara",
        lat: 1.72006,
        lng: 98.79674,
        employees: { male: 26, female: 15 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA TUAL (PPN)",
        region: "Tual, Maluku",
        lat: -5.61639,
        lng: 132.74097,
        employees: { male: 26, female: 5 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA KEJAWANAN (PPN)",
        region: "Cirebon, Jawa Barat",
        lat: -6.73414,
        lng: 108.5814,
        employees: { male: 38, female: 10 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA PEKALONGAN (PPN)",
        region: "Pekalongan, Jawa Tengah",
        lat: -6.85911,
        lng: 109.69259,
        employees: { male: 45, female: 10 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA BRONDONG (PPN)",
        region: "Lamongan, Jawa Timur",
        lat: -6.86828,
        lng: 112.28952,
        employees: { male: 36, female: 15 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA TANJUNG PANDAN (PPN)",
        region: "Belitung, Bangka Belitung",
        lat: -2.74386,
        lng: 107.63306,
        employees: { male: 24, female: 6 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA SUNGAILIAT (PPN)",
        region: "Bangka, Bangka Belitung",
        lat: -1.86403,
        lng: 106.12794,
        employees: { male: 16, female: 9 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA PENGAMBENGAN (PPN)",
        region: "Jembrana, Bali",
        lat: -8.3846,
        lng: 114.57509,
        employees: { male: 23, female: 15 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA KARANGANTU (PPN)",
        region: "Serang, Banten",
        lat: -6.03052,
        lng: 106.16397,
        employees: { male: 17, female: 8 },
      },
      {
        name: "PELABUHAN PERIKANAN NUSANTARA KWANDANG (PPN)",
        region: "Gorontalo Utara, Gorontalo",
        lat: 0.8535,
        lng: 122.89746,
        employees: { male: 19, female: 2 },
      },
      {
        name: "PELABUHAN PERIKANAN PANTAI TELUK BATANG (PPP)",
        region: "Kayong Utara, Kalimantan Barat",
        lat: 1.00738,
        lng: 109.76889,
        employees: { male: 12, female: 2 },
      },
      {
        name: "Kantor Pusat",
        lat: -6.178924,
        lng: 106.834413,
        region: "Gambir, Jakarta Pusat",
        employees: {
          male: lakiLaki,
          female: perempuan,
        },
      },
    ];

    return {
      status: "success",
      statusCode: 200,
      message: "Successfully get data map",
      data: dataMap,
    };
  }
}
