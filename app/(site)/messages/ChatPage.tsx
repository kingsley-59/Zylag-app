'use client';
import { useEffect, useState } from 'react';

type ChatMessage = {
    id: string;
    sender: string;
    message: string;
    timestamp: Date;
};

type ChatProps = {
    chatMessages: ChatMessage[];
};

const userId = 'A';
export default function ChatPage({ chatMessages }: ChatProps) {
    const [chatSections, setChatSections] = useState<Array<ChatMessage[]>>([]);

    useEffect(() => {
        // Group chat messages by date
        const sections: Array<ChatMessage[]> = [];
        let currentSection: ChatMessage[] = [];

        for (let i = 0; i < chatMessages.length; i++) {
            const message = chatMessages[i];
            const prevMessage = chatMessages[i - 1];

            if (!prevMessage || !isSameDate(prevMessage.timestamp, message.timestamp)) {
                if (currentSection.length > 0) {
                    sections.push(currentSection);
                }

                currentSection = [message];
            } else {
                currentSection.push(message);
            }
        }

        if (currentSection.length > 0) {
            sections.push(currentSection);
        }

        setChatSections(sections);
    }, [chatMessages]);

    const isSameDate = (date1: Date, date2: Date) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    return (
        <div className="w-full h-full">
            <div className="w-full h-full max-h-[700px] col-center ">
                <div className="w-full border-b start gap-3.5 px-4 py-3">
                    <img src="/images/profile-pic-1.png" alt="Jane Doe" />
                    <span className="text-[14px] font-semibold">Jane Doe</span>
                </div>
                <div className="w-full flex-grow p-4 overflow-auto scroll-smooth">
                    {chatSections.map((section, idx) => (
                        <div className="w-full col-center gap-3" key={idx}>
                            <div className='mx-auto rounded-lg px-2 py-1 bg-gray-100'>{section[0].timestamp.toDateString()}</div>
                            {section.map((message, idx) => (
                                <div key={idx} className={`w-full rounded-xl flex flex-col gap-2 ${message.sender == userId ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-xs p-3 rounded-2xl ${message.sender == userId ? ' rounded-br-none bg-orange-200' : ' rounded-bl-none bg-orange-950 text-white'}`}>
                                        {message.message}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className='text-gray-400 text-xs'>{message.timestamp.toLocaleTimeString()}</span>
                                        {(message.sender === userId) && <span className="p-1 center aspect-square rounded-full bg-orange-200">
                                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="fi:check">
                                                    <path id="Vector" d="M10 3L4.5 8.5L2 6" stroke="#1C1D22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </g>
                                            </svg>
                                        </span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="w-full px-4 py-2">
                    <div className="w-full border rounded center gap-2.5 p-2">
                        <div className="w-8 aspect-square rounded bg-orange-100 p-1 center">
                            <img src="/images/plus-icon.svg" alt="plus icon" />
                        </div>
                        <input type="text" className="border-0 outline-0 px-3 py-2 flex-grow rounded" placeholder="Your message" />
                        <button className="bg-orange-100 px-3 py-2 center gap-1 rounded">
                            Send <img src="/images/send-message-icon.svg" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
