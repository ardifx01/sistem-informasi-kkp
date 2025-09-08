"use client";
import Uploader from "@/components/Uploader";
import ResponseError from "@/error/ResponseError";
import { transformFileMap } from "@/helper/transformFileMap";
import { ResponsePayload, UploadExcel } from "@/types";
import { useUploadThing } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileRejection } from "react-dropzone";
import toast from "react-hot-toast";
import { read, utils } from "xlsx";

export default function UploadMap() {
  const [dataTooltip, setDataTooltip] = useState("Upload data Map");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { startUpload, isUploading } = useUploadThing("excelUploader", {
    onClientUploadComplete: async ([data]) => {
      const dataFileMap: Omit<UploadExcel, "keyOld"> = {
        key: data.key,
        urlExcel: data.ufsUrl,
      };
      setDataTooltip("Uploading...");
      setIsLoading(true);
      await fetch("/api/upload/map", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataFileMap),
      });

      setIsLoading(false);
      toast.success("Successfully upload file!");
    },
  });

  const onDropAccepted = async (files: File[]) => {
    setIsLoading(true);
    setDataTooltip("Verifying");
    try {
      const response = await fetch("/api/auth/verify");
      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        toast.error(dataResponse.message);
        router.push("/auth/login");
        return;
      }
      const [file] = files;
      if (!file.name.toLowerCase().includes("data map")) {
        throw new ResponseError(402, "File name must be Data Map");
      }

      const arrayBuffer = await file.arrayBuffer();
      const workbook = read(arrayBuffer, { type: "array" });
      const workSheets = workbook.Sheets["JENJANG JABATAN"];
      if (!workSheets) {
        throw new ResponseError(
          402,
          "Your sheet should be have JENJANG JABATAN"
        );
      }

      const data: string[][] = utils.sheet_to_json(workSheets, {
        defval: "",
        blankrows: false,
        skipHidden: true,
        header: 1,
      });

      const dataDir = data.slice(3, 21);
      if (dataDir.length === 0) {
        throw new ResponseError(
          409,
          "Oops! Please check your excel file properly!"
        );
      }
      const result = transformFileMap(dataDir);
      if (result.length === 0) {
        throw new ResponseError(
          409,
          "Oops! Please check your excel file properly!"
        );
      }

      setDataTooltip("Uploading...");

      await startUpload(files);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured! Please try again");
      }
    } finally {
      setIsLoading(false);
      setDataTooltip("Upload file map");
    }
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    if (file.errors.some((err) => err.code.includes("large"))) {
      toast.error("Please choose a file less then 2GB");
    } else if (file.errors.some((err) => err.code.includes("type"))) {
      toast.error("Please choose an excel file!");
    } else {
      toast.error("Oops! Something wrong, please try again later!");
    }
  };
  return (
    <Uploader
      onDropRejected={onDropRejected}
      onDropAccepted={onDropAccepted}
      tooltipId="upload-map"
      isLoading={isLoading}
      dataTooltip={dataTooltip}
      isUploading={isUploading}
    />
  );
}
