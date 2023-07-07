"use client";
import Slider, { Settings } from "react-slick";
import SubTitle from "../components/SubTitle";
import TitleBlock from "../components/TitleBlock";
import { useRef } from "react";
import Link from "next/link";
import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";
import ProductCard from "../components/ProductCard";


type LatestAdsProps = {
    latestAds?: TAds[]
}


export default function LatestAdsSection({latestAds}: LatestAdsProps) {
    const slider11 = useRef<any>(null);
    const settings11: Settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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
        <>
            <div className="w-full flex flex-col gap-4 lg:gap-8">
                <TitleBlock title={"Latest"} />
                <div className="flex justify-between items-center">
                    <SubTitle title={'Most Recent Ads'} />
                    <div className="px-5 flex gap-3 items-center ">
                        <div onClick={e => slider11?.current?.slickPrev()} className="rounded-full bg-slate-200 p-2 cursor-pointer hover:bg-slate-100 hover:shadow-sm"><ArrowLeft /></div>
                        <div onClick={e => slider11?.current?.slickNext()} className="rounded-full bg-slate-200 p-2 cursor-pointer hover:bg-slate-100 hover:shadow-sm"><ArrowRight /></div>
                    </div>
                </div>
                <div className="">
                    <Slider ref={slider11} className='mb-5 lg:mb-8' {...settings11}>
                        {latestAds?.map((v, idx) => (
                            <ProductCard v={v} key={idx} />
                        ))}
                    </Slider>
                    <div className="w-full flex justify-center items-center">
                        <Link href={'#'}><button className='text-white px-5 py-3 bg-red-500 rounded'>View All products</button></Link>
                    </div>
                </div>
            </div>
            <hr className='w-full border-t-neutral-100' />
        </>
    )
}
