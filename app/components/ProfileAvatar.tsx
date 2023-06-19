'use client';

import { useState } from "react";
import BagIcon from "../icons/BagIcon";
import CancelIcon from "../icons/SettingsIcon";
import LogoutIcon from "../icons/LogoutIcon";
import StarIcon from "../icons/StarIcon";
import AccountIcon from "../icons/AccountIcon";
import Link from "next/link";


export default function ProfileAvatar() {
    const [show, setShow] = useState(false);

    const menu = [
        {
            name: 'My Account',
            icon: <AccountIcon />,
            href: '/account/settings'
        },
        {
            name: 'My Ads',
            icon: <BagIcon />,
            href: '/account/adverts'
        },
        {
            name: 'Settings',
            icon: <CancelIcon />,
            href: '/'
        },
        {
            name: 'Reviews',
            icon: <StarIcon />,
            href: '/account/feedback'
        },
        {
            name: 'Logout',
            icon: <LogoutIcon />,
            href: '/'
        },
    ]

    return (
        <div className="relative ">
            <div onClick={() => setShow(prev => !prev)} className="center w-10 h-10 overflow-hidden bg-neutral-100 hover:border-slate-500 rounded-full dark:bg-gray-600 cursor-pointer">
                <svg className="w-12 h-12 text-neutral-400 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                </svg>
            </div>

            <div className="absolute top-full right-0 p-3 z-40" style={{ display: show ? 'block' : 'none' }}>
                <div className="w-full bg-purple-800 bg-opacity-30 backdrop-blur-[75px] col-start text-white whitespace-nowrap font-light rounded-lg py-3 px-2">
                    {menu.map((item, idx) => (
                        <Link href={item.href} onClick={() => setShow(prev => !prev)} className="block w-full hover:backdrop-blur-3xl rounded-md">
                            <span className='w-full cursor-pointer px-4 py-2 start gap-3'>
                                <span className="basis-1/4">{item.icon}</span>
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
