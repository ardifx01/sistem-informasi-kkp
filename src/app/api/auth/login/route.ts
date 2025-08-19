import { formSchema } from "@/models/employee";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { EmployeeAuth } from "@/types";
import UserService from "@/service/user-service";
import ResponseError from "@/error/ResponseError";
import { cookies } from "next/headers";
import JWT from "@/lib/jwt";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  try {
    const isToken = cookieStore.get("token");
    if (isToken) throw new ResponseError(401, "You have been login");
    const dataBody = await req.text();
    const data = JSON.parse(dataBody) as EmployeeAuth;
    formSchema.parse(data);

    // const response = await UserService.signup(data);
    const response = await UserService.login(data);

    const cookie = await cookies();
    const token = JWT.signIn({ email: data.email, password: data.password });
    cookie.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        status: "failed",
        statusCode: 402,
        message: "Please fill email and password properly!",
      });
    } else if (error instanceof ResponseError) {
      return NextResponse.json({
        status: "failed",
        message: error.message,
        statusCode: error.status,
      });
    } else {
      console.error("Error during login:", error);
      return NextResponse.json({ message: "Internal server error" });
    }
  }
}
