import { NextResponse, type NextRequest } from "next/server";

/**
 * パスから現在のロケールを判定し、`x-locale` ヘッダーに乗せる。
 * Root layout が headers() からこの値を読み、`<html lang>` に反映する。
 */
export function proxy(req: NextRequest) {
  const locale = req.nextUrl.pathname.startsWith("/en") ? "en" : "ja";

  // 後段（layout / page）のRSCレンダ時に読めるよう、リクエストヘッダーへ伝搬
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-locale", locale);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    // _next/static, _next/image, ファイル拡張子付きアセットは除外
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
