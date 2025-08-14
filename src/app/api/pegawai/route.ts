import ResponseError from "@/error/ResponseError";
import PegawaiService from "@/service/pegawai-service";
import { ResponsePayload } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const query = req.nextUrl.searchParams;
    const response = await PegawaiService.getAllPegawai(query);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    if (error instanceof ResponseError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        statusCode: error.status,
        message: error.message,
      });
    } else {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        statusCode: 500,
        message: "An error occured!",
      });
    }
  }
}
