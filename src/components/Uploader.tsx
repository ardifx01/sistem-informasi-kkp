import clsx from "clsx";
import Dropzone, { DropzoneProps } from "react-dropzone";
import { MoonLoader } from "react-spinners";

interface UploaderProps extends DropzoneProps {
  tooltipId: string;
  dataTooltip: string;
  isLoading: boolean;
  isUploading: boolean;
}
export default function Uploader(props: UploaderProps) {
  const {
    onDropAccepted,
    onDropRejected,
    dataTooltip,
    isLoading,
    isUploading,
  } = props;
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
          data-tooltip-content={dataTooltip}
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
