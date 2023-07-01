// 'use client';
import ChatPage from "./ChatPage"

const mockChats = [
    { name: 'Jane Doe', profilePic: '/images/profile-pic-1.png', lastMsg: 'Hi, I want to make enquiries about your product', unread: 2, isOnline: true, time: '12:55 pm' },
    { name: 'Janet Adebayo', profilePic: '/images/profile-pic-2.png', lastMsg: 'Hi, I want to make enquiries about your product', unread: 1, isOnline: false, time: '12:55 pm' },
    { name: 'Kinle Doe', profilePic: '/images/profile-pic-3.png', lastMsg: 'Hi, I want to make enquiries about your product', unread: 0, isOnline: true, time: '12:55 pm' },
    { name: 'Jane Charles', profilePic: '/images/profile-pic-1.png', lastMsg: 'Hi, I want to make enquiries about your product', unread: 0, isOnline: false, time: '12:55 pm' },
    { name: 'Cynthia Klin', profilePic: '/images/profile-pic-2.png', lastMsg: 'Hi, I want to make enquiries about your product', unread: 1, isOnline: false, time: '12:55 pm' },
    { name: 'Jane Charles', profilePic: '/images/profile-pic-3.png', lastMsg: 'Hi, I want to make enquiries about your product', unread: 0, isOnline: false, time: '12:55 pm' },
    { name: 'Cynthia Klin', profilePic: '/images/profile-pic-2.png', lastMsg: 'Hi, I want to make enquiries about your product', unread: 1, isOnline: false, time: '12:55 pm' },
]

export default function page() {

    return (
        <section className="w-full p-5 md:p-10 lg:p-20 grid grid-cols-5 gap-4 bg-white">
            <div className="col-span-5 md:col-span-2 col-start gap-[15px] rounded-[12px] py-[22px] box-shadow" >
                <div className="w-full flex justify-between items-center px-2 text-base font-semibold">
                    <span>My Message</span>
                    <span>{5}</span>
                </div>
                <div className="w-full relative block px-2">
                    <div className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Search icon</span>
                    </div>
                    <input type="text" id="search-messages" className="block w-full p-2 pl-10 text-sm text-gray-900 outline-none border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                </div>
                <div className="w-full ">
                    {mockChats.map((chat, idx) => (
                        <div className="w-full start gap-[10px] px-3 py-2 border-b border-b-gray-300" key={idx}>
                            <div className="relative">
                                <div className="absolute w-[12px] aspect-square border-[2px] border-white rounded-full top-0 right-0" style={{ backgroundColor: chat.isOnline ? 'blue' : 'gray' }}></div>
                                <img src={chat.profilePic} alt={chat.name} />
                            </div>
                            <div className="flex-grow col-start">
                                <div className="w-full between">
                                    <div className="font-semibold">{chat.name}</div>
                                    {(chat.unread > 0) && <div className="center gap-[10px] text-xs">
                                        <span className="rounded-full p-1 bg-[#FEF5EA] w-[40px] center">New</span>
                                        <span className="rounded-full bg-[#FFCC91] w-[24px] aspect-square center">{chat.unread}</span>
                                    </div>}
                                </div>
                                <div className="w-full between gap-2.5">
                                    <div className="w-full flex-grow text-[14px] text-gray-400">{chat.lastMsg.slice(0, 40)}{chat.lastMsg.length > 30 && '...'}</div>
                                    <div className="text-[14px] text-gray-400 flex-shrink-0">{chat.time}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="hidden md:block md:col-span-3 rounded-[12px] py-[22px] box-shadow" >
                <ChatPage chatMessages={[
                    {id: '1', message: 'Hi, I want to make enquiries about your product', sender: 'B', timestamp: new Date()},
                    {id: '2', message: 'Hello, thankk you for reaching out', sender: 'A', timestamp: new Date()},
                    {id: '3', message: 'What do you need to know', sender: 'A', timestamp: new Date()},
                    {id: '4', message: 'I want to know if the price is negotiable', sender: 'B', timestamp: new Date()},
                    {id: '5', message: 'Yes, the price is negotiable', sender: 'A', timestamp: new Date()},
                    {id: '6', message: 'Ok. I also want to know about delivery fee.', sender: 'B', timestamp: new Date()},
                ]} />
            </div>
        </section>
    )
}
