import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"
export const config = {
	matcher: ["/dashboard/:path*", "/profile/:path*"],
}

export async function middleware(request: NextRequest) {
	const session = await auth();
	if (!session) {
		return NextResponse.redirect(new URL("/signin", request.url))
	}
}
