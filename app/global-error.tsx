'use client';

import Link from "next/link";
import { useEffect } from "react";


export default function Error({
    error, reset
}: {
    error: Error,
    reset: () => void;
}) {

    useEffect(() => {
        console.error('App Error', error);
    }, [])

    return (
        <div className="w-full col-center relative p-5 lg:p-10 gap-10">
            <div className="col-center gap-10">
                <div className="text-5xl lg:text-7xl xl:text-8xl">Oops, something went wrong!</div>
                <div>This is an application erroor</div>
            </div>
            <Link href={'/'}>
                <button className='text-white px-5 py-3 bg-red-500'>Back to home page</button>
            </Link>
            <div>Or</div>
            <button onClick={() => reset()} className='text-white px-5 py-3 bg-red-500 rounded'>Try again</button>
        </div>
    )
}