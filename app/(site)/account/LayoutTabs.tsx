'use client';
import { axiosInstance } from "@/app/config";
import { setErrorMsg } from "@/app/redux/features/alertSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";


export default function LayoutTabs() {
    const pathname = usePathname();
    const { token } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter()

    const tabs = [
        { name: "General Settings", path: "/account/settings", },
        { name: "My Advert", path: "/account/adverts", },
        { name: "Feedback", path: "/account/feedback", },
    ]

    useEffect(() => {
        axios.get('/api/auth')
            .then(({ data, status }) => {
                if (status >= 400) {
                    dispatch(setErrorMsg(data.message));
                    router.push('/login');
                }
            })
            .catch(error => {
                dispatch(setErrorMsg('Something went wrong. Please login'));
                router.push('/login');
            })
    }, [])

    return (
        <div className="w-full lg:w-1/2 flex justify-start lg:justify-stretch items-center gap-3">
            {tabs.map((el, idx) => (
                pathname === el.path
                    ? <div className={'flex-grow cursor-pointer text-center px-2 pb-3 font-medium border-b-[2px] border-b-red-700 text-red-700'} key={idx}>{el.name}</div>
                    : <div className={'flex-grow cursor-pointer text-center px-2 pb-3 font-medium '} key={idx}><Link href={el.path}>{el.name}</Link></div>
            ))}
        </div>
    )
}
