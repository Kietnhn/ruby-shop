// import cartCheckoutReducer from "@/features/cart-checkout";
// import { configureStore } from "@reduxjs/toolkit";

// export const makeStore = () => {
//     return configureStore({
//         reducer: {
//             cartCheckout: cartCheckoutReducer,
//         },
//     });
// };

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import cartCheckoutReducer from "@/features/cart-checkout-slice";
import searchReducer from "@/features/search-slice";
import productReducer from "@/features/product-slice";
const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: number) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const cartCheckoutPersistConfig = {
    key: "cartCheckout",
    storage: storage,
    whitelist: [
        "shippingInformation",
        "reviews",
        "shippingMethod",
        "paymentMethod",
        "paymentInformation",
    ],
};

const persistedReducer = persistReducer(
    cartCheckoutPersistConfig,
    cartCheckoutReducer
);

const rootReducer = combineReducers({
    cartCheckout: persistedReducer,
    search: searchReducer,
    product: productReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
