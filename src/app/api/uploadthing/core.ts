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
    .middleware(async ({ files }) => {
      const utapi = new UTApi();
      const listFile = await utapi.listFiles();
      const fileShouldDelete = listFile.files.find(
        (f) => f.name.toLowerCase() === files[0].name.toLowerCase()
      );

      if (fileShouldDelete) {
        await utapi.deleteFiles(fileShouldDelete.key);
      }
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
