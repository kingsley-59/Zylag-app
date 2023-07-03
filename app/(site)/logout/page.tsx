'use client';
import axios from "axios"
import { redirect } from "next/navigation";
import { useEffect } from "react";



export default function page() {
    redirect('/api/logout');
    // useEffect(() => {
    //     axios.get('/api/logout')
    // }, [])
    return (
        <div>knkvkndnkjdnk</div>
    )
}
