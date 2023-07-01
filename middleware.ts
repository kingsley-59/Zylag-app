import axios from 'axios'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { API_URL } from './app/config'
import { cookies } from 'next/headers';

async function userIsLoggedIn(authToken: string) {
    const res = await fetch(`${API_URL}/user/me`, {
        headers: {
            Authorization: 'Bearer '+ authToken,
            'Content-Type': 'application/json'
        }
    })

    if (res.status === 200) return true;
    else return false;
}


export async function middleware(request: NextRequest) {
    const cookieStore = request.cookies;
    const authToken = cookieStore.get('auth-token')?.value;
    const isAuthenticated = await userIsLoggedIn(authToken as string)
    
    if (isAuthenticated) {
        return NextResponse.next();
    } else {
        let redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('ref', request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }
}


export const config = {
    matcher: ['/account/:path*', '/post-ad']
}