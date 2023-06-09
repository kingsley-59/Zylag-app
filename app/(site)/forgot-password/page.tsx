'use client'
import GoogleIcon from "@/app/icons/GoogleIcon";
import SuccessIcon from "@/app/icons/SuccessIcon";
import Link from "next/link";
import { FormEvent, useState } from "react";


export default function page() {
    const [email, setEmail] = useState<string>('');
    const [successMsg, setSuccessMsg] = useState<string>('sdss');

    const handleSubmit = async function (e: FormEvent) {
        e.preventDefault();

        console.log(email);
        setSuccessMsg('A message');
    }

    return (
        <div className="w-full">
            {successMsg && (
                <div className="bg-success bg-opacity-70 w-full p-2 text-sm flex items-center justify-center gap-5 cursor-pointer" onClick={() => setSuccessMsg('')}>
                    <div className="flex items-center gap-3">
                        <SuccessIcon />
                        <span>A reset password link has been sent to your email. Follow the instructions in the email.</span>
                    </div>
                    <span className="text-xs">(tap to close)</span>
                </div>
            )}
            <div className="w-full h-full min-h-[100px] p-3 md:p-5 lg:p-10 bg-gradient-to-r from-red-100 ">

                <div className="lg:container w-full h-max mx-auto flex flex-col md:flex-row justify-center items-center gap-5 ">

                    <div className="basis-1/2 lg:max-w-[650px] p-5 lg:p-10 xl:p-20 flex flex-col gap-5 justify-start">
                        <span className="font-bold text-4xl lg:5xl xl:text-6xl text-red-600">Simplifying your shopping experience</span>
                        <p className="max-w-[450px]">Shopping Reimagined: Pioneering Effortless Convenience and Infinite Retail Possibilities</p>
                    </div>

                    <div className="p-3 md:p-5 lg:p-10 flex-grow">
                        <form onSubmit={handleSubmit} className="w-full max-w-[350px] mx-auto" >
                            <div className="my-3">
                                <div className="text-xl lg:text-2xl mb-3">Forgot Password</div>
                                <div className="text-sm">Enter your details below</div>
                            </div>
                            <input
                                type="text"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="block w-full px-0 py-2 mb-3 bg-transparent text-sm outline-none border-b-[1px] border-b-neutral-200 focus:border-b-neutral-300"
                                placeholder="Email or Phone Number"
                                required
                            />
                            <button type="submit" className="rounded-md w-full p-3 mt-3 mb-2 text-white text-sm bg-red-500">Forgot password</button>
                            <div className="my-3 text-center">
                                Already have an account? <Link href={'/login'} className="inline text-red-500 underline">Log in</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="relative w-full h-full min-h-[200px] hidden lg:block">
                    <div className="w-fit absolute -z-10 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                        <img src="/woman-shopping.png" width={'350px'} alt="woman shopping" />
                    </div>
                </div>
            </div>
        </div>
    )
}
