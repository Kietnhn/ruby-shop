"use client";
import {
    AVAILABLE_SHIPPING_METHODS,
    CHECKOUT_INFORMATION_ROUTE,
    CHECKOUT_PAYMENT_ROUTE,
    CHECKOUT_SHIPPING_ROUTE,
    DEFAULT_LOCALE,
} from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { toCapitalize, generateAddress, renderPrice } from "@/lib/utils";
import { Button, Divider, Link, RadioGroup } from "@nextui-org/react";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { ChevronLeftIcon } from "lucide-react";
import { CustomRadio } from "../ui/radio/custom-radio";
import { addReview, setShippingMethod } from "@/features/cart-checkout-slice";
import Reviews from "./reviews";

const ShippingMethodForm = () => {
    const { shippingInformation, shippingMethod } = useAppSelector(
        (store) => store.cartCheckout
    );
    const dispatch = useAppDispatch();
    const router = useRouter();

    if (!shippingInformation) {
        redirect(`/cart/checkout/${CHECKOUT_INFORMATION_ROUTE}`);
    }

    const handleSelectShippingMethod = (value: string) => {
        const selectedMethod = AVAILABLE_SHIPPING_METHODS.find(
            (method) => method.method === value
        );
        if (!selectedMethod) return;
        dispatch(setShippingMethod(selectedMethod));
    };
    const handleToPayment = () => {
        if (!shippingMethod) return;

        const price = renderPrice(
            shippingMethod.value,
            shippingMethod.currency
        );
        const value = `${toCapitalize(shippingMethod.method)} -  ${price}`;
        dispatch(
            addReview({
                href: `/cart/checkout/${CHECKOUT_SHIPPING_ROUTE}`,
                title: "Shipping method",
                value: value,
            })
        );
        router.push(`/cart/checkout/${CHECKOUT_PAYMENT_ROUTE}`);
    };
    return (
        <div className="flex flex-col gap-4">
            <Reviews />
            <div className="">
                <RadioGroup
                    label="Shipping method"
                    classNames={{
                        label: "text-2xl font-semibold",
                        base: "w-full",
                    }}
                    onValueChange={handleSelectShippingMethod}
                >
                    {AVAILABLE_SHIPPING_METHODS.map((item) => (
                        <CustomRadio
                            description={item.description}
                            value={item.method}
                            textValue={renderPrice(item.value, item.currency)}
                        >
                            {item.method.toLocaleLowerCase()}
                        </CustomRadio>
                    ))}
                </RadioGroup>
            </div>
            <div className="flex items-center justify-between mt-4">
                <Link
                    href={`/cart/checkout/${CHECKOUT_INFORMATION_ROUTE}`}
                    className="hover:opacity-70 text-primary"
                >
                    <ChevronLeftIcon className="w-4 h-4 mr-2" /> Return to
                    information
                </Link>
                <Button
                    color="primary"
                    className="rounded-md"
                    size="lg"
                    isDisabled={!shippingMethod}
                    onClick={handleToPayment}
                >
                    Continue to payment
                </Button>
            </div>
        </div>
    );
};

export default ShippingMethodForm;
