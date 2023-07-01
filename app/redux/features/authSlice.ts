import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type AuthState = typeof initialState;

const initialState = {
    _id: '',
    fullname: '',
    email: '',
    emailIsVerified: false,
    role: '',
    token: ''
};

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<AuthState>) => {
            state = action.payload;
        },
        resetAuthState: () => initialState,
    }
})

export const {
    resetAuthState,
    setAuthState
} = auth.actions;

export default auth.reducer;