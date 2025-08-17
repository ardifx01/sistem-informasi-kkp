"use client";
import ResponseError from "@/error/ResponseError";
import {
  ExcelFile,
  ResponsePayload,
  UploadExcel as UploadExcelFile,
} from "@/types";
import { useUploadThing } from "@/utils/uploadthing";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";

interface UploadExcelProps {
  dataExcelUser: ExcelFile;
}

export default function UploadExcel(props: UploadExcelProps) {
  const { dataExcelUser } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { startUpload, isUploading } = useUploadThing("excelUploader", {
    onClientUploadComplete: async ([data]) => {
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
    const response = await fetch("/api/auth/verify");
    const dataResponse = (await response.json()) as ResponsePayload;
    setIsLoading(false);
    if (dataResponse.status === "failed") {
      toast.error(dataResponse.message);
      router.push("/auth/login");
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
          className={clsx(
            "flex items-center justify-center px-2 py-1 cursor-pointer text-sm rounded-lg font-semibold transform transition-all duration-300",
            isLoading || isUploading
              ? "bg-gray-600 text-gray-200 cursor-not-allowed shadow-md"
              : "bg-gray-800 text-white hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 border-2 hover:scale-105 shadow-lg hover:shadow-xl border-transparent hover:border-gray-300"
          )}
          {...getRootProps()}
        >
          <input
            className={clsx(
              isLoading || isUploading ? "cursor-not-allowed" : "cursor-pointer"
            )}
            {...getInputProps()}
            disabled={isUploading || isLoading}
          />
          {isUploading || isLoading ? (
            <MoonLoader color="white" speedMultiplier={0.8} size={19} />
          ) : (
            <i className="ri-file-upload-line text-lg"></i>
          )}
        </div>
      )}
    </Dropzone>
  );
}
