'use client'
import { axiosInstance } from "@/app/config";
import GoogleIcon from "@/app/icons/GoogleIcon";
import { setErrorMsg, setSuccessMsg } from "@/app/redux/features/alertSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import Link from "next/link";
import { FormEvent, useState } from "react";


export default function page() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch();

    const handleSubmit = async function (e: FormEvent) {
        e.preventDefault();
        setLoading(true)

        console.log(name, email, password);

        try {
            const { data, status } = await axiosInstance.post('/auth/register', {fullname: name, email, password});
            if (status >= 400) {
                dispatch(setErrorMsg(data?.error));
                return;
            }
            console.log(data);
            dispatch(setSuccessMsg(data?.message));
            setName('')
            setEmail('')
            setPassword('')
        } catch (error: any) {
            dispatch(setErrorMsg("Something went wrong"));
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full h-full min-h-[100px] p-3 md:p-5 lg:p-10 bg-gradient-to-r from-red-100 ">
            <div className="lg:container w-full h-max mx-auto flex flex-col md:flex-row justify-around items-center gap-5 ">

                <div className="basis-1/2 lg:max-w-[650px] p-5 lg:p-10 xl:p-20 flex flex-col gap-5 justify-start">
                    <span className="font-bold text-4xl lg:5xl xl:text-6xl text-red-600">Simplifying your shopping experience</span>
                    <p className="max-w-[450px]">Shopping Reimagined: Pioneering Effortless Convenience and Infinite Retail Possibilities</p>
                </div>

                <div className="p-3 md:p-5 lg:p-10 flex-grow">
                    <form onSubmit={handleSubmit} className="w-full max-w-[350px] mx-auto" >
                        <div className="my-3">
                            <div className="text-xl lg:text-2xl mb-3">Create an account</div>
                            <div className="text-sm">Enter your details below</div>
                        </div>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="block w-full px-0 py-2 mb-3 bg-transparent text-sm outline-none border-b-[1px] border-b-neutral-200 focus:border-b-neutral-300"
                            placeholder="Name"
                            required
                        />
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
                        <button type="submit" className="rounded-md w-full p-3 mt-3 text-white text-sm bg-red-600 disabled:bg-red-400" disabled={loading}>Create Account</button>
                        <button type="button" className="rounded-md w-full p-3 mt-3 text-sm bg-transparent border border-neutral-300 flex justify-center items-center gap-2">
                            <GoogleIcon />
                            Sign up with Google
                        </button>
                        <div className="my-3 text-center">
                            Already have an account? <Link href={'/login'} className="inline text-blue-500 underline">Log in</Link>
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
