export interface KaryawanData {
  nama: string;
  nip: string;
  agama: string;
  nama_jab: string;
  jenis_kel: string;
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

export interface PersonalInfo {
  label: string;
  value: string;
  hasIcon?: boolean;
}

export interface ContactInfo {
  type: string;
  value: string;
  iconType: "map" | "phone" | "building";
}
