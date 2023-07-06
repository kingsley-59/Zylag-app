import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import counter from './features/counterSlice';
import alert from './features/alertSlice';
import newAd from './features/newAdSlice';
import auth from './features/authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const newAdReducer = persistReducer({
    storage, key: 'newAd', blacklist: ['photos']
}, newAd)

const combinedReducer = combineReducers({
    counter, 
    alert,
    newAd: newAdReducer,
    auth
});
const persistedReducer = persistReducer({
    key: 'root',
    storage,
    whitelist: ['auth']
}, combinedReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;