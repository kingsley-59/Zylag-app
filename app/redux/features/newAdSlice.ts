import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export enum Condition {
    NEW = 'new',
    USED = 'used'
};

export type NewAdState = typeof initialState;

export type Category = {
    _id: string,
    name: string,
    level?: number,
    parent?: string,
    subCategories?: Category[];
} | null

const initialState = {
    currentStep: 1 as 1 | 2 | 3 | number,
    title: '',
    description: '',
    category: null as Category,
    subCategory: null as Category,
    condition: Condition.NEW,
    tags: [] as string[],
    photos: [] as File[],
    video: '',
    price: 0 as number | 'free' | 'negotiable',
    phoneNumber: '',
    address: '',
    latitude: '' as number | string,
    longitude: '' as number | string,
    promoCategory: '' as string,
    promoOption: {} as {category?: string, duration?: number, price?: number, _id?: string}
};

export const advert = createSlice({
    name: 'newAd',
    initialState,
    reducers: {
        reset: () => initialState,
        updateCurrentStep: (state, action: PayloadAction<1 | 2 | 3>) => {
            state.currentStep = action.payload;
        },
        prev: (state) => {
            if (state.currentStep > 1) {
                state.currentStep = state.currentStep - 1;
            }
        },
        setAdTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setAdCondition: (state, action) => {
            state.condition = action.payload;
        },
        setAdDescription: (state, action) => {
            state.description = action.payload;
        },
        updateAdPhotos: (state, action: PayloadAction<File[]>) => {
            state.photos = [...state.photos, ...action.payload];
        },
        setAdCategory: (state, action: PayloadAction<Category>) => {
            state.category = action.payload;
        },
        setAdSubcategory: (state, action: PayloadAction<Category>) => {
            state.subCategory = action.payload;
        },
        setAdPrice: (state, action: PayloadAction<number | 'free' | 'negotiable'>) => {
            state.price = action.payload;
        },
        setAdPromoCategory: (state, action: PayloadAction<string>) => {
            state.promoCategory = action.payload;
        },
        setAdPromoOption: (state, action: PayloadAction<any>) => {
            state.promoOption = action.payload;
        },
        resetPromoOption: (state, action) => {
            state.promoOption = {}
        },
        setAdProperty: <K extends keyof typeof initialState>(state: typeof initialState, action: PayloadAction<{key: K; value: typeof initialState[K]}>) => {
            const { key, value } = action.payload;
            state[key] = value;
        }
    }
});

export const {
    reset, updateCurrentStep, prev, resetPromoOption,
    setAdTitle, setAdCategory, setAdSubcategory, setAdPrice,
    setAdPromoCategory, setAdPromoOption, setAdCondition,
    setAdProperty, updateAdPhotos,
} = advert.actions;

export default advert.reducer