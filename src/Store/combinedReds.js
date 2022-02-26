import {combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import booksReducer from './booksReducer';
import reviewReducer from './reviewsReducer';
import homeReducer from './homeReducer';
import componentStateReducer from './componentStateReducer';
import SellerReducer from './SellerReducer';
import AdminReducer from "./AdminReducer";

//defining new persist config
const persistConfig = {
    key:'root',
    storage,
    whitelist: ['bookState','componentState','reviewState','homeContentState','sellerState' , 'adminState']
}

const mainReducer = combineReducers({
    bookState:booksReducer,
    reviewState:reviewReducer,
    componentState:componentStateReducer,
    homeContentState:homeReducer,
    sellerState:SellerReducer,
    adminState:AdminReducer
});

export default persistReducer(persistConfig , mainReducer);