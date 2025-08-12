export interface KaryawanData {
  npm: string;
  nama: string;
  kelas: string;
}

export interface EmployeeAuth {
  email: string;
  password: string;
}

export interface ResponsePayload<T = unknown> {
  status: "success" | "failed";
  statusCode: number;
  message: string;
  data?: T;
}

export interface UploadExcel {
  urlExcel: string;
  key: string;
  keyOld: string;
}

export interface ExcelFile {
  id: string;
  key: string;
  urlExcel: string;
}
