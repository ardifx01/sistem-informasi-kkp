import ResponseError from "@/error/ResponseError";
import StatsService from "@/service/stats-service";
import { ResponsePayload } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest): Promise<NextResponse> {
  try {
    const response = await StatsService.getStatsMap();
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
