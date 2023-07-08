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
import { axiosInstance } from './config';
import LatestAdsSection from './sections/LatestAdsSection';


type PageData = {
  flashSales: any[];
  bestSelling: any[];
  mainCategories: any[];
  categories: any[];
  products: any[];
};

async function getData(): Promise<PageData> {
  const res = await import('./api/route');

  const data = await (await res.GET()).json()

  return data;
}



async function getAdsData(): Promise<{ categories?: TCategory[], latestAds?: TAds[] }> {
  try {
    const { data: categoryData } = await axiosInstance.get('/category');
    const { data: adsData } = await axiosInstance.get('/ads');

    return {
      categories: categoryData.data?.categories || [],
      latestAds: adsData.data?.ads || []
    }
  } catch (error) {
    return {};
  }
}

export default async function Home() {
  const { flashSales, bestSelling, mainCategories, products } = await getData();
  const { latestAds, categories } = await getAdsData();

  return (
    <div className='w-full flex flex-col gap-5 md:gap-8 lg:gap-12 2xl:max-w-[1500px] pb-5 px-5 md:px-10 lg:px-20 text-sm'>
      <div className="w-full">
        <div className="w-full flex items-start">
          <div className="basis-1/4 hidden lg:block border-r-[1px] border-r-neutral-200 pt-4">
            <div className="flex flex-col items-start gap-4">
              {categories?.map((category, idx) => (
                <span key={idx}>{category.name}</span>
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

      {/* Latest Ads Section */}
      <LatestAdsSection latestAds={latestAds} />

      {/* Browse By Category Section */}
      <CategoriesSection categories={categories} />

      {/* Our products section */}
      <ProductsSection products={latestAds} />
      
    </div>
  )
}
