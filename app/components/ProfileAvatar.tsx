'use client';

import { useState } from "react";
import BagIcon from "../icons/BagIcon";
import CancelIcon from "../icons/SettingsIcon";
import LogoutIcon from "../icons/LogoutIcon";
import StarIcon from "../icons/StarIcon";
import AccountIcon from "../icons/AccountIcon";
import Link from "next/link";
import { redirect } from "next/navigation";


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
            href: '/api/logout'
        },
    ]

    return (
        <div className="relative ">
            <div onClick={() => setShow(prev => !prev)} className="center w-8 h-8 overflow-hidden  hover:bg-neutral-100 rounded-full cursor-pointer">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="user">
                        <path id="Vector" d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path id="Vector_2" d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                </svg>
            </div>

            <div className="absolute top-full right-0 p-3 z-40" style={{ display: show ? 'block' : 'none' }}>
                <div className="w-full bg-purple-800 bg-opacity-30 backdrop-blur-[75px] col-start text-white whitespace-nowrap font-light rounded-lg py-3 px-2">
                    {menu.map((item, idx) => (
                        <Link key={idx} href={item.href} onClick={() => setShow(prev => !prev)} className="block w-full hover:backdrop-blur-3xl rounded-md">
                            <span className='w-full cursor-pointer px-4 py-2 start gap-3' >
                                <span className="basis-1/4 stroke-white">{item.icon}</span>
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
