import Link from "next/link";
import EyeIcon from "../icons/EyeIcon";
import HeartIcon from "../icons/HeartIcon";
import StarRating from "./StarRating";


export type Product = {
    name: string;
    description?: string;
    image: string;
    price: number;
    originalprice?: number;
    isNew?: boolean;
    photos?: string[];
    [key: string]: any;
}



export default function ProductCard({ v }: { v: TAds }) {
    
    return (
        <div className='px-2'>
            <div className="relative h-[200px] md:h-auto md:aspect-square bg-[#f5f5f5] p-4 mb-3 flex justify-center items-center">
                <div className="absolute top-[5px] left-[5px] col-start gap-3">
                    {v.discountPrice && <div className="rounded-[4px] bg-red-500 text-xs text-white px-[5px] py-1">-{(100 - (v.discountPrice / (v.price as number)) * 100).toFixed(0)}%</div>}
                    {v.isNew && <div className="rounded-[4px] bg-blue-500 text-xs text-white px-[5px] py-1">New</div>}
                </div>
                {v.isNew && <div className="absolute top-[5px] left-[5px] rounded-[4px] bg-blue-500 text-xs text-white px-[5px] py-1">New</div>}
                <div className="absolute top-1 right-1 flex flex-col gap-[6px]">
                    <span className='rounded-full p-[5px] aspect-square flex justify-center items-center bg-white cursor-pointer'> <HeartIcon /> </span>
                    <span className='rounded-full p-[5px] aspect-square flex justify-center items-center bg-white cursor-pointer'> <EyeIcon /> </span>
                </div>
                <img src={v.photos[0] as string} alt={v.title} />
            </div>
            <Link href={'/product/'+v._id} ><div className="font-semibold mb-2">{v.title}</div></Link>
            <div className="flex items-center gap-2">
                <span className='text-red-500'>&#x20A6;{v.discountPrice || v.price}</span>
                {v.discountPrice && <span className="text-neutral-300 line-through">&#x20A6;{v.price}</span>}
            </div>
            {/* {v?.stars && <div className="">
                <StarRating stars={v.stars} reviews={v?.reviewCount} />
            </div>} */}
        </div>
    )
}