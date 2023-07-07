"use client";
import { useEffect, useState } from "react";
import { Product } from "./ProductCard";
import { useAppDispatch } from "../redux/hooks";
import { setErrorMsg } from "../redux/features/alertSlice";


export default function ProductImages({product}: {product?: TAds}) {
    const [currentImg, setCurrentImg] = useState<string | undefined>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!product) dispatch(setErrorMsg('Failed to get product details'));
        if (product?.photos && typeof product.photos[0] === 'string') {
            setCurrentImg(product.photos[0])
        }
    }, [])
    
    return (
        <div className="w-full h-full grid grid-cols-7 gap-5">
            <div className="col-span-2">
                <div className="h-full grid grid-rows-4 gap-3">
                    {product?.photos?.map((photo, idx) => (
                        <div onClick={() => setCurrentImg(photo as string)} className="w-full center bg-[#F5F5F5] p-2 cursor-pointer">
                            <img src={photo as string} alt={product.title} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-5 center bg-[#F5F5F5] p-3">
                <img className="w-full" src={currentImg} alt={product?.title} />
            </div>
        </div>
    )
}
