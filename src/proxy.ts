
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Allow only authenticated users
  if (!session?.user) {
    return NextResponse.redirect(
      new URL("/sign-in", request.url)
    );
  }

  // Allow authenticated users to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};
