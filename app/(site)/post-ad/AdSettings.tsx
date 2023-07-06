
import { Condition, setAdCondition, setAdPrice, setAdPromoCategory, setAdPromoOption, setAdProperty, setAdTitle } from "@/app/redux/features/newAdSlice"
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import { axiosInstance } from "@/app/config";
import PromotionOptions, { TPromotionOptions, formatPromoOptions } from "./PromotionOptions";
import Locations from "./Locations";
import { setErrorMsg, setSuccessMsg } from "@/app/redux/features/alertSlice";
import { useLoadScript } from "@react-google-maps/api";


interface TagInputProps {
    maxTags: number;
}

const TagInput: FC<TagInputProps> = ({ maxTags }) => {
    const dispatch = useAppDispatch();
    const { tags } = useAppSelector(state => state.newAd);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            if (tags.length < maxTags) {
                dispatch(setAdProperty({ key: 'tags', value: [...tags, inputValue] }));
                setInputValue('');
            }
        }
    };

    const handleTagRemove = (tag: string) => {
        dispatch(setAdProperty({ key: 'tags', value: tags.filter((t) => t !== tag) }))
    };

    useEffect(() => console.log(tags), [tags])

    return (
        <>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <div key={tag} className="flex items-center px-3 py-1 bg-red-500 text-white rounded-full" >
                        <span>{tag}</span>
                        <button type="button" onClick={() => handleTagRemove(tag)} className="ml-2 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24" >
                                <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm4 14h-8v-2h8v2zm-2-6H10V6h4v4z" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            {tags.length < maxTags && (
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleInputKeyPress}
                    placeholder="Type a tag and press Enter"
                    className="form-input mt-2 p-2 "
                />
            )}
        </>
    )
}





const AdPriceInput = () => {
    const dispatch = useAppDispatch();
    const { price } = useAppSelector(state => state.newAd);

    return (
        <div className="col-start gap-3">
            <label className="flex items-center space-x-2 cursor-pointer">
                <div className={`w-5 h-5 rounded-full border-[2px]  ${typeof price == 'number' ? 'border-red-700' : 'border-gray-300'} bg-white transition-colors center`}>
                    {typeof price === 'number' && (
                        <div className="w-3 h-3 rounded-full bg-red-700 transform scale-75"></div>
                    )}
                </div>
                <span>$</span>
                <input type="number" checked={typeof price === 'number'} onChange={(e) => dispatch(setAdPrice(Number(e.target.value)))} className="form-input" placeholder="Enter price" />
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
                <div className={`w-5 h-5 rounded-full border-[2px]  ${price == 'free' ? 'border-red-700' : 'border-gray-300'} bg-white transition-colors center`}>
                    {price === 'free' && (
                        <div className="w-3 h-3 rounded-full bg-red-700 transform scale-75"></div>
                    )}
                </div>
                <span>{'Free'}</span>
                <input type="radio" checked={price === 'free'} onChange={() => dispatch(setAdPrice('free'))} className="hidden" />
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
                <div className={`w-5 h-5 rounded-full border-[2px]  ${price == 'negotiable' ? 'border-red-700' : 'border-gray-300'} bg-white transition-colors center`}>
                    {price === 'negotiable' && (
                        <div className="w-3 h-3 rounded-full bg-red-700 transform scale-75"></div>
                    )}
                </div>
                <span>{'negotiable'}</span>
                <input type="radio" checked={price === 'negotiable'} onChange={() => dispatch(setAdPrice('negotiable'))} className="hidden" />
            </label>
        </div>
    );
};


function ListTitle({ title }: { title: string }) {
    return (
        <ul className="list-disc list-inside text-gray-500 "><li>{title}</li></ul>
    )
}

