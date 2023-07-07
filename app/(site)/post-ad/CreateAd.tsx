'use client';

import { axiosInstance } from "@/app/config";
import IdeaBulbIcon from "@/app/icons/IdeaBulbIcon";
import { setErrorMsg } from "@/app/redux/features/alertSlice";
import { Category, setAdCategory, setAdSubcategory, setAdTitle, updateCurrentStep } from "@/app/redux/features/newAdSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { ChangeEvent, useEffect, useState } from "react";

const defaultCharacterLength = 80;

export default function CreateAd() {
    const { title: adTitle, category: adCategory, subCategory: adSubcategory, currentStep } = useAppSelector(state => state.newAd);
    // const {  } = useAppSelector(state => state.alert);
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>(adTitle);
    const [charactersLeft, setCharactersLeft] = useState<number>(defaultCharacterLength - title?.length);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Category[]>([]);

    const onChangeTitleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCharactersLeft(defaultCharacterLength - e.target.value.length);
        setTitle(e.target.value);
    }

    useEffect(() => {
        if (!categories.length) {
            axiosInstance.get('/category')
                .then(({ data }) => setCategories(data.data?.categories as Category[]))
                .catch(error => {
                    console.log(error);
                    dispatch(setErrorMsg('Failed to load categories. Pls refresh...'))
                })
        }
    }, []);
    useEffect(() => {
        if (adCategory?.subCategories) {
            setSubcategories(adCategory.subCategories)
        }
    }, [adCategory])

    return (
        <>
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
                <button className="w-full bg-red-700 disabled:bg-opacity-50 text-white rounded p-3"
                    disabled={title?.length <= 3 || title === adTitle}
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
                    <span>{adCategory.name}</span>
                    <span onClick={() => { dispatch(setAdCategory(null)); dispatch(setAdSubcategory(null)) }} className="cursor-pointer">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.6571 12.6274L7.00023 6.97058M7.00023 6.97058L1.34338 1.31373M7.00023 6.97058L12.6571 1.31373M7.00023 6.97058L1.34338 12.6274" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                    </span>
                </div>}

                {/* Category list */}
                {adTitle && !adCategory && <div className="w-full max-w-[400px] mx-auto rounded-2xl border-[1px] border-gray-300 pb-3">
                    {categories.length ? categories.map((cat, idx) => (
                        <div role="button" key={idx}
                            className={"w-full border-b p-3 "}
                            onClick={() => dispatch(setAdCategory(cat))}
                        >{cat?.name}</div>
                    )) : (
                        <div role="button" className="w-full border-b p-3">No categories yet!</div>
                    )}
                </div>}

                {/* Subcategory list */}
                {adTitle && adCategory && <div className="w-full max-w-[400px] mx-auto rounded-2xl border-[1px] border-gray-300 pb-3">
                    {subcategories.length ? subcategories.map((cat, idx) => (
                        <div role="button" key={idx}
                            className={"w-full border-b p-3 " + ((adSubcategory?.name === cat?.name) ? "text-red-500" : "")}
                            onClick={() => dispatch(setAdSubcategory(cat))}
                        >{cat?.name}</div>
                    )) : (
                        <div role="button" className="w-full border-b p-3">No subcategories...</div>
                    )}
                </div>}

                <button className="w-full max-w-[400px] mx-auto bg-red-700 disabled:bg-red-400 text-white rounded p-3"
                    disabled={adSubcategory === null}
                    onClick={() => dispatch(updateCurrentStep(2))}
                >{'Continue'}</button>
            </div>
        </>
    )
}
