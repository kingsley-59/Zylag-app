import path from "path";
import { promises as fs } from 'fs'
import { NextResponse } from "next/server";


export async function GET() {
    const jsonDirectory = path.join(process.cwd(), 'public', 'data.json');
    const fileContent = await fs.readFile(jsonDirectory, { encoding: 'utf-8' })

    return NextResponse.json(JSON.parse(fileContent));
}