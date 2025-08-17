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
  value: string | number;
  hasIcon?: boolean;
}

export interface ContactInfo {
  type: string;
  value: string;
  iconType: "map" | "phone" | "building";
}

export interface PegawaiDetail {
  nama: string;
  nip: string;
  agama: string;
  nama_jab: string;
  jenis_kel: string;
  stat_kawin: string;
  gol_darah: string;
  pend_akhir: string;
  alamat: string;
  kota: string;
  kode_pos: number;
  propinsi: string;
  nama_unker: string;
  almt_email: string;
  negara2: string;
  no_hp_sms: string;
  no_npwp: string;
  tmp_lahir: string;
  nama_sek: string;
  prog_studi: string;
  unit_kerja: string;
  tgl_lahir: string;
}
