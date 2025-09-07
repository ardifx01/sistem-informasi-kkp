"use client";
import ResponseError from "@/error/ResponseError";
import {
  ExcelFile,
  ResponsePayload,
  UploadExcel as UploadExcelFile,
} from "@/types";
import { headersRegistered } from "@/utils/headersRegistered";
import { useUploadThing } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileRejection } from "react-dropzone";
import toast from "react-hot-toast";
import { read, utils } from "xlsx";
import Uploader from "./Uploader";

interface UploadExcelProps {
  dataExcelUser: ExcelFile;
}

export default function UploadExcel(props: UploadExcelProps) {
  const { dataExcelUser } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataTooltip, setDataTooltip] = useState("Upload");

  const { startUpload, isUploading } = useUploadThing("excelUploader", {
    onClientUploadComplete: async ([data]) => {
      const dataUser: UploadExcelFile = {
        key: data.key,
        urlExcel: data.ufsUrl,
        keyOld: dataExcelUser.key,
      };

      setDataTooltip("Verifying");

      const response = await fetch(
        `/api/upload/verify?urlExcel=${dataUser.urlExcel}&key=${dataUser.key}`
      );
      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        setIsLoading(false);
        setDataTooltip("Upload");
        toast.error(dataResponse.message);
        return;
      }

      setDataTooltip("Uploading");

      await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUser),
      });
      setDataTooltip("Upload");
      setIsLoading(false);
      toast.success("Successfully upload file!");
    },
    onUploadError: (e) => {
      if (typeof e === "string") {
        toast.error(e);
      } else if (e instanceof Error) {
        toast.error(e.message);
      } else if (e instanceof ResponseError) {
        router.push("/auth/login");
        toast.error(e.message);
      } else {
        toast.error("An error occured!");
      }
    },
  });

  const onDropAccepted = async (files: File[]) => {
    setIsLoading(true);
    setDataTooltip("Uploading");
    const response = await fetch("/api/auth/verify");
    const dataResponse = (await response.json()) as ResponsePayload;
    if (dataResponse.status === "failed") {
      setIsLoading(false);
      toast.error(dataResponse.message);
      router.push("/auth/login");
      return;
    }

    setDataTooltip("Verifying");
    const [file] = files;
    if (!file.name.toLowerCase().includes("data pegawai")) {
      toast.error("File name must be Data Pegawai");
      setDataTooltip("Upload");
      setIsLoading(false);
      return;
    }
    const arrayBuffer = await file.arrayBuffer();
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
      setDataTooltip("Upload");
      setIsLoading(false);
      toast.error("Please check your headers Excel properly!");
      return;
    }

    await startUpload(files);
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
      onDropAccepted={onDropAccepted}
      onDropRejected={onDropRejected}
      dataTooltip={dataTooltip}
      isLoading={isLoading}
      isUploading={isUploading}
      tooltipId="upload-tooltip"
    />
  );
}
