import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AlertState = typeof initialState;

const initialState = {
    successMsg: '',
    errorMsg: ''
};

export const alert = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        reset: () => initialState,
        setSuccessMsg: (state, action: PayloadAction<string>) => {
            state.successMsg = action.payload;
        },
        setErrorMsg: (state, action: PayloadAction<string>) => {
            state.errorMsg = action.payload;
        },
    }
});

export const {
    reset, 
    setErrorMsg, 
    setSuccessMsg
} = alert.actions;

export default alert.reducer;