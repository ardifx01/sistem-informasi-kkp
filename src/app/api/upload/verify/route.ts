import ResponseError from "@/error/ResponseError";
import ExcelService from "@/service/excel-service";
import { ResponsePayload } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const query = req.nextUrl.searchParams;
    const urlExcel = query.get("urlExcel");
    const key = query.get("key");
    if (!urlExcel) {
      throw new ResponseError(402, "Url Excel for verified is required!");
    }

    if (!key) {
      throw new ResponseError(402, "Key Excel for verified is required!");
    }

    const response = await ExcelService.verifyHeaderExcel(urlExcel, key);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    if (error instanceof ResponseError) {
      return NextResponse.json<ResponsePayload>({
        statusCode: error.status,
        status: "failed",
        message: error.message,
      });
    } else {
      console.log(error);
      return NextResponse.json<ResponsePayload>({
        statusCode: 500,
        status: "failed",
        message: "An error occured!",
      });
    }
  }
}
