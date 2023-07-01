import path from "path";
import { promises as fs } from 'fs'
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from 'next/headers';
import { API_URL } from "@/app/config";


export async function GET(request: NextRequest) {
    const cookieStore = cookies();

    try {
        const { data } = await axios.get(`${API_URL}/user/me`, {
            headers: { Authorization: 'Bearer ' + cookieStore.get('auth-token')?.value }
        })

        return NextResponse.json(data);
    } catch (error: any) {
        if (error.response.status == 401) {
            let redirectUrl = new URL('/login', request.url)
            redirectUrl.searchParams.set('referrer', request.nextUrl.pathname);
            return NextResponse.redirect(redirectUrl);
        }
        return NextResponse.json({ message: error?.message }, { status: 400 });
    }
}

export async function POST() {
    const cookieStore = cookies();

    try {
        const { data } = await axios.post(`${API_URL}/auth/login`, {
            email: 'divine10646@gmail.com',
            password: 'User123'
        })
        cookieStore.set('auth-token', data.data.token, { httpOnly: true });

        return NextResponse.json(data);
    } catch (error: any) {

        return NextResponse.json({ message: 'Something went wrong: ' + error?.message }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest) {
    const cookieStore = cookies();
    cookieStore.set('auth-token', '', {
        maxAge: 0, path: '/'
    })

    let redirectUrl = new URL('/login', request.url)
    return NextResponse.redirect(redirectUrl);
}