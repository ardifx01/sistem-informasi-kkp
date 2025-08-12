"use client";
import ResponseError from "@/error/ResponseError";
import {
  ExcelFile,
  ResponsePayload,
  UploadExcel as UploadExcelFile,
} from "@/types";
import { useUploadThing } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

interface UploadExcelProps {
  dataExcelUser: ExcelFile;
}

export default function UploadExcel(props: UploadExcelProps) {
  const { dataExcelUser } = props;
  const router = useRouter();
  const [urlExcel, setUrlExcel] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { startUpload, isUploading } = useUploadThing("excelUploader", {
    onClientUploadComplete: async ([data]) => {
      setUrlExcel(data.ufsUrl);

      const dataUser: UploadExcelFile = {
        key: data.key,
        urlExcel: data.ufsUrl,
        keyOld: dataExcelUser.key,
      };

      await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUser),
      });
      toast.success("Successfully upload file!");
    },
    onBeforeUploadBegin: async (files) => {
      setIsLoading(true);
      const response = await fetch("/api/auth/verify");
      const dataResponse = (await response.json()) as ResponsePayload;

      setIsLoading(false);
      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.statusCode, dataResponse.message);
      }

      return files;
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

  useEffect(() => {
    if (urlExcel) {
      const readExcel = async () => {
        try {
          const response = await fetch(urlExcel);
          const arrayBuffer = await response.arrayBuffer();

          const workbook = XLSX.read(arrayBuffer, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const workSheets = workbook.Sheets[sheetName];
          const jsonData: string[][] = XLSX.utils.sheet_to_json(workSheets, {
            header: 1,
            defval: "",
          });

          console.log(jsonData);
        } catch (error) {
          console.log("Gagal cuy error:", error);
        }
      };

      readExcel();
    }
  }, [urlExcel]);

  const onDropAccepted = async (files: File[]) => {
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
    <Dropzone
      onDropAccepted={onDropAccepted}
      onDropRejected={onDropRejected}
      accept={{
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
        "application/vnd.ms-excel": [".xls"],
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          data-tooltip-id="upload-tooltip"
          data-tooltip-content={"Upload"}
          className="bg-gray-800 px-2 py-1 cursor-pointer hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 text-whitex text-white rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-gray-300 text-sm"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isUploading || isLoading ? (
            <div className="animate-spin">
              <i className="ri-reset-right-line"></i>
            </div>
          ) : (
            <i className="ri-file-upload-line"></i>
          )}
        </div>
      )}
    </Dropzone>
  );
}
