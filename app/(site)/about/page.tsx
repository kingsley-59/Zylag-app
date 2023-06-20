"use client";
import BagIcon from "@/app/icons/BagIcon"
import DollarCoin from "@/app/icons/DollarCoin"
import MoneyBag from "@/app/icons/MoneyBag"
import ShopIcon from "@/app/icons/ShopIcon"

import Slider, { Settings } from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TwitterIcon from "@/app/icons/TwitterIcon";
import InstagramIcon from "@/app/icons/InstagramIcon";
import LinkedinIcon from "@/app/icons/LinkedinIcon";
import { useEffect, useState } from "react";


export function BreadCrumb({ paths }: { paths: string[] }) {
    return (
        <div className="w-full start gap-3 px-5 md:px-10 lg:px-20 py-5">
            {paths.map((path, idx) => (
                <>
                    <span className={`${((idx + 1) === paths.length) ? 'text-gray-600' : 'text-gray-400'}`}>{path}</span>
                    {((idx + 1) !== paths.length) && <span className="text-gray-400">/</span>}
                </>
            ))}
        </div>
    )
}

export default function page() {
    const [sellingPoints, setSellingPoints] = useState<any[]>([]);
    const [excos, setExcos] = useState<any[]>([]);

    useEffect(() => {
        setSellingPoints([
            { icon: <ShopIcon />, figure: 10.5, metric: 'Sellers active on our site' },
            { icon: <DollarCoin />, figure: 33, metric: 'Monthly Produt Sale' },
            { icon: <BagIcon />, figure: 45.5, metric: 'Customer active in our site' },
            { icon: <MoneyBag />, figure: 25, metric: 'Annual gross sale in our site' },
        ])
    
        setExcos([
            { name: 'Name', position: 'Founded & Chairman', instagram: '', facebook: '', linkedin: '' },
            { name: 'Name', position: 'Managing Director', instagram: '', facebook: '', linkedin: '' },
            { name: 'Name', position: 'Product Designer', instagram: '', facebook: '', linkedin: '' },
        ])
    }, [])

    const settings11: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <div className="w-full py-10">
            <BreadCrumb paths={['Home', 'About']} />
            <div className="w-full col-center gap-10 lg:gap-20">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 ">
                    <div className="flex flex-col justify-center items-start gap-5 pl-5 md:pl-10 lg:pl-20 pr-5 py-5">
                        <h2 className="font-bold text-3xl">Our Story</h2>
                        <p>
                            Welcome to Zylag, your ultimate destination for online shopping. We are a premier e-commerce platform dedicated to
                            delivering a seamless and enjoyable shopping experience to customers worldwide. With a passion for innovation and
                            a commitment to excellence, we redefine the way you shop online.
                            <br /><br />
                            Zylag has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
                        </p>
                    </div>
                    <div className="center p-0">
                        <img className="w-full h-full object-cover object-center" src="/two-females-holding-shopping-bag.png" alt="two-females-holding-shopping-bag" />
                    </div>
                </div>

                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-5 px-5 md:px-10 lg:px-20">
                    {sellingPoints.map((p, idx) => (
                        <div className="col-center gap-3 p-3 md:p-5 border border-gray-500 hover:bg-red-700 rounded hover:text-white" key={idx}>
                            <div className="rounded-full aspect-square p-1 border-[10px] border-gray-400 hover:border-red-700 hover:border-opacity-50 bg-black hover:bg-white stroke-[#FAFAFA] hover:stroke-black">{p.icon}</div>
                            <span className="font-bold text-2xl">{p.figure}k</span>
                            <span className="text-center">{p.metric}</span>
                        </div>
                    ))}
                </div>

                <div className="w-full px-5 md:px-10 lg:px-20">
                    <Slider className="w-full" {...settings11}>
                        {excos.map((exco, idx) => (
                            <div className="w-full px-2">
                                <div className="col-center gap-3">
                                    <div className="min-h-[300px] w-full bg-gray-200"></div>
                                    <div className="w-full col-start gap-1">
                                        <span className="font-semibold text-xl">{exco.name}</span>
                                        <span className="text-xs">{exco.position}</span>
                                        <div className="start gap-2">
                                            <TwitterIcon /><InstagramIcon /><LinkedinIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}
