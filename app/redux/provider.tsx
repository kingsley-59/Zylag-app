'use client';

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: any }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor} >
                {children}
            </PersistGate>
        </Provider>
    )
}