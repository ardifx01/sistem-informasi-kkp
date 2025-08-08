import { db } from "@/lib/firebase";
import { formSchema } from "@/models/employee";
import { addDoc, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import JWT from "@/lib/jwt";
import { EmployeeAuth } from "@/types";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookie = await cookies();
    const dataBody = await req.text();
    const data = JSON.parse(dataBody) as EmployeeAuth;
    formSchema.parse(data);
    const encryptPass = await bcrypt.hash(data.password, 10);
    await addDoc(collection(db, "employee"), {
      email: data.email,
      password: encryptPass,
    });

    const token = JWT.signIn({ email: data.email, password: data.password });
    cookie.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Successfully log in",
      token,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Validation error" },
        { status: 400 }
      );
    } else {
      console.error("Error during login:", error);
      return NextResponse.json({ message: "Internal server error" });
    }
  }
}
