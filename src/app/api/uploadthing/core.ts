import { createUploadthing, FileRouter } from "uploadthing/next";

const f = createUploadthing();

async function auth() {
  return {
    id: 1,
    username: "Ariel",
  };
}

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
      const user = await auth();
      console.log("ok middleware");
      return { id: user.id };
    })
    .onUploadError((input) => {
      console.log(input.error);
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        const url = file.ufsUrl;
        console.log("ok upload complet");
        return { id: metadata.id, url };
      } catch (error) {
        console.log("error upload:", error);
        throw error;
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
