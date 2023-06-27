'use client';


import { useRef } from 'react'
import TitleBlock from '../components/TitleBlock'
import SubTitle from '../components/SubTitle'
import Slider, { Settings } from 'react-slick'
import ProductCard from '../components/ProductCard';

export default function BestSellingSection({bestSelling}: {bestSelling: any[]}) {
    const slider11 = useRef<any>(null);
    const settings11: Settings = {
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
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
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
        <>
            <div className="w-full flex flex-col gap-4 lg:gap-8">
                <TitleBlock title={'This Month'} />
                <div className="flex justify-between items-center">
                    <SubTitle title={'Best Selling Products'} />
                    <button className='text-white px-5 py-3 bg-red-500 rounded'>View All</button>
                </div>
                <div className="">
                    <Slider ref={slider11} className='mb-5 lg:mb-8' {...settings11}>
                        {bestSelling.map((v, idx) => (
                            <ProductCard v={v} key={idx} />
                        ))}
                    </Slider>
                </div>
            </div>
            <hr className='w-full border-t-neutral-100' />
        </>
    )
}
