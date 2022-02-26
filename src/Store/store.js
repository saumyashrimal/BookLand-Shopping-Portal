import {applyMiddleware, createStore} from 'redux';
import {persistStore} from "redux-persist";
import {composedWithDevTools} from 'redux-devtools-extension';
import mainReducer from './combinedReds';
import thunk from 'redux-thunk';

export const store = createStore(
    mainReducer,
    applyMiddleware(thunk)
    );

export const persistor = persistStore(store);

export default {store,persistor};