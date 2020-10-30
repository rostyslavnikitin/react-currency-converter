import { createStore } from "redux";
import { SET_BASE_CURRENCY, TOGGLE_FAVORITE_CURRENCY } from "./actions/converter";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
};

function reducer(state, action) {
    switch(action.type) {
        case SET_BASE_CURRENCY: return {...state, baseCurrency: action.code };
        case TOGGLE_FAVORITE_CURRENCY: return {...state, favoriteCurrencies:  [action.code, ...state.favoriteCurrencies]};

        default: return state;
    }
}
const initialState = { baseCurrency: 'UAH', favoriteCurrencies: [] };
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, initialState);
export const persistor = persistStore(store);
