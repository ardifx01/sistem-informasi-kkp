import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(_req: NextRequest) {
  try {
    const cookie = await cookies();
    cookie.delete("token");
    return NextResponse.json({
      status: "success",
      statusCode: 201,
      message: "Successfully log out",
    });
  } catch (error) {
    console.log("Error during logout:", error);
    return NextResponse.json({
      status: "failed",
      message: "Internal server error!",
    });
  }
}
