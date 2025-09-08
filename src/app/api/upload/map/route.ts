import ResponseError from "@/error/ResponseError";
import ExcelService from "@/service/excel-service";
import { ResponsePayload, UploadExcel } from "@/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const dataBody = await req.text();
    const data = JSON.parse(dataBody) as Omit<UploadExcel, "keyOld">;
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token");
    if (!token) {
      throw new ResponseError(403, "Forbidden! Login first!");
    }

    const response = await ExcelService.updateMap(data);

    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    if (error instanceof ResponseError) {
      return NextResponse.json<ResponsePayload>({
        message: error.message,
        status: "failed",
        statusCode: error.status,
      });
    }

    return NextResponse.json<ResponsePayload>({
      message: "An error occured",
      status: "failed",
      statusCode: 500,
    });
  }
}
