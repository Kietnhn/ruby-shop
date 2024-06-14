import {
    CHECKOUT_INFORMATION_ROUTE,
    CHECKOUT_SHIPPING_ROUTE,
    DEFAULT_LOCALE,
} from "@/lib/constants";
import {
    IAvailableShippingMethod,
    IShippingInformation,
    TReview,
} from "@/lib/definitions";
import { generateAddress } from "@/lib/utils";
import { PaymentMethods } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface IPaymentInformation {
    name: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
}
export interface ICartCheckout {
    shippingInformation: IShippingInformation | null;
    shippingMethod: IAvailableShippingMethod | null;
    paymentMethod: PaymentMethods | null;
    reviews: TReview[];
    paymentInformation?: IPaymentInformation;
}
const initialState: ICartCheckout = {
    shippingInformation: null,
    shippingMethod: null,
    reviews: [],
    paymentMethod: null,
    paymentInformation: undefined,
};
const cartCheckoutSlice = createSlice({
    name: "cartCheckout",
    initialState,
    reducers: {
        setShippingInformation: (
            state,
            action: PayloadAction<IShippingInformation>
        ) => {
            state.shippingInformation = action.payload;
            const newReviews = [
                {
                    title: "Contact",
                    value: action.payload.email,
                    href: `cart/checkout/${CHECKOUT_INFORMATION_ROUTE}`,
                },
                {
                    title: "Ship to",
                    value: generateAddress(
                        action.payload.addressLine,
                        action.payload.city,
                        action.payload.state,
                        action.payload.postalCode,
                        action.payload.country
                    ),
                    href: `cart/checkout/${CHECKOUT_INFORMATION_ROUTE}`,
                },
            ];
            state.reviews = newReviews;
        },
        setShippingMethod: (
            state,
            action: PayloadAction<IAvailableShippingMethod>
        ) => {
            state.shippingMethod = action.payload;
        },
        setPaymentMethod: (
            state,
            action: PayloadAction<PaymentMethods | null>
        ) => {
            state.paymentMethod = action.payload;
        },
        addReview: (state, action: PayloadAction<TReview>) => {
            const reviews = [...state.reviews];
            const exitedIndex = reviews.findIndex(
                (review) => review.title === action.payload.title
            );
            if (exitedIndex >= 0) {
                reviews[exitedIndex] = action.payload;
                state.reviews = reviews;
                return;
            } else {
                state.reviews = [...state.reviews, action.payload];
            }
        },
        resetCheckoutState: (state) => {
            (state.paymentInformation = undefined),
                (state.paymentMethod = null),
                (state.reviews = []),
                (state.shippingMethod = null);
            state.shippingInformation = null;
        },
    },
});

export const {
    setShippingInformation,
    setShippingMethod,
    addReview,
    setPaymentMethod,
    resetCheckoutState,
} = cartCheckoutSlice.actions;
export default cartCheckoutSlice.reducer;
