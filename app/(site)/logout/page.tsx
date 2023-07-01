'use client';
import axios from "axios"
import { useEffect } from "react";



export default async function page() {
    useEffect(() => {
        axios.get('/api/logout')
    }, [])
    return (
        <div>knkvkndnkjdnk</div>
    )
}
