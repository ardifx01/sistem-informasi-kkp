import { db } from "@/lib/firebase";
import { ExcelFile } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import { createUploadthing, FileRouter } from "uploadthing/next";
import { UTApi } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  excelUploader: f({
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "2GB",
      maxFileCount: 1,
    },
    "application/vnd.ms-excel": {
      maxFileSize: "2GB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({}) => {
      const querySnapshot = await getDocs(collection(db, "excelFile"));

      const data: ExcelFile[] = [];
      querySnapshot.forEach((docSnap) => {
        data.push({
          id: docSnap.id,
          ...(docSnap.data() as Omit<ExcelFile, "id">),
        });
      });

      const utapi = new UTApi();
      const response = await utapi.deleteFiles(data[0].key);
      console.log(response.deletedCount);
      return {};
    })
    .onUploadError((input) => {
      console.log(input.error);
    })
    .onUploadComplete(async ({ file }) => {
      try {
        const url = file.ufsUrl;
        return { url };
      } catch (error) {
        console.log("error upload:", error);
        throw error;
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
