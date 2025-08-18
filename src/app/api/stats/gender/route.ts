import ResponseError from "@/error/ResponseError";
import StatsService from "@/service/stats-service";
import { ResponsePayload } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest): Promise<NextResponse> {
  try {
    const response = await StatsService.getStatsGender()
    return NextResponse.json<ResponsePayload>(response)
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
