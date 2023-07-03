import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type AuthState = {
    _id: string;
    fullname: string;
    email: string;
    emailIsVerified: boolean;
    role: string;
    token: string;
    isLoggedIn: boolean;
    [key: string]: any;
};

const initialState = {
    _id: '',
    fullname: '',
    email: '',
    emailIsVerified: false,
    role: '',
    token: '',
    isLoggedIn: false,
};

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<AuthState>) => {
            return {...state, ...action.payload};
        },
        setLoginState: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        resetAuthState: () => initialState,
    }
})

export const {
    resetAuthState,
    setAuthState,
    setLoginState,
    setEmail,
} = auth.actions;

export default auth.reducer;