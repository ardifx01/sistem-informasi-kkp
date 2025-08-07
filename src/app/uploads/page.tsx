"use client";
import TableKaryawan from "@/components/TableKaryawan";
import { useUploadThing } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import * as XLSX from "xlsx";

export default function UploadsPage() {
  const [urlExcel, setUrlExcel] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dataExcel, setDataExcel] = useState([]);
  const { startUpload, isUploading } = useUploadThing("excelUploader", {
    onClientUploadComplete: ([data]) => {
      setUrlExcel(data.ufsUrl);
    },
    onUploadProgress: (p) => {
      setUploadProgress(p);
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

  console.log(urlExcel);

  const onDropAccepted = async (files: File[]) => {
    try {
      startUpload(files);
    } catch (error) {
      console.log("Error cuy:");
      console.log(error);
    }
  };

  const onDropRejected = (files: FileRejection[]) => {
    console.log("file gagal");
  };

  return (
    <div className="min-w-full flex justify-center items-center flex-col px-2 my-2">
      <TableKaryawan />
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
            className="bg-gray-200 py-2 rounded-sm w-full flex-1 flex flex-col items-center justify-center"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <span>Cihuy</span>
          </div>
        )}
      </Dropzone>
    </div>
  );
}
