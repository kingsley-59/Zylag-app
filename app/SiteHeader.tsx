'use client';
import Link from "next/link";
import HeartIcon from "./icons/HeartIcon";
import SearchBar from "./components/SearchBar";
import ProfileAvatar from "./components/ProfileAvatar";
import MobileNav from "./components/MobileNav";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import CartIcon from "./icons/CartIcon";



export default function SiteHeader() {
    const { isLoggedIn, token } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch()
    return (
        <>
            <div className='w-full max-w-screen-2xl mx-auto flex justify-between items-center gap-3 md:gap-10 lg:gap-20 xl:gap-40 mb-4 md:mb-0'>
                <div className="font-bold">
                    Zylag
                </div>
                <div className="hidden md:flex items-center gap-3 lg:gap-4">
                    <Link href={'/'}><span>Home</span></Link>
                    <Link href={'/contact'}><span>Contact</span></Link>
                    <Link href={'/about'}><span>About</span></Link>
                    <Link href={'/signup'}><span>Sign up</span></Link>
                </div>
                <div className='flex items-center gap-5'>
                    <div className='hidden md:block'><SearchBar /></div>
                    <div className='relative'>
                        <HeartIcon />
                    </div>
                    <div className='relative'>
                        <CartIcon />
                    </div>
                    {(isLoggedIn && token) ? <ProfileAvatar />: <Link href={'/login'} ><button className="px-4 py-3 bg-red-700 text-white rounded">Login</button></Link>}
                    <div className='md:hidden'><MobileNav /></div>
                </div>
            </div>
            <div className='block md:hidden'><SearchBar /></div>
        </>
    )
}
