import { compose, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistConfig = {
    key: 'root', 
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer); 

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
