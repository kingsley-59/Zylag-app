'use client';

import ArrowLeft from "@/app/icons/ArrowLeft";
import CancelIcon from "@/app/icons/CancelIcon";
import { prev, reset } from "@/app/redux/features/newAdSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import AdSettings from "./AdSettings";
import CreateAd from "./CreateAd";


export default function Page() {
    const { currentStep } = useAppSelector(state => state.newAd);
    const dispatch = useAppDispatch();

    return (
        <section className="w-full p-5 md:p-10 lg:p-12 col-start gap-5 md:gap-10 bg-white">
            <div className="w-full shadow shadow-neutral-200 between p-4">
                <span onClick={() => dispatch(prev())} className="cursor-pointer"><ArrowLeft /></span>
                <span className="uppercase font-semibold">Post ads</span>
                <span onClick={() => dispatch(reset())} className="cursor-pointer"><CancelIcon /></span>
            </div>

            <div className="w-full md:px-5 lg:px-10 pb-10 mb-7">
                {currentStep === 1 && <CreateAd />}

                {currentStep === 2 && <AdSettings />}
            </div>
        </section>
    )
}