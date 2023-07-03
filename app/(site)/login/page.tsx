'use client'
import { axiosInstance } from "@/app/config";
import { setErrorMsg, setSuccessMsg } from "@/app/redux/features/alertSlice";
import { setAuthState } from "@/app/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from "react";


export const metadata: Metadata = {
    title: 'Login | Zylag Ecomm.'
}


export default function page() {
    const searchParams = useSearchParams()
    const router = useRouter()
    // const { token } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async function (e: FormEvent) {
        e.preventDefault();
        setLoading(true)

        try {
            const { data, status } = await axiosInstance.post('/auth/login', { email, password });
            if (status >= 400) return dispatch(setErrorMsg(data?.error));

            const { _id, email: userEmail, emailIsVerified, fullname, role, token} = data.data;
            dispatch(setSuccessMsg(data?.message));
            setEmail(''); setPassword('');
            dispatch(setAuthState({_id, email: userEmail, emailIsVerified, fullname, isLoggedIn: true, role, token}));

            setTimeout(() => {
                let referrer = searchParams.get('ref')
                if (referrer) {
                    router.push(referrer);
                } else {
                    router.push('/account/settings')
                }
            }, 3000);
        } catch (error: any) {
            dispatch(setErrorMsg("Something went wrong"));
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            axiosInstance.get('/auth/verify-email', { params: { token } })
                .then(({ data, status }) => {
                    if (status === 200) dispatch(setSuccessMsg(data.message));
                    else dispatch(setErrorMsg(data?.error));
                })
                .catch(error => {
                    console.log(error);
                    dispatch(setErrorMsg("Something went wrong."));
                })
        }
    }, [])

    return (
        <div className="w-full h-full min-h-[100px] p-3 md:p-5 lg:p-10 bg-gradient-to-r from-red-100 ">
            <div className="lg:container w-full h-max mx-auto flex flex-col md:flex-row justify-center items-center gap-5 ">

                <div className="basis-1/2 lg:max-w-[650px] p-5 lg:p-10 xl:p-20 flex flex-col gap-5 justify-start">
                    <span className="font-bold text-4xl lg:5xl xl:text-6xl text-red-600">Simplifying your shopping experience</span>
                    <p className="max-w-[450px]">Shopping Reimagined: Pioneering Effortless Convenience and Infinite Retail Possibilities</p>
                </div>

                <div className="p-3 md:p-5 lg:p-10 flex-grow">
                    <form onSubmit={handleSubmit} className="w-full max-w-[350px] mx-auto" >
                        <div className="my-3">
                            <div className="text-xl lg:text-2xl mb-3">Log in to Zylag</div>
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
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="block w-full px-0 py-2 mb-3 bg-transparent text-sm outline-none border-b-[1px] border-b-neutral-200 focus:border-b-neutral-300"
                            placeholder="Password"
                            required
                        />
                        <div className="flex items-center justify-between gap-4">
                            <button type="submit" className="rounded-md w-fit py-3 px-5 mt-3 text-white text-sm bg-red-600 disabled:bg-red-400" disabled={loading}>Login</button>
                            <Link href={'/forgot-password'}>
                                <span className="w-full p-3 text-red-600 text-sm">Forgot Password?</span>
                            </Link>
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
    )
}
