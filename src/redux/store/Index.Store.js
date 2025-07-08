import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import { RootReducers } from '../reducers/Root.Reducers';
import { storage } from '../storage/Index.Storage';

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['error', 'status', 'searchRides', 'publishRides','rides'],
};
const persistedReducer = persistReducer(persistConfig, RootReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);