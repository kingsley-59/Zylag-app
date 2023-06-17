'use client';
import SuccessIcon from "@/app/icons/SuccessIcon";
import { FastAverageColor } from "fast-average-color";
import { useCallback, useEffect, useRef, useState } from "react";


type Feedback = {
    [key: string]: any;
};
type TFeedback = Feedback[];


function AdvertCard({ ad }: { ad: Feedback }) {
    const [bgColor, setBgColor] = useState('#f5f5f5');
    const [isDark, setIsDark] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    const getColorFromImage = useCallback(async function (imageRef: HTMLImageElement | null, defaultColor = "#fff") {
        const fac = new FastAverageColor();
        try {
            const color = await fac.getColorAsync(imageRef);
            setBgColor(color.hex)
            setIsDark(color.isDark);
        } catch (error) {
            console.log('fac Error: ', error);
            return { color: defaultColor, isDark: false };
        }
    }, [])

    useEffect(() => {
        getColorFromImage(imgRef.current);
    }, [])

    return (
        <div className="w-full rounded-2xl grid grid-cols-1 md:grid-cols-4 my-5 md:my-10 border border-gray-200">
            <div className="p-4 center rounded-2xl md:rounded-e-none " style={{backgroundColor: bgColor, borderColor: bgColor}}>
                <img ref={imgRef} src={ad.image} alt={ad.title} />
            </div>
            <div className="md:col-span-3 flex flex-col justify-between gap-5 p-5">
                <div className="flex col-start gap-4">
                    <span className="font-bold text-base uppercase">{ad.title}</span>
                    <p className="text-gray-300 text-sm">{ad.description}</p>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div className="flex justify-start items-center gap-2">
                        <span><SuccessIcon /></span>
                        <span className="text-green-300">Active</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="px-4 py-2 rounded text-center text-red-700 border-[1px] border-red-700">Delete</button>
                        <button className="px-4 py-2 rounded text-center text-white bg-red-700 border-[1px] border-red-700">Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


const SampleAds = []


export default function page() {
    // States
    const [currentTab, setCurrentTab] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
    const [activeFeedback, setActiveFeedback] = useState<TFeedback>([]);
    const [inactiveFeedback, setInactiveFeedback] = useState<TFeedback>([]);

    useEffect(() => {
        
    }, [])

    return (
        <div className="w-full shadow rounded-xl">
            <div className="w-full rounded-t-xl px-3 py-4 between">
                <div className="font-bold">Feedback </div>
                <div className="flex items-center rounded bg-gray-50 text-gray-400 font-semibold border-[1px]">
                    <div onClick={() => setCurrentTab('ACTIVE')} className={("cursor-pointer border-b-[2px] text-center p-3 ") + ((currentTab === "ACTIVE") ? "text-red-700 border-b-red-700" : "")}>ACTIVE</div>
                    <hr className="border-r-[1px] h-12" />
                    <div onClick={() => setCurrentTab('INACTIVE')} className={("cursor-pointer border-b-[2px] text-center p-3 ") + ((currentTab === "INACTIVE") ? "text-red-700 border-b-red-700" : "")}>INACTIVE</div>
                </div>
            </div>
            <hr className="border-t border-dashed border-[#ececec]" />
            <div className="w-full p-5 lg:p-10">
                {(currentTab === 'ACTIVE' ? activeFeedback : inactiveFeedback).length === 0 ? (
                    <div className="w-full center">
                        <div className="col-center gap-5 mx-auto">
                            <img src="/empty.png" alt="no adverts" className="max-h-[300px]" />
                            <p className="text-gray-300 text-center mx-auto">There are currently no existing advertisements</p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full">
                        {(currentTab === 'ACTIVE' ? activeFeedback : inactiveFeedback).map((ad, idx) => (
                            <div className="w-full">
                                <AdvertCard key={idx} ad={ad} />
                                {activeFeedback.length !== (idx + 1) && <hr className="border-t border-dashed border-[#b4b4b4]" />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
