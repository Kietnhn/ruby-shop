"use client";
import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useAppSelector } from "@/lib/store";
import {
    CHECKOUT_INFORMATION_ROUTE,
    CHECKOUT_PAYMENT_ROUTE,
    CHECKOUT_SHIPPING_ROUTE,
} from "@/lib/constants";
const CheckoutBreadcrumds = () => {
    const { shippingInformation, shippingMethod, paymentMethod } =
        useAppSelector((store) => store.cartCheckout);
    const pathname = usePathname();

    return (
        <Breadcrumbs
            underline="hover"
            classNames={{
                list: "bg-transparent ",
            }}
            itemClasses={{
                item: "text-foreground data-[current=true]:font-semibold font-normal",
                // separator: "text-white/40",
            }}
            variant="solid"
        >
            <BreadcrumbItem href="/cart">
                <ShoppingCartIcon className="w-5 h-5" />
            </BreadcrumbItem>
            <BreadcrumbItem
                href={`/cart/checkout/${CHECKOUT_INFORMATION_ROUTE}`}
                isCurrent={
                    pathname === `/cart/checkout/${CHECKOUT_INFORMATION_ROUTE}`
                }
            >
                Information
            </BreadcrumbItem>
            <BreadcrumbItem
                href={`/cart/checkout/${CHECKOUT_SHIPPING_ROUTE}`}
                isDisabled={!shippingInformation}
                isCurrent={
                    pathname === `/cart/checkout/${CHECKOUT_SHIPPING_ROUTE}`
                }
            >
                Shipping
            </BreadcrumbItem>
            <BreadcrumbItem
                href={`/cart/checkout/${CHECKOUT_PAYMENT_ROUTE}`}
                isDisabled={!shippingMethod}
                isCurrent={
                    pathname === `/cart/checkout/${CHECKOUT_PAYMENT_ROUTE}`
                }
            >
                Payment
            </BreadcrumbItem>
            {/* <BreadcrumbItem
        href={`/cart/checkout/${CHECKOUT_REVIEWS_ROUTE}`}
        isDisabled={!paymentMethod}
        isCurrent={
            pathname ===
            `/cart/checkout/${CHECKOUT_REVIEWS_ROUTE}`
        }
    >
        Reviews
    </BreadcrumbItem> */}
        </Breadcrumbs>
    );
};

export default CheckoutBreadcrumds;
