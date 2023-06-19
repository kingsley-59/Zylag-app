import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export enum Condition {
    NEW = 'new',
    USED = 'used'
};

export type NewAdState = typeof initialState;

const initialState = {
    currentStep: 1 as 1 | 2 | 3,
    title: '',
    description: '',
    category: '',
    subCategory: '',
    condition: Condition.NEW,
    tags: [] as string[],
    photos: [] as string[],
    price: 0 as number | 'free' | 'negotiable',
    phoneNumber: '',
    promoCategory: '' as number | string,
    promoOption: {} as {duration?: number | string, price?: number}
};

export const advert = createSlice({
    name: 'newAd',
    initialState,
    reducers: {
        reset: () => initialState,
        updateCurrentStep: (state, action: PayloadAction<1 | 2 | 3>) => {
            state.currentStep = action.payload;
        },
        setAdTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setAdCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setAdSubcategory: (state, action: PayloadAction<string>) => {
            state.subCategory = action.payload;
        },
        setAdPrice: (state, action: PayloadAction<number | 'free' | 'negotiable'>) => {
            state.price = action.payload;
        },
        setAdPromoCategory: (state, action: PayloadAction<number | string>) => {
            state.promoCategory = action.payload;
        },
        setAdPromoOption: (state, action: PayloadAction<any>) => {
            state.promoOption = action.payload;
        },
        resetPromoOption: (state, action) => {
            state.promoOption = {}
        }
    }
});

export const {
    reset, updateCurrentStep,
    setAdTitle, setAdCategory, setAdSubcategory, setAdPrice,
    setAdPromoCategory, setAdPromoOption
} = advert.actions;

export default advert.reducer