"use client";
import { useEffect, useRef, useState } from 'react'
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';
import Slider, { Settings } from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeartIcon from './icons/HeartIcon';
import EyeIcon from './icons/EyeIcon';
import Link from 'next/link';
import CellPhone from './icons/CellPhone';
import Computer from './icons/Computer';
import SmartWatch from './icons/SmartWatch';
import Camera from './icons/Camera';
import Headphone from './icons/Headphone';
import Gamepad from './icons/Gamepad';

type FlashSales = {
  name: string;
  image: string;
  price: number;
  originalprice: number;
}

type Product = {
  name: string;
  image: string;
  price: number;
  originalprice: number;
  isNew: boolean;
  [key: string]: any;
}

function TitleBlock({ title }: { title: String }) {
  return (
    <div className="w-full flex justify-start items-center gap-5">
      <div className="w-[20px] h-[40px] bg-red-500 rounded-md"></div>
      <div className="text-red-500 font-semibold text-sm">{title}</div>
    </div>
  )
}

function SubTitle({ title }: { title: String }) {
  return (
    <div className="font-semibold lg:font-bold text-2xl md:text-3xl lg:text-4xl">{title}</div>
  )
}

const CategoryIconMap: { [key: string]: any } = {
  "phones": <CellPhone />,
  "computers": <Computer />,
  "smartwatch": <SmartWatch />,
  "camera": <Camera />,
  "headphones": <Headphone />,
  "gaming": <Gamepad />
}

function FlashSaleCard({ v }: { v: FlashSales }) {
  return (
    <div className='px-2'>
      <div className="relative h-[250px] bg-[#f5f5f5] p-4 mb-3 flex justify-center items-center">
        <div className="absolute top-[5px] left-[5px] rounded-[4px] bg-red-500 text-xs text-white px-[5px] py-1">-{100 - (v.price / v.originalprice) * 100}%</div>
        <div className="absolute top-1 right-1 flex flex-col gap-[6px]">
          <span className='rounded-full p-[5px] aspect-square flex justify-center items-center bg-white cursor-pointer'> <HeartIcon /> </span>
          <span className='rounded-full p-[5px] aspect-square flex justify-center items-center bg-white cursor-pointer'> <EyeIcon /> </span>
        </div>
        <img src={"/images" + v.image} alt={v.name} />
      </div>
      <div className="font-semibold mb-2">{v.name}</div>
      <div className="flex items-center gap-2">
        <span className='text-red-500'>${v.price}</span>
        <span className="text-neutral-300 line-through">${v.originalprice}</span>
      </div>
    </div>
  )
}

function CategoryCard({ v }: { v: string }) {
  return (
    <div className="px-2">
      <div className="flex flex-col gap-3 p-4 justify-center items-center border rounded-md hover:bg-red-500 hover:text-white">
        <span>{CategoryIconMap[v.toLocaleLowerCase()] ?? <></>}</span>
        <span>{v}</span>
      </div>
    </div>
  )
}

function BestSellingCard({ v }: { v: FlashSales }) {
  return (
    <div className='px-2'>
      <div className="relative h-[250px] bg-[#f5f5f5] p-4 mb-3 flex justify-center items-center">
        {/* <div className="absolute top-[5px] left-[5px] rounded-[4px] bg-red-500 text-xs text-white px-[5px] py-1">-{100 - (v.price / v.originalprice) * 100}%</div> */}
        <div className="absolute top-1 right-1 flex flex-col gap-[6px]">
          <span className='rounded-full p-[5px] aspect-square flex justify-center items-center bg-white cursor-pointer'> <HeartIcon /> </span>
          <span className='rounded-full p-[5px] aspect-square flex justify-center items-center bg-white cursor-pointer'> <EyeIcon /> </span>
        </div>
        <img src={"/images" + v.image} alt={v.name} />
      </div>
      <div className="font-semibold mb-2">{v.name}</div>
      <div className="flex items-center gap-2">
        <span className='text-red-500'>${v.price}</span>
        <span className="text-neutral-300 line-through">${v.originalprice}</span>
      </div>
    </div>
  )
}

function ProductCard({ v }: { v: Product }) {
  return (
    <div className='px-2'>
      <div className="relative h-[250px] bg-[#f5f5f5] p-4 mb-3 flex justify-center items-center">
        {v.isNew && <div className="absolute top-[5px] left-[5px] rounded-[4px] bg-blue-500 text-xs text-white px-[5px] py-1">New</div>}
        <div className="absolute top-1 right-1 flex flex-col gap-[6px]">
          <span className='rounded-full p-[5px] aspect-square flex justify-center items-center bg-white cursor-pointer'> <HeartIcon /> </span>
          <span className='rounded-full p-[5px] aspect-square flex justify-center items-center bg-white cursor-pointer'> <EyeIcon /> </span>
        </div>
        <img src={"/images" + v.image} alt={v.name} />
      </div>
      <div className="font-semibold mb-2">{v.name}</div>
      <div className="flex items-center gap-2">
        <span className='text-red-500'>${v.price}</span>
        <span className="text-neutral-300 line-through">${v.originalprice}</span>
      </div>
    </div>
  )
}

export default function Home() {
  const [flashSales, setFlashSales] = useState<FlashSales[]>([]);
  const [bestSelling, setBestSelling] = useState<FlashSales[]>([])
  const [mainCategories, setMainCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    async function getData() {
      const res = await fetch('/api');

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      setFlashSales(data?.flashSales);
      setBestSelling(data?.bestSelling);
      setMainCategories(data?.mainCategories);
      setCategories(data?.categories);
      setProducts(data?.products);

      return data;
    }
    getData();
    console.log(flashSales);
  }, [])

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

  const slider33 = useRef<any>(null);
  const settings33: Settings = { ...settings11, rows: 2, centerPadding: '20px' }

  return (
    <div className='w-full flex flex-col gap-5 md:gap-8 lg:gap-12 2xl:max-w-[1500px] pb-5 px-5 md:px-10 lg:px-20 text-sm'>
      <div className="w-full flex items-start">
        <div className="basis-1/4 hidden lg:block border-r-[1px] border-r-neutral-200 pt-4">
          <div className="flex flex-col items-start gap-4">
            {mainCategories.map((val, idx) => (
              <span key={idx}>{val}</span>
            ))}
          </div>
        </div>
        <div className='flex-grow p-5'>
          <div className="rounded-2xl relative flex bg-red-900 min-h-[250px]">
            <div className="basis-1/2 flex flex-col items-start justify-center gap-5 min-h-full rounded-l-2xl p-5 lg:p-10 text-neutral-100">
              <div className='start gap-3'>
                <img src="/images/apple-logo.png" alt="apple logo" />
                <span className='text-base'>iPhone 14 series</span>
              </div>
              <div className="font-bold text-3xl md:text-4xl lg:text-5xl">Up to 10% off Voucher</div>
              <div className="start gap-3 cursor-pointer">
                <span className='underline underline-offset-8 text-base'>Shop now</span>
                <ArrowRight color='white' />
              </div>
            </div>
            <div className='basis-1/2 bg-black min-h-full rounded-r-2xl text-neutral-100'>
              <img className='rounded-r-2xl' src="/images/iphone-black-bg.png" alt="iphone picture" />
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sales Section */}
      <div className="w-full flex flex-col gap-4 lg:gap-8">
        <TitleBlock title={"Today's"} />
        <div className="flex justify-between items-center">
          <SubTitle title={'Flash Sales'} />
          <div className="px-5 flex gap-3 items-center ">
            <div onClick={e => slider11?.current?.slickPrev()} className="rounded-full bg-slate-200 p-2 cursor-pointer hover:bg-slate-100 hover:shadow-sm"><ArrowLeft /></div>
            <div onClick={e => slider11?.current?.slickNext()} className="rounded-full bg-slate-200 p-2 cursor-pointer hover:bg-slate-100 hover:shadow-sm"><ArrowRight /></div>
          </div>
        </div>
        <div className="">
          <Slider ref={slider11} className='mb-5 lg:mb-8' {...settings11}>
            {flashSales.map((v, idx) => (
              <FlashSaleCard v={v} key={idx} />
            ))}
          </Slider>
          <div className="w-full flex justify-center items-center">
            <Link href={'#'}><button className='text-white px-5 py-3 bg-red-500 rounded'>View All products</button></Link>
          </div>
        </div>
      </div>
      <hr className='w-full border-t-neutral-100' />

      {/* Browse By Category Section */}
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

      {/* This Month Section */}
      <div className="w-full flex flex-col gap-4 lg:gap-8">
        <TitleBlock title={'This Month'} />
        <div className="flex justify-between items-center">
          <SubTitle title={'Best Selling Products'} />
          <button className='text-white px-5 py-3 bg-red-500 rounded'>View All</button>
        </div>
        <div className="">
          <Slider ref={slider11} className='mb-5 lg:mb-8' {...settings11}>
            {bestSelling.map((v, idx) => (
              <BestSellingCard v={v} key={idx} />
            ))}
          </Slider>
        </div>
      </div>
      <hr className='w-full border-t-neutral-100' />

      <div className="w-full bg-dark-red p-5 lg:p-10 flex flex-col-reverse md:flex-row md:flex-nowrap items-center text-white font-semibold rounded-2xl">
        <div className="basis-1/2 flex flex-col items-start gap-5">
          <span>Categories</span>
          <span className='text-4xl lg:text-5xl'>Enhance Your Music Experience</span>
          <div className="start gap-4 flex-wrap">
            <div className="rounded-full bg-white text-black p-[5px] w-[60px] aspect-square col-center">
              23 <br /> <span className='text-xs'>Hours</span>
            </div>
            <div className="rounded-full bg-white text-black p-[5px] w-[60px] aspect-square col-center">
              23 <br /> <span className='text-xs'>Days</span>
            </div>
            <div className="rounded-full bg-white text-black p-[5px] w-[60px] aspect-square col-center">
              23 <br /> <span className='text-xs'>Minutes</span>
            </div>
            <div className="rounded-full bg-white text-black p-[5px] w-[60px] aspect-square col-center">
              23 <br /> <span className='text-xs'>Seconds</span>
            </div>
          </div>
          <button className='bg-black text-white px-5 py-3 rounded-md'>Buy Now</button>
        </div>
        <div className="basis-1/2 center p-5 w-full">
          <img src="/images/jbl-boombox.png" alt="jbl boombox" />
        </div>
      </div>

      {/* Our products section */}
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

      {/* Featured: New arrival */}
      <div className="w-full flex flex-col gap-4 lg:gap-8">
        <TitleBlock title={'Featured'} />
        <div className="between">
          <SubTitle title={'New Arrival'} />
        </div>
        <div className="grid grid-rows-2 grid-flow-col gap-4 lg:gap-5">
          <div></div>
        </div>
      </div>
    </div>
  )
}
