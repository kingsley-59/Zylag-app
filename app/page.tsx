import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import FlashSalesSection from './sections/FlashSalesSection';
import ProductsSection from './sections/ProductsSection';
import BestSellingSection from './sections/BestSellingSection';
import TitleBlock from './components/TitleBlock';
import SubTitle from './components/SubTitle';
import CategoriesSection from './sections/CategoriesSection';


type PageData = {
  flashSales: any[];
  bestSelling: any[]; 
  mainCategories: any[];
  categories: any[];
  products: any[];
};

async function getData(): Promise<PageData> {
  const res = await fetch('http://localhost:3000/api');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data;
}

export default async function Home() {
  const { flashSales, bestSelling, mainCategories, categories, products } = await getData();

  return (
    <div className='w-full flex flex-col gap-5 md:gap-8 lg:gap-12 2xl:max-w-[1500px] pb-5 px-5 md:px-10 lg:px-20 text-sm'>
      <div className="w-full">
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
        <div className="w-full py-5">
          <Link href={'/post-ad'} ><button className="bg-red-500 text-white px-5 py-3 rounded">Post Ads</button></Link>
        </div>
      </div>

      {/* Flash Sales Section */}
      <FlashSalesSection flashSales={flashSales} />

      {/* Browse By Category Section */}
      <CategoriesSection categories={categories} />

      {/* This Month Best Selling Section */}
      <BestSellingSection bestSelling={bestSelling} />

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
      <ProductsSection products={products}/>

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
