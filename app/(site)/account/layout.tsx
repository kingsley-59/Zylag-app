'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";



export default function AccountsLayout({ children }: { children: ReactNode; }) {
    const pathname = usePathname();

    const tabs = [
        { name: "General Settings", path: "/account/settings", },
        { name: "My Advert", path: "/account/adverts", },
        { name: "Feedback", path: "/account/feedback", },
    ]

    return (
        <section className="w-full p-5 md:p-10 lg:p-12 col-start gap-5 md:gap-10 bg-white">
            <div className="w-full shadow shadow-neutral-200 center p-4">My Accounts</div>
            <div className="w-full text-sm">
                <div className="w-full lg:w-1/2 flex justify-start lg:justify-stretch items-center gap-3">
                    {tabs.map((el, idx) => (
                        pathname === el.path
                            ? <div className={'flex-grow cursor-pointer text-center px-2 pb-3 font-medium border-b-[2px] border-b-red-700 text-red-700'} key={idx}>{el.name}</div>
                            : <div className={'flex-grow cursor-pointer text-center px-2 pb-3 font-medium '} key={idx}><Link href={el.path}>{el.name}</Link></div>
                    ))}
                </div>
                <hr className="w-full border-b-neutral-300" />
            </div>
            <div className="w-full">
                {children}
            </div>
        </section>
    )
}