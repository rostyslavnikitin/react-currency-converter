import { createStore } from "redux";
import { SET_BASE_CURRENCY, ADD_FAVORITE_CURRENCY } from "./actions/converter";

function reducer(state, action) {
    switch(action.type) {
        case SET_BASE_CURRENCY: return { baseCurrency: action.id };
        case ADD_FAVORITE_CURRENCY: return { favoriteCurrencies:  [...state.favoriteCurrencies,  action.value] };

        default: return state;
    }
}
const initialState = { baseCurrency: 'UAH', favoriteCurrencies: [] };
const store = createStore(reducer, initialState);

export default store;