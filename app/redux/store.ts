import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import alertReducer from './features/alertSlice';


export const store = configureStore({
    reducer: {
        counterReducer,
        alertReducer,
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;