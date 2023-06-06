import { ReactNode } from "react";



export default function AccountsLayout({ children }: { children: ReactNode; }) {
    return (
        <section className="w-full p-5 col-center gap-5">
            <div className="w-full shadow-lg shadow-neutral-200 center p-4">My Accounts</div>
            <div className="w-full text-sm">
                <div className="w-full flex justify-start items-center gap-3">
                    <div className="underline underline-offset-[6px] text-center">General Settings</div>
                    <div className="underline underline-offset-[6px] text-center">My Advert</div>
                    <div className="underline underline-offset-[6px] text-center">Feedback</div>
                </div>
                <hr className="w-full border-b-neutral-300" />
            </div>
        </section>
    )
}