import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export enum Condition {
    NEW = 'new',
    USED = 'used'
};

export type NewAdState = typeof initialState;

const initialState = {
    currentStep: 1 as 1 | 2 | 3 | number,
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
    setAdProperty
} = advert.actions;

export default advert.reducer