import Link from "next/link";


export default function NotFound() {
    return (
        <div className="w-full min-h-[500px] col-center relative p-5 lg:p-10 gap-10">
            <div className="col-center gap-10">
                <div className="text-5xl lg:text-7xl xl:text-8xl text-center">404 Not Found</div>
                <div className="text-center">Your visited page not found. Go back to the home page</div>
            </div>
            <Link href={'/'}>
                <button className='text-white px-5 py-3 bg-red-500 rounded cursor-pointer'>Back to home page</button>
            </Link>
            <div className="absolute right-0 -bottom-5">
                <img className="max-w-[700px]" src="/404-error.png" alt="404 error, page not found" />
            </div>
        </div>
    )
}