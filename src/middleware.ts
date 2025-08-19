import { cookies } from "next/headers";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookiesStore = await cookies();
  const url = req.nextUrl.pathname;
  const tokenCookie = cookiesStore.get("token");
  const token: string | null = tokenCookie ? tokenCookie.value : null;

  const pegawaiMatch = url.match(/^\/pegawai\/([^\/]+)$/);
  if (pegawaiMatch && !token) {
    return NextResponse.redirect(new URL("/pegawai", req.url));
  }
  if (!token) {
    cookiesStore.delete("token"); 
    return;
  }

  if (url.includes("/auth/login") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const matcher: MiddlewareConfig = {
  matcher: ["/auth", "/:path", "/pegawai/:path"],
};
