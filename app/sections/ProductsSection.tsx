'use client';
import { useRef } from 'react'
import TitleBlock from '../components/TitleBlock'
import SubTitle from '../components/SubTitle'
import Slider, { Settings } from 'react-slick'
import ProductCard from '../components/ProductCard'
import Link from 'next/link'
import ArrowLeft from '../icons/ArrowLeft'
import ArrowRight from '../icons/ArrowRight'

export default function ProductsSection({products}: {products: any[]}) {
    const slider33 = useRef<any>(null);
    const settings33: Settings = {
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
        ],
        rows: 2,
        centerPadding: '20px'
    }

    return (
        <>
            <div className="w-full flex flex-col gap-4 lg:gap-8">
                <TitleBlock title={'Our Products'} />
                <div className="between">
                    <SubTitle title={'Explore Our Products'} />
                    <div className="px-5 flex gap-3 items-center ">
                        <div onClick={e => slider33?.current?.slickPrev()} className="rounded-full bg-slate-200 p-2 cursor-pointer hover:bg-slate-100 hover:shadow-sm"><ArrowLeft /></div>
                        <div onClick={e => slider33?.current?.slickNext()} className="rounded-full bg-slate-200 p-2 cursor-pointer hover:bg-slate-100 hover:shadow-sm"><ArrowRight /></div>
                    </div>
                </div>
                <div className="">
                    <Slider ref={slider33} {...settings33}>
                        {products.map((v, idx) => (
                            <ProductCard v={v} key={idx} />
                        ))}
                    </Slider>
                    <div className="w-full flex justify-center items-center">
                        <Link href={'#'}><button className='text-white px-5 py-3 bg-red-500 rounded'>View All products</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
