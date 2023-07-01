import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AlertState = typeof initialState;

const initialState = {
    successMsg: '',
    errorMsg: '',
    timer: 5
};

export const alert = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        reset: () => initialState,
        setSuccessMsg: (state, action: PayloadAction<string | { text: string, timer: number }>) => {
            if (typeof action.payload === 'string') {
                state.successMsg = action.payload;
            } else {
                state.successMsg = action.payload.text;
                state.timer = action.payload.timer;
            }
        },
        setErrorMsg: (state, action: PayloadAction<string | { text: string, timer: number }>) => {
            if (typeof action.payload === 'string') {
                state.errorMsg = action.payload;
            } else {
                state.errorMsg = action.payload.text;
                state.timer = action.payload.timer;
            }
        },
    }
});

export const {
    reset,
    setErrorMsg,
    setSuccessMsg
} = alert.actions;

export default alert.reducer;