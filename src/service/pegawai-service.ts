import { db } from "@/lib/firebase";
import { ExcelFile, ResponsePayload } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import { read, utils } from "xlsx";

export default class PegawaiService {
  static async getAllPegawai(): Promise<ResponsePayload> {
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

    const dataPegawai = data
      .map((d, i) => {
        if (i !== 0) {
          return {
            [headerRegistered[0]]: d[indexHeaders[0]],
            [headerRegistered[1]]: d[indexHeaders[1]],
            [headerRegistered[2]]: d[indexHeaders[2]],
            [headerRegistered[3]]: d[indexHeaders[3]],
            [headerRegistered[4]]: d[indexHeaders[4]],
          };
        }
      })
      .filter(Boolean);

    return {
      status: "success",
      statusCode: 201,
      message: "Successfully get data!",
      data: dataPegawai,
    };
  }
}
