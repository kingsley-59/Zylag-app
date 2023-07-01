'use client'
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";


export default function page() {
    const { push } = useRouter();
    
    useEffect(() => push('/account/settings'), [])
    return (
        <></>
    )
}
