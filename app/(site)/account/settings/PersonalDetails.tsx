'use client';

import CardTitle from "@/app/components/CardTitle";
import FormContainer from "@/app/components/FormContainer";
import SaveButton from "@/app/components/SaveButton";
import PencilIcon from "@/app/icons/PencilIcon";
import { useAppSelector } from "@/app/redux/hooks";
import { useState } from "react";


export default function PersonalDetails() {
    const { fullname } = useAppSelector(state => state.auth)
    const [personalDetailsChanged, setPersonalDetailsChanged] = useState(false);

    return (
        <div>
            <CardTitle isSaved={personalDetailsChanged} title="Personal Details" />
            <div className="w-full p-5 md:py-8">
                <form className="w-full">
                    <FormContainer >
                        {/* Personal details form start */}
                        <div className="relative rounded-full object-center w-[100px] aspect-square bg-slate-400 mb-5">
                            <img className="object-top object-cover rounded-full" src="/headshot.jpg" alt="profile picture" />
                            <div className="absolute center right-1 -bottom-1 p-3 rounded-full bg-red-100"><PencilIcon /></div>
                        </div>
                        <div className="form-group">
                            <label className="font-semibold">Full Name</label>
                            <input type="text" className="form-input" value={fullname} placeholder="Full Name" required />
                        </div>
                        <div className="form-group">
                            <label className="font-semibold">Select Location</label>
                            <input type="text" className="form-input" placeholder="Select Location" required />
                        </div>
                        <div className="form-group">
                            <label className="font-semibold">Birthday</label>
                            <input type="date" className="form-input" placeholder="Select Birthday" required />
                        </div>
                        <div className="form-group">
                            <label className="font-semibold">Sex</label>
                            <select name="" className="form-input">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="masquerade">Masquerade</option>
                            </select>
                        </div>
                        <div className="form-group py-10 lg:py-7">
                            <SaveButton />
                        </div>
                        {/* Form end */}
                    </FormContainer>
                </form>
            </div>
        </div>
    )
}
