import { EmployeeAuth, ResponsePayload } from "@/types";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcrypt";
import { db } from "@/lib/firebase";
import ResponseError from "@/error/ResponseError";

export default class UserService {
  static async signup(data: EmployeeAuth): Promise<ResponsePayload> {
    const encryptPass = await bcrypt.hash(data.password, 10);
    await addDoc(collection(db, "employee"), {
      email: data.email,
      password: encryptPass,
    });

    return {
      status: "success",
      message: "Sucessfully signup",
      statusCode: 200,
    };
  }

  static async login(data: EmployeeAuth): Promise<ResponsePayload> {
    const q = query(
      collection(db, "employee"),
      where("email", "==", data.email)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new ResponseError(404, "Oops! Email is not registered!");
    }

    const [dataUser] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as EmployeeAuth),
    }));

    const isPasswordSame = await bcrypt.compare(
      data.password,
      dataUser.password
    );
    if (!isPasswordSame) {
      throw new ResponseError(401, "Password doesn't match!");
    }

    return {
      status: "success",
      statusCode: 200,
      message: "Sucessfully login!",
    };
  }
}
