import EyeIcon from "../icons/EyeIcon";
import HeartIcon from "../icons/HeartIcon";


export type Product = {
    name: string;
    image: string;
    price: number;
    originalprice: number;
    isNew: boolean;
    [key: string]: any;
}



export default function ProductCard({ v }: { v: Product }) {
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