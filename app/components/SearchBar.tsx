'use client'


export default function SearchBar() {
    const handleSearchClick = function () {

    }

    return (
        <>
            <div className="relative block">
                <input type="text" id="search-navbar" className="block w-full p-2 pr-10 text-xs text-black text-opacity-50 outline-none rounded-lg bg-[#F5F5F5] focus:ring-blue-500 focus:border-blue-500 " placeholder="What are you lookig for?" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Component 2">
                            <path id="Vector" d="M20 20L16.2223 16.2156M18.3158 11.1579C18.3158 13.0563 17.5617 14.8769 16.2193 16.2193C14.8769 17.5617 13.0563 18.3158 11.1579 18.3158C9.2595 18.3158 7.43886 17.5617 6.0965 16.2193C4.75413 14.8769 4 13.0563 4 11.1579C4 9.2595 4.75413 7.43886 6.0965 6.0965C7.43886 4.75413 9.2595 4 11.1579 4C13.0563 4 14.8769 4.75413 16.2193 6.0965C17.5617 7.43886 18.3158 9.2595 18.3158 11.1579V11.1579Z" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                        </g>
                    </svg>
                    <span className="sr-only">Search icon</span>
                </div>
            </div>
            {/* <div className="block md:hidden" onClick={handleSearchClick}>
                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div> */}
        </>
    )
}
