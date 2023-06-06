'use client';


export default function ProfileAvatar() {
    return (
        <div className="relative w-10 h-10 overflow-hidden bg-neutral-100 hover:bg-red-500 rounded-full dark:bg-gray-600">
            <svg className="absolute w-12 h-12 text-neutral-400 hover:text-white -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
            </svg>
        </div>
    )
}
