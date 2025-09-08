import ResponseError from "@/error/ResponseError";
import { db } from "@/lib/firebase";
import { ExcelFile, ResponsePayload, UploadExcel } from "@/types";
import { getFullDate } from "@/utils/getFullDate";
import { headersRegistered } from "@/utils/headersRegistered";
import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
} from "firebase/firestore";
import { UTApi } from "uploadthing/server";
import { read, utils } from "xlsx";

export default class ExcelService {
  static async Update(data: UploadExcel): Promise<ResponsePayload> {
    await runTransaction(db, async (transaction) => {
      const q = query(collection(db, "excelFile"));
      const snapshot = await getDocs(q);

      snapshot.forEach(async (docSnap) => {
        transaction.delete(docSnap.ref);
      });

      transaction.set(doc(collection(db, "excelFile")), {
        urlExcel: data.urlExcel,
        key: data.key,
        updated: getFullDate(),
      });
    });

    return {
      status: "success",
      statusCode: 201,
      message: "Sucessfully update!",
    };
  }

  static async GetExcelData(q: string | null): Promise<ResponsePayload> {
    const querySnapshot = await getDocs(collection(db, q ?? "excelFile"));
    const data: ExcelFile[] = [];
    querySnapshot.forEach((document) => {
      data.push({
        id: document.id,
        ...(document.data() as Omit<ExcelFile, "id">),
      });
    });

    return {
      status: "success",
      statusCode: 201,
      message: "Sucessfully get data!",
      data,
    };
  }

  static async verifyHeaderExcel(
    urlExcel: string,
    key: string
  ): Promise<ResponsePayload> {
    const response = await fetch(urlExcel);
    const arrayBuffer = await response.arrayBuffer();

    const workbook = read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const workSheets = workbook.Sheets[sheetName];
    const data: string[][] = utils.sheet_to_json(workSheets, {
      header: 1,
      defval: "",
    });

    const headersExcel = data[0].map((h) => h.trim().toLowerCase());
    const isVerified = headersRegistered.every((reqHeader) =>
      headersExcel.includes(reqHeader.toLowerCase())
    );
    if (!isVerified) {
      const utapi = new UTApi();
      await utapi.deleteFiles(key);
      throw new ResponseError(402, "Please check your headers Excel properly!");
    }

    return {
      status: "success",
      message: "Headers verified!",
      statusCode: 201,
    };
  }

  static async updateMap(
    data: Omit<UploadExcel, "keyOld">
  ): Promise<ResponsePayload> {
    await runTransaction(db, async (transaction) => {
      const q = query(collection(db, "excelMap"));
      const snapshot = await getDocs(q);

      snapshot.forEach(async (doc) => {
        transaction.delete(doc.ref);
      });

      transaction.set(doc(collection(db, "excelMap")), {
        urlExcel: data.urlExcel,
        key: data.key,
        updated: getFullDate(),
      });
    });

    return {
      status: "success",
      message: "Successfully upadate!",
      statusCode: 201,
    };
  }
}
