
import { Condition, setAdPrice, setAdPromoCategory, setAdPromoOption } from "@/app/redux/features/newAdSlice"
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { ChangeEvent, ChangeEventHandler, DragEvent, FC, useState } from "react";


interface TagInputProps {
    maxTags: number;
}

const TagInput: FC<TagInputProps> = ({ maxTags }) => {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            if (tags.length < maxTags) {
                setTags([...tags, inputValue]);
                setInputValue('');
            }
        }
    };

    const handleTagRemove = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    return (
        <>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <div
                        key={tag}
                        className="flex items-center px-3 py-1 bg-red-500 text-white rounded-full"
                    >
                        <span>{tag}</span>
                        <button
                            onClick={() => handleTagRemove(tag)}
                            className="ml-2 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 text-white fill-current"
                                viewBox="0 0 24 24"
                            >
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

const PromotionOptions = () => {
    const { promoCategory, promoOption } = useAppSelector(state => state.newAd);
    const dispatch = useAppDispatch();

    const promotions = [
        {
            category: 'Standard',
            options: []
        },
        {
            category: 'Starter',
            options: [
                { duration: '7 days', price: 3000 },
                { duration: '1 month', price: 6000 }
            ]
        },
        {
            category: 'Premium',
            options: [
                { duration: '3 months', price: 15000 }
            ]
        },
    ]

    return (
        <>
            <p className="text-center text-gray-300 text-xs">Please choose one of the following options to post your ad</p>
            {promotions.map(({ category, options }, idx) => (
                <div key={idx}
                    className={`w-full border rounded-lg cursor-pointer ${category === promoCategory ? 'border-red-700 text-red-700' : ''}`}
                    onClick={() => {
                        if (promoCategory !== category) dispatch(setAdPromoOption({}))
                        dispatch(setAdPromoCategory(category))
                    }}
                >
                    <div className="w-full between p-3">
                        <span className="font-semibold">{category}</span>
                        {(options.length < 1) && <span className="text-gray-400">Free</span>}
                    </div>
                    <div className="between gap-3 px-3 py-2">
                        {(options.length >= 1) && <div className="start gap-3">
                            {options?.map(({ duration, price }, idx) => (
                                <span key={idx}
                                    onClick={() => dispatch(setAdPromoOption({ duration, price }))}
                                    className={`rounded-full px-2 py-1 border border-gray-300 ${(promoOption?.duration == duration && promoCategory == category) ? 'bg-red-200' : ''}`}
                                >{duration}</span>
                            ))}
                        </div>}
                        <span className={`${(options.length < 1) ? 'hidden' : ''}`}>{`NGN${category === promoCategory ? (promoOption?.price || 0) : 0}`}</span>
                    </div>
                </div>
            ))}
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


const ImageUploader = () => {
    const dispatch = useAppDispatch();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        const validFiles = files.filter(
            (file) => file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png'
        );

        setSelectedImages((prevImages) => [...prevImages, ...validFiles]);
    };

    const handleFileInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(
            (file) => file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png'
        );

        setSelectedImages((prevImages) => [...prevImages, ...validFiles]);
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleUpload = () => {
        // Dispatch the action to add images to the store
        // dispatch(addImage(selectedImages));
    };

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" onDrop={e => handleDrop(e)} onDragOver={(e) => e.preventDefault()}>
            <label htmlFor="ad-photos"
                className="bg-red-200 bg-opacity-40 rounded-xl w-[140px] aspect-square center"
            >
                +
            </label>
            <input type="file" id="ad-photos" className="hidden" accept=".jpg, .gif, .png" multiple
                onChange={handleFileInputChange}
            />
            {selectedImages.map((image, index) => (
                <div key={index} className="relative aspect-square">
                    <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className="w-full h-auto" />
                    <button
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={() => handleRemoveImage(index)}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.6571 12.6274L7.00023 6.97058M7.00023 6.97058L1.34338 1.31373M7.00023 6.97058L12.6571 1.31373M7.00023 6.97058L1.34338 12.6274" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                    </button>
                </div>
            ))}
            {/* <button
                className="col-span-2 bg-blue-500 text-white rounded-md p-2"
                onClick={handleUpload}
                disabled={selectedImages.length === 0}
            >
                Upload
            </button> */}
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

    return (
        <div className="w-full p-5 lg:p-10 mb-7 flex flex-col justify-start items-center gap-10">
            <SettingsCard title="Add Details">
                <div className="w-full px-5">
                    <div className="w-full center gap-4 mb-6">
                        <div className="form-group flex-grow">
                            <label><ListTitle title="Title" /></label>
                            <input type="text" className="form-input" placeholder="Title" />
                        </div>
                        <div className="form-group flex-grow">
                            <label><ListTitle title="Title" /></label>
                            <select className="form-input">
                                <option value={Condition.NEW}>New</option>
                                <option value={Condition.USED}>Used</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group mb-6">
                        <label><ListTitle title="Description" /></label>
                        <textarea rows={5} className="form-input"></textarea>
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

            <SettingsCard title="Price">
                <div className="center gap-3 py-3">
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
                        <input type="email" className="form-input" placeholder="kingsleyakahibe@gmail.com" />
                    </div>
                </div>
            </SettingsCard>

            <SettingsCard title="Promote your ad">
                <div className="col-center max-w-[400px] mx-auto gap-3">
                    <PromotionOptions />
                </div>
            </SettingsCard>
        </div>
    )
}
