import ResponseError from "@/error/ResponseError";
import JWT from "@/lib/jwt";
import { ResponsePayload } from "@/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies();
  try {
    const token = cookieStore.get("token");
    if (!token) {
      throw new ResponseError(403, "Unathorized login first!");
    }

    const dataToken = JWT.verify(token.value);
    if (!dataToken) {
      throw new ResponseError(403, "Forbidden! Unathorize, login first!");
    }

    const checkExp = JWT.checkExp(dataToken.exp!);
    if (!checkExp) {
      throw new ResponseError(403, "Your session has expired. Please login!");
    }

    return NextResponse.json<ResponsePayload>({
      status: "success",
      statusCode: 201,
      message: "User verified",
    });
  } catch (error) {
    cookieStore.delete("token");
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
        message: "An error ocured!",
      });
    }
  }
}
