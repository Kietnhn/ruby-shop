"use client";

import {
    CartCheckout as CartCheckoutType,
    UserNoPassword,
} from "@/lib/definitions";
import React from "react";
import Logo from "@/components/logo";

import ShippingInformationForm from "./shipping-information-form";
import {
    CHECKOUT_INFORMATION_ROUTE,
    CHECKOUT_ROUTES,
    CHECKOUT_SHIPPING_ROUTE,
} from "@/lib/constants";
import { ScrollArea } from "../ui/scroll-area";
import ShippingMethodForm from "./shipping-method-form";
import CartCheckout from "./cart-checkout";
import { useAppSelector } from "@/lib/store";
import ShippingPaymentForm from "./shipping-payment-form";
import CheckoutBreadcrumds from "./checkout-breadcrumbs";

export default function Checkout({
    carts,
    user,
    checkoutRoute,
}: {
    carts: CartCheckoutType[];
    checkoutRoute: keyof typeof CHECKOUT_ROUTES;
    user: UserNoPassword;
}) {
    if (carts.length === 0) return <div>There are no items in your bag.</div>;
    const { shippingInformation, shippingMethod } = useAppSelector(
        (store) => store.cartCheckout
    );
    console.log({ shippingMethod, shippingInformation });

    return (
        <div className="flex relative h-screen overflow-hidden p-12 pb-0">
            <ScrollArea className="w-3/5 px-12 pb-12 overflow-hidden">
                <div className="w-full flex flex-col gap-4 ">
                    <div>
                        <div>
                            <Logo />
                        </div>
                        <p className="font-bold text-inherit ml-2">Ruby</p>
                    </div>
                    <CheckoutBreadcrumds />

                    {checkoutRoute === CHECKOUT_INFORMATION_ROUTE ? (
                        <ShippingInformationForm user={user} />
                    ) : checkoutRoute === CHECKOUT_SHIPPING_ROUTE ? (
                        <ShippingMethodForm />
                    ) : (
                        <ShippingPaymentForm />
                    )}
                </div>
                {/* {checkoutProcessRoutes[checkoutRoute]} */}
            </ScrollArea>
            <CartCheckout carts={carts} />
        </div>
    );
}