function SettingsCard({ title, children }: { title: string, children: any }) {
    return (
        <div className="w-full shadow p-5 flex flex-col gap-5 rounded-[10px]">
            <div className="w-full">
                <ListTitle title={title} />
            </div>
            <hr className="w-full border-b border-b-gray-300 border-dashed" />
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}

export default function AdSettings() {
    const newAd = useAppSelector(state => state.newAd);
    const auth = useAppSelector(state => state.auth);
    const { title, condition, description } = newAd
    const dispatch = useAppDispatch();
    const [promoOptions, setPromoOptions] = useState<TPromotionOptions>([]);
    const [submitError, setSubmitError] = useState('');

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ['places']
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setSubmitError('');

        if (!newAd.latitude || !newAd.longitude) {
            setSubmitError('Invalid address. Choose from the available options.');
            return;
        }

        const formData = new FormData();

        // Append other fields to the form data
        formData.append('title', newAd.title);
        formData.append('description', newAd.description);
        formData.append('category', newAd.category?._id as string);
        formData.append('subCategory', newAd.subCategory?._id as string);
        formData.append('video', newAd.video);
        formData.append('condition', newAd.condition);
        formData.append('price', newAd.price as string);
        formData.append('address', newAd.address as string);
        formData.append('latitude', newAd.latitude as string);
        formData.append('longitude', newAd.longitude as string);

        // Append each photo to the form data
        newAd.photos.forEach(photo => {
            formData.append('photos', photo);
        });
        newAd.tags.forEach(tag => {
            formData.append('tags', tag);
        });
        try {
            const res = await axiosInstance.post('/ads/new', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: 'Bearer ' + auth.token
                }
            });
            console.log(res);
            if (res.status === 200) {
                dispatch(setSuccessMsg('Ad created successfully'));
            } else {
                setSubmitError(res.data.message);
            }

        } catch (error) {
            console.log(error);
            dispatch(setErrorMsg('Aww..! Something went wrong.'));
        }
    }

    useEffect(() => {

        async function fetchPromoOptions() {
            try {
                const res = await axiosInstance.get('/promos')

                setPromoOptions(formatPromoOptions(res.data.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchPromoOptions();
    }, [])

    return (
        <div className="w-full md:p-5 lg:p-10 mb-7 flex flex-col justify-start items-center gap-10">
            <SettingsCard title="Add Details">
                <div className="w-full px-5">
                    <div className="w-full col-center md:flex-row md:center gap-4 mb-6">
                        <div className="form-group flex-grow">
                            <label><ListTitle title="Title" /></label>
                            <input type="text" className="form-input" value={title} onChange={(e) => dispatch(setAdTitle(e.target.value))} placeholder="Title" required />
                        </div>
                        <div className="form-group flex-grow">
                            <label><ListTitle title="Condition" /></label>
                            <select value={condition} onChange={e => dispatch(setAdCondition(e.target.value as Condition))} className="form-input" required>
                                <option value={Condition.NEW}>New</option>
                                <option value={Condition.USED}>Used</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group mb-6">
                        <label><ListTitle title="Description" /></label>
                        <textarea rows={5} className="form-input bg-[#F5F5F5]" value={description} onChange={e => dispatch(setAdProperty({ key: 'description', value: e.target.value }))} required></textarea>
                    </div>
                    <div className="form-group">
                        <label><ListTitle title="Tags" /></label>
                        <p className="text-xs text-gray-300">Increase your ad exposure. Enter up to 5 keywords someone could search to find your ad.</p>
                        <TagInput maxTags={5} />
                    </div>
                </div>
            </SettingsCard>

            <SettingsCard title="Photos">
                <div className="w-full col-start gap-5 mb-5">
                    <div className="font-semibold text-base">Use enticing photos to attract interest to your ad.</div>
                    <p className="text-gray-300">
                        Include pictures with different angles and details. You can upload a maximum of 12 photos, that are at least 300px wide or tall (we recommend at least 1000px).
                        <br /><br />
                        Drag and drop to change the order of your pictures.
                    </p>
                    <ImageUploader />
                    <p className="text-gray-300">
                        Supported formats are .jpg, .gif and .png, 5MB max
                    </p>
                </div>
            </SettingsCard>

            <SettingsCard title="Locations">
                {isLoaded ? <Locations isLoaded={isLoaded} /> : <div>loading...</div>}
            </SettingsCard>

            <SettingsCard title="Price">
                <div className="flex justify-center items-start gap-3 py-3">
                    <div className="">Price: </div>
                    <div className="">
                        <AdPriceInput />
                    </div>
                </div>
            </SettingsCard>

            <SettingsCard title="Contact Information">
                <div className="col-start gap-5 px-5 max-w-[400px]">
                    <div className="form-group">
                        <label><ListTitle title="Phone number" /></label>
                        <input type="text" className="form-input" placeholder="Eg: 08123456789" />
                    </div>
                    <div className="form-group">
                        <label><ListTitle title="Email" /></label>
                        <input type="email" className="form-input bg-[#EBEBEB]" placeholder="kingsleyakahibe@gmail.com" />
                    </div>
                </div>
            </SettingsCard>

            <SettingsCard title="Promote your ad">
                <div className="col-center max-w-[400px] mx-auto gap-3">
                    <PromotionOptions promotions={promoOptions} />
                    <button onClick={handleSubmit} className="w-full p-3 my-5 bg-red-700 text-white rounded">Post advert</button>
                    {submitError && <div className="text-xs text-red-500">{submitError}</div>}
                </div>
            </SettingsCard>
        </div>
    )
}