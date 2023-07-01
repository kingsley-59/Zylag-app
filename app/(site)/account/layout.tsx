import { ReactNode } from "react";
import LayoutTabs from "./LayoutTabs";



export default function AccountsLayout({ children }: { children: ReactNode; }) {

    return (
        <section className="w-full p-5 md:p-10 lg:p-12 col-start gap-5 md:gap-10 bg-white">
            <div className="w-full shadow shadow-neutral-200 center p-4">My Accounts</div>
            <div className="w-full text-sm">
                <LayoutTabs />
                <hr className="w-full border-b-neutral-300" />
            </div>
            <div className="w-full">
                {children}
            </div>
        </section>
    )
}