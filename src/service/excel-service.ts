import { db } from "@/lib/firebase";
import { ExcelFile, ResponsePayload, UploadExcel } from "@/types";
import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
} from "firebase/firestore";

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
      });
    });

    return {
      status: "success",
      statusCode: 201,
      message: "Sucessfully update!",
    };
  }

  static async GetExcelData(): Promise<ResponsePayload> {
    const querySnapshot = await getDocs(collection(db, "excelFile"));
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
}
