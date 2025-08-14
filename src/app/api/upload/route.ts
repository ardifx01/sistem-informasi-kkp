import ResponseError from "@/error/ResponseError";
import ExcelService from "@/service/excel-service";
import { ResponsePayload, UploadExcel } from "@/types";
import ExcelValidation from "@/validation/excel-validation";
import { Validation } from "@/validation/Validation";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const dataBody = await req.text();
    const data = JSON.parse(dataBody) as UploadExcel;

    Validation.validate(ExcelValidation.UPDATE, data);

    const response = await ExcelService.Update(data);

    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    if (error instanceof ResponseError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        statusCode: error.status,
        message: error.message,
      });
    } else if (error instanceof ZodError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        statusCode: 401,
        message: "Please fill data properly",
      });
    } else {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        statusCode: 500,
        message: "An error ocured!",
      });
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest): Promise<NextResponse> {
  try {
    const response = await ExcelService.GetExcelData();

    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error while get excel file:", error);
    return NextResponse.json<ResponsePayload>({
      status: "failed",
      statusCode: 500,
      message: "Internal server Error!",
    });
  }
}
