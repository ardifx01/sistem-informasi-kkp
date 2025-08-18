import { db } from "@/lib/firebase";
import { ExcelFile, ResponsePayload } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import { read, utils } from "xlsx";

export default class StatsService {
  static async getStatsStatus(): Promise<ResponsePayload> {
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
}
