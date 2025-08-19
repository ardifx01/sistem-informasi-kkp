import ResponseError from "@/error/ResponseError";
import PegawaiService from "@/service/pegawai-service";
import { ResponsePayload } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const query = req.nextUrl.searchParams;
    const nip = query.get("nip");

    if (!nip) throw new ResponseError(402, "Oops Nip is required");
    console.log("Mencari detail pegawai....");
    const response = await PegawaiService.getDetailPegawai(nip);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    if (error instanceof ResponseError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        statusCode: error.status,
        message: error.message,
      });
    } else {
      console.log(error);
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        statusCode: 500,
        message: "An error occured",
      });
    }
  }
}
