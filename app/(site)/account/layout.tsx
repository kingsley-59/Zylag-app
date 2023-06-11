'use client'
import { ReactNode, useState } from "react";



export default function AccountsLayout({ children }: { children: ReactNode; }) {
    const [activeTab, setActiveTab] = useState(1);

    const tabs = [
        { name: "General Settings", isActive: true },
        { name: "My Advert", isActive: false },
        { name: "Feedback", isActive: false },
    ]

    return (
        <section className="w-full p-5 md:p-10 lg:p-12 col-start gap-5 md:gap-10">
            <div className="w-full shadow shadow-neutral-200 center p-4">My Accounts</div>
            <div className="w-full text-sm">
                <div className="w-full lg:w-1/2 flex justify-start lg:justify-around items-center gap-3">
                    {tabs.map((el, idx) => (
                        activeTab === idx
                            ? <div className={'cursor-pointer text-center pb-3 font-medium underline underline-offset-[17px] decoration-2 text-red-500'} key={idx}>{el.name}</div>
                            : <div className={'cursor-pointer text-center pb-3 font-medium '} key={idx} onClick={() => setActiveTab(idx)}>{el.name}</div>
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