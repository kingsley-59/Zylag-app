import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const cookieStore = cookies();
    cookieStore.set('auth-token', '', {
        maxAge: 0, path: '/'
    })

    let redirectUrl = new URL('/login', request.url)
    return NextResponse.redirect(redirectUrl);
}