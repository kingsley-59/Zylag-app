'use client';
import Slider, { Settings } from "react-slick";
import SubTitle from "../components/SubTitle";
import TitleBlock from "../components/TitleBlock";
import CategoryCard from "../components/CategoryCard";
import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";
import { useRef } from "react";


export default function CategoriesSection({ categories }: { categories: any[] }) {
    const slider22 = useRef<any>(null);
    const settings22: Settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    }
    return (
        <>
            <div className='w-full flex flex-col gap-4 lg:gap-8'>
                <TitleBlock title={"Categories"} />
                <div className="flex justify-between items-center">
                    <SubTitle title={'Browse By Category'} />
                    <div className="px-5 flex gap-3 items-center ">
                        <div onClick={e => slider22?.current?.slickPrev()} className="rounded-full bg-slate-200 p-2 cursor-pointer hover:bg-slate-100 hover:shadow-sm"><ArrowLeft /></div>
                        <div onClick={e => slider22?.current?.slickNext()} className="rounded-full bg-slate-200 p-2 cursor-pointer hover:bg-slate-100 hover:shadow-sm"><ArrowRight /></div>
                    </div>
                </div>
                <div className="">
                    <Slider ref={slider22} {...settings22}>
                        {categories.map((v, idx) => (
                            <CategoryCard v={v} />
                        ))}
                    </Slider>
                </div>
            </div>
            <hr className='w-full border-t-neutral-100' />
        </>
    )
}
