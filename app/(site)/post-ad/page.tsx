'use client';

import ArrowLeft from "@/app/icons/ArrowLeft";
import CancelIcon from "@/app/icons/CancelIcon";
import IdeaBulbIcon from "@/app/icons/IdeaBulbIcon";
import { reset, setAdCategory, setAdSubcategory, setAdTitle, updateCurrentStep } from "@/app/redux/features/newAdSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { ChangeEvent, useEffect, useState } from "react";
import AdSettings from "./AdSettings";

const defaultCharacterLength = 20;

export default function Page() {
    const { title: adTitle, category: adCategory, subCategory: adSubcategory, currentStep } = useAppSelector(state => state.newAd);
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>(adTitle);
    const [charactersLeft, setCharactersLeft] = useState<number>(defaultCharacterLength - title?.length);
    const [categories, setCategories] = useState<any[]>([]);
    const [subcategories, setSubcategories] = useState<any[]>([]);

    const onChangeTitleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCharactersLeft(defaultCharacterLength - e.target.value.length);
        setTitle(e.target.value);
    }

    useEffect(() => {
        setCategories([
            'Agriculture', 'Clothing', 'Animals & pets', 'Vehicles', 'Agriculture', 'Agriculture'
        ]);
        setSubcategories([
            'Agriculture', 'Agriculture', 'Agriculture', 'Agriculture', 'Agriculture', 'Agriculture',
        ]);
    }, []);

    return (
        <section className="w-full p-5 md:p-10 lg:p-12 col-start gap-5 md:gap-10 bg-white">
            <div className="w-full shadow shadow-neutral-200 between p-4">
                <span><ArrowLeft /></span>
                <span className="uppercase font-semibold">Post ads</span>
                <span onClick={() => dispatch(reset())} className="cursor-pointer"><CancelIcon /></span>
            </div>

            <div className="w-full p-5 lg:p-10 mb-7">
                <div className="max-w-[600px] mx-auto flex flex-col justify-start items-center gap-5">
                    <div className="form-group">
                        <label className="form-label">Ads title</label>
                        <div className="w-full relative">
                            <textarea id="" rows={5} className="bg-gray-100 w-full rounded p-3"
                                maxLength={defaultCharacterLength}
                                placeholder="Buy your new iphone 11"
                                value={title}
                                onChange={onChangeTitleText}
                            ></textarea>
                            <div className="absolute bottom-3 right-3">-{charactersLeft}</div>
                        </div>
                    </div>
                    <p className="w-full p-3 bg-red-200 bg-opacity-60 center gap-3 rounded">
                        <IdeaBulbIcon />
                        Descriptive titles are the best fuel for high performing ads!
                    </p>
                    <button className="w-full bg-red-700 disabled:bg-red-400 text-white rounded p-3"
                        disabled={title?.length <= 3}
                        onClick={() => dispatch(setAdTitle(title))}
                    >{adTitle ? 'Change' : 'Next'}</button>
                </div>

                <div className="max-w-[600px] mx-auto col-center gap-10 mt-10">
                    <hr className="w-full  border-b border-gray-300 border-dashed flex-grow" />
                    <div className="w-full flex justify-center items-center ">
                        <span className="font-semibold">{adCategory ? 'Choose Subcategory' : 'Choose Category'}</span>
                    </div>
                    {/* Choose category/subcategory title */}
                    {adCategory && <div className="w-full max-w-[450px] mx-auto p-3 between border ">
                        <span>{adCategory}</span>
                        <span onClick={() => {dispatch(setAdCategory('')); dispatch(setAdSubcategory(''))}} className="cursor-pointer">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.6571 12.6274L7.00023 6.97058M7.00023 6.97058L1.34338 1.31373M7.00023 6.97058L12.6571 1.31373M7.00023 6.97058L1.34338 12.6274" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </span>
                    </div>}

                    {/* Category list */}
                    {adTitle && !adCategory && <div className="w-full max-w-[400px] mx-auto rounded-2xl border-[1px] border-gray-300 pb-3">
                        {categories.map((cat, idx) => (
                            <div role="button" key={idx}
                                className={"w-full border-b p-3 " + ((adCategory === cat) ? "text-red-500" : "")}
                                onClick={() => cat === adCategory ? dispatch(setAdCategory('')) : dispatch(setAdCategory(cat))}
                            >{cat}</div>
                        ))}
                    </div>}

                    {/* Subcategory list */}
                    {adTitle && adCategory && <div className="w-full max-w-[400px] mx-auto rounded-2xl border-[1px] border-gray-300 pb-3">
                        {subcategories.map((cat, idx) => (
                            <div role="button" key={idx}
                                className={"w-full border-b p-3 " + ((adSubcategory === cat) ? "text-red-500" : "")}
                                onClick={() => cat === dispatch(setAdSubcategory(cat))}
                            >{cat}</div>
                        ))}
                    </div>}

                    <button className="w-full max-w-[400px] mx-auto bg-red-700 disabled:bg-red-400 text-white rounded p-3"
                        disabled={adSubcategory === ''}
                        onClick={() => dispatch(updateCurrentStep(2))}
                    >{ 'Continue'}</button>
                </div>

                {currentStep === 2 && <AdSettings />}
            </div>
        </section>
    )
}