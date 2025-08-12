import { UploadExcel } from "@/types";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const dataBody = await req.text();
    const data = JSON.parse(dataBody) as UploadExcel;
    const url = data.urlExcel;
    console.log(url);
  } catch (error) {
    console.log(error);
  }
}
