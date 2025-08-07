import { db } from "@/lib/firebase";
import { formSchema } from "@/models/employee";
import { addDoc, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const dataBody = await req.text();
    const data = JSON.parse(dataBody);
    formSchema.parse(data);
    const docRef = await addDoc(collection(db, "employee"), {
      email: data.email,
      password: data.password,
    });

    return NextResponse.json("id: " + docRef.id);
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
