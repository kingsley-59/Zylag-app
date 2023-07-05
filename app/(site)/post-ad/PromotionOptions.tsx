
import { Condition, setAdCondition, setAdPrice, setAdPromoCategory, setAdPromoOption, setAdProperty, setAdTitle } from "@/app/redux/features/newAdSlice"
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import { axiosInstance } from "@/app/config";

export type TPromotionOptions = {
    category: string;
    options: {
        duration: number;
        price: number;
        _id: string;
    }[];
}[];

export function formatPromoOptions(promos = []) {
    console.log(promos);
    const promoMap = new Map();
    const result: TPromotionOptions = [];
    for (let { _id, category, duration, price } of promos) {
        if (promoMap.has(category)) {
            promoMap.set(category, [...promoMap.get(category), { duration, price, _id }])
        } else {
            promoMap.set(category, [{ duration, price, _id }]);
        }
    }
    promoMap.forEach((value, key) => {
        result.push({ category: key, options: value });
    })
    return result;
}

export default function PromotionOptions({ promotions }: { promotions: TPromotionOptions }) {
    const { promoCategory, promoOption } = useAppSelector(state => state.newAd);
    const dispatch = useAppDispatch();

    const onClickPromoCategory = (category: string, options: {category?: string, duration?: number, price?: number, _id?: string}[]) => {
        if (options[0].price === 0) dispatch(setAdPromoOption(options))
        if (promoCategory !== category) {
            dispatch(setAdPromoOption({}))
            dispatch(setAdPromoCategory(category))
        }
    }

    const onClickPromoOption = (option: {category?: string, duration?: number, price?: number, _id?: string}) => {
        dispatch(setAdPromoOption(option));
    }

    return (
        <>
            <p className="text-center text-gray-300 text-xs">Please choose one of the following options to post your ad</p>
            {promotions.map(({ category, options }, idx) => (
                <div key={idx}
                    className={`w-full border rounded-lg cursor-pointer ${category === promoCategory ? 'border-red-700 text-red-700' : ''}`}
                    onClick={() => onClickPromoCategory(category, options)}
                >
                    <div className="w-full between p-3">
                        <span className="font-semibold">{category}</span>
                        {(options[0].price < 1) && <span className="text-gray-400">Free</span>}
                    </div>
                    <div className="between gap-3 px-3 py-2">
                        {<div className="start gap-3">
                            {options?.map((option, idx) => (
                                <span key={idx}
                                    onClick={() => onClickPromoOption(option)}
                                    className={`rounded-full px-2 py-1 border border-gray-300 ${(promoOption._id == option._id) ? 'bg-red-200' : ''}`}
                                >{option.duration ? `${option.duration} days` : 'Unlimited'}</span>
                            ))}
                        </div>}
                        
                        <span>{(category === promoCategory && promoOption.price) ? `NGN ${promoOption.price}` : ''}</span>
                    </div>
                </div>
            ))}
        </>
    )
}
