

type TCategory = { 
    _id: string, 
    name: string,
    parent?: string, 
    level: number 
}

type TAds = {
    _id: string;
    title: string;
    description?: string;
    category: TCategory;
    subCategory: TCategory;
    condition: 'new' | 'used';
    tags: string[];
    photos: File[] | string[];
    video: string;
    price: number | 'free' | 'negotiable';
    discountPrice?: number;
    phoneNumber: string;
    address: string;
    latitude: number | string;
    longitude: number | string;

    adType?: 'forsale' | 'tobuy';
    entity?: 'owner' | 'business';
    views?: number;
    createdBy?: string;
    createdAt: string;
    updatedAt: string;
    isNew?: boolean; 
    // [key: string]: any;
}