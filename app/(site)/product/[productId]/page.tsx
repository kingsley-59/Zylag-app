import ProductCard, { Product } from "@/app/components/ProductCard";
import ProductImages from "@/app/components/ProductImages";
import StarRating from "@/app/components/StarRating";
import { axiosInstance } from "@/app/config";
import { notFound } from "next/navigation";

type Props = {
    params: {
        productId: string
    }
}

// return {
//     name: 'Game Controller',
//     description: 'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
//     image: '/images/game-controller.png',
//     price: 10000,
//     stars: 4.5,
//     reviewCount: 20,
//     photos: ['/images/game-controller.png', '/images/game-controller-2.png', '/images/game-controller-3.png', '/images/game-controller-4.png']
// }

async function getProductDetails(productId: string): Promise<TAds | undefined> {
    try {
        const { data, status } = await axiosInstance.get('/ads/' + productId);
        if (status === 404) {
            return notFound()
        }
        return data.data;
    } catch (error) {
        return;
    }
}

async function getSimilarAds(subcategory?: string): Promise<TAds[] | undefined> {
    
    try {
        const { data } = await axiosInstance.get('/ads/category/' + subcategory);
        console.log('Subcategory Id: ', subcategory);
        console.log(data);
        return data.data.ads
    } catch (error) {
        return;
    }
}

export default async function page({ params }: Props) {
    const { productId } = params;
    const productDetails = await getProductDetails(productId);
    const similarAds = await getSimilarAds(productDetails?.subCategory._id)

    return (
        <div className="w-full p-5 md:p-10 lg:p-20 bg-white">
            <div className="w-full grid grid-cols-7 lg:grid-cols-11 gap-7 mb-7">
                <div className="col-span-7 h-full">
                    <ProductImages product={productDetails} />
                </div>
                <div className="col-span-full lg:col-span-4 col-start gap-5">
                    <div className="col-start gap-3">
                        <span className="font-semibold text-2xl">{productDetails?.title}</span>
                        {/* <StarRating stars={Math.floor(productDetails.stars)} reviews={productDetails.reviewCount} /> */}
                        <span className="font-semibold text-2xl">&#x20A6;{productDetails?.price}</span>
                    </div>
                    <p>{productDetails?.description}</p>
                    <hr className="border-b border-b-black w-full" />
                    <div className="w-full flex-grow rounded-[10px] bg-[#f5f5f5] p-3 col-center gap-5">
                        <div className="w-full start gap-3">
                            <div className="rounded-full">
                                <img className="rounded-full w-[50px] aspect-square" src="/headshot.jpg" alt="" />
                            </div>
                            <div className="col-start gap-1">
                                <span className="font-semibold">Venbrino Developers Ltd</span>
                                <span className="text-sm  gap-2">
                                    2 months old
                                    <span className="text-xs">. 12mins Ave reply rate</span>
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex gap-5">
                            <button className="basis-1/2 px-3 py-2 rounded border border-red-700 text-red-700">Show contact</button>
                            <button className="basis-1/2 px-3 py-2 rounded border border-red-700 bg-red-700 text-white">Chat</button>
                        </div>
                    </div>
                    <div className="w-full flex-grow relative col-center gap-3 p-3 bg-[#23CC34] bg-opacity-10">
                        <div className="w-full center gap-2 font-semibold">
                            <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="&#240;&#159;&#166;&#134; icon &#34;warning amber&#34;">
                                    <path id="Vector" d="M11.2084 2.34896L20.0634 17.6481H2.35352L11.2084 2.34896ZM0.319119 16.4721C-0.586363 18.0362 0.54255 20 2.35352 20H20.0634C21.8743 20 23.0032 18.0362 22.0977 16.4721L13.2428 1.17301C12.3373 -0.391004 10.0795 -0.391004 9.17404 1.17301L0.319119 16.4721ZM10.0325 8.24048V10.5924C10.0325 11.2392 10.5617 11.7683 11.2084 11.7683C11.8552 11.7683 12.3844 11.2392 12.3844 10.5924V8.24048C12.3844 7.59371 11.8552 7.06453 11.2084 7.06453C10.5617 7.06453 10.0325 7.59371 10.0325 8.24048ZM10.0325 14.1202H12.3844V16.4721H10.0325V14.1202Z" fill="black" />
                                </g>
                            </svg>
                            Safety Guidelines
                        </div>
                        <ul className="list-disc pl-3 font-light">
                            <li>Please don't make payment before goods is delivered</li>
                            <li>Make sure to check goods very well</li>
                            <li>Your feedback is highly welcome on the product</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="rounded bg-[#F5F5F5] mb-10">
                <div className="px-4 py-3 between gap-5 text-[#949494]">
                    <div className="start gap-3 lg:gap-5">
                        <span className="px-2 py-1 border border-[#949494] rounded">promoted</span>
                        <div className="gap-2 hidden md:flex justify-start items-center">
                            <img src="/images/clock-icon-gray.svg" alt="clock icon" />
                            Posted 2 hours ago
                        </div>
                    </div>
                    <div className="bg-[#949494] text-[#FAFAFA] font-light center gap-2 p-2 rounded">
                        <img src="/images/eye-icon-white.svg" alt="eye icon" />
                        20 visits
                    </div>
                </div>
                <hr className="w-full border-t border-t-[#949494]" />
                <div className="px-4 py-3 col-start gap-3">
                    <span className="font-semibold">Description</span>
                    <p>{productDetails?.description}</p>
                </div>
            </div>
            <div className="w-full col-start gap-10">
                <div className="start font-semibold">Similar Ads </div>
                {similarAds?.length ? (
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 justify-between">
                        {similarAds.map((ad, idx) => (
                            <ProductCard key={idx} v={ad} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full center font-bold text-opacity-50">No similar ads for this product</div>
                )}
            </div>
        </div>
    )
}
