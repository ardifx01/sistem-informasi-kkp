import { cookies } from "next/headers";
import { MiddlewareConfig } from "next/server";

export async function middleware() {
  const cookiesStore = await cookies();

  const tokenCookie = cookiesStore.get("token");
  const token: string | null = tokenCookie ? tokenCookie.value : null;
  if (!token) {
    cookiesStore.delete("token");
    return;
  }
}

export const matcher: MiddlewareConfig = {
  matcher: ["/auth", "/:path"],
};
