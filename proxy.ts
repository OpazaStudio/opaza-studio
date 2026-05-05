import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, type Lang } from "./app/lib/copy";

function pickLocale(req: NextRequest): Lang {
  const header = req.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((p) => p.trim().split(";")[0].toLowerCase())
    .find((tag) => LOCALES.some((l) => tag.startsWith(l)));
  if (preferred) {
    const match = LOCALES.find((l) => preferred.startsWith(l));
    if (match) return match;
  }
  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
