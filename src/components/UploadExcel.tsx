"use client";
import { useUploadThing } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

export default function UploadExcel() {
  const [urlExcel, setUrlExcel] = useState<string>("");
  const [dataExcel, setDataExcel] = useState([]);
  const { startUpload, isUploading } = useUploadThing("excelUploader", {
    onClientUploadComplete: ([data]) => {
      setUrlExcel(data.ufsUrl);
      toast.success("Successfully upload file!");
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
          const jsonData: any[][] = XLSX.utils.sheet_to_json(workSheets, {
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
    startUpload(files);
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
          {isUploading ? (
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
