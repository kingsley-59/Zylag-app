
import { updateAdPhotos } from "@/app/redux/features/newAdSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { ChangeEvent, ChangeEventHandler, DragEvent, FC, FormEvent, useEffect, useState } from "react";




export default function ImageUploader() {
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
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const validFiles = files.filter(
                (file) => file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/webp'
            );

            setSelectedImages((prevImages) => [...prevImages, ...validFiles]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    useEffect(() => {
        dispatch(updateAdPhotos(selectedImages));
    }, [selectedImages])

    return (
        <div className="w-full grid grid-flow-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" onDrop={e => handleDrop(e)} onDragOver={(e) => e.preventDefault()}>
            <label htmlFor="ad-photos"
                className="bg-red-200 bg-opacity-40 rounded-xl w-[140px] aspect-square center"
            >
                +
            </label>
            <input type="file" id="ad-photos" className="hidden" accept=".jpeg, .jpg, .gif, .png, .webp" multiple onChange={handleFileInputChange} />
            {selectedImages.map((image, index) => (
                <div key={index} className="relative w-[140px] aspect-square">
                    <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className="w-full h-full object-center object-cover" />
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