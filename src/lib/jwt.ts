import jwt from "jsonwebtoken";

interface Payload extends jwt.JwtPayload {
  email: string;
  password: string;
}

export default class JWT {
  static signIn(data: { email: string; password: string }) {
    return jwt.sign(data, process.env.PRIVATE_KEY!, {
      algorithm: "HS384",
      expiresIn: "1h",
    });
  }

  static verify(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.NEXT_PUBLIC_PRIVATE_KEY!
      ) as Payload;

      return decoded;
    } catch (err) {
      console.log("Failed verify token:", err);
      return null;
    }
  }

  static checkExp(exp: number) {
    const expiredDate = new Date(exp * 1000);
    const dateNow = new Date();

    return expiredDate > dateNow;
  }
}
