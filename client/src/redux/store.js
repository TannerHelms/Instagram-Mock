import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { getPersistConfig } from 'redux-deep-persist';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import navbarReducer from './navbar_slice';
import tokenReducer from './token_slice';
const rootReducer = combineReducers({
    navbar: navbarReducer,
    token: tokenReducer,
})

const persistConfig = getPersistConfig({
    key: 'root',
    storage,
    whitelist: ['token'],
    rootReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);

