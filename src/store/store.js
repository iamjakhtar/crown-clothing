import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { configureStore } from '@reduxjs/toolkit';
const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWares)
})

// import { compose, applyMiddleware, createStore } from "redux";
// import logger from "redux-logger";
// import { rootReducer } from "./root-reducer";
// import persistStore from "redux-persist/es/persistStore";
// import persistReducer from "redux-persist/es/persistReducer";
// import storage from "redux-persist/lib/storage"
// import { thunk } from "redux-thunk";

// const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean);

// const enhancedComposer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const composedEnhancers = enhancedComposer(applyMiddleware(...middleWares));

// const persistConfig = {
//     key: 'root', 
//     storage,
//     whitelist: ['cart']
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer); 

// export const store = createStore(persistedReducer, undefined, composedEnhancers);

// export const persistor = persistStore(store);
