"use client";
import React, { useEffect, useState } from "react";
import {
    Button,
    Checkbox,
    CircularProgress,
    Input,
    Link,
    Modal,
    ModalContent,
    RadioGroup,
} from "@nextui-org/react";
import {
    BanknotesIcon,
    ChevronLeftIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

import {
    CHECKOUT_PAYMENT_ROUTE,
    CHECKOUT_REVIEWS_ROUTE,
    CHECKOUT_SHIPPING_ROUTE,
} from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { CollapseRadio } from "../ui/radio/collapse-radio";
import { Card } from "../ui/card";
import { PaymentMethods } from "@prisma/client";
import {
    addReview,
    resetCheckoutState,
    setPaymentMethod,
} from "@/features/cart-checkout-slice";
import { redirect, useRouter } from "next/navigation";
import Reviews from "./reviews";
import toCapitalize from "@/lib/utils";
import { createOrder } from "@/lib/actions";
import { toast } from "react-toastify";
const ShippingPaymentForm = () => {
    const { paymentMethod, shippingMethod, shippingInformation } =
        useAppSelector((store) => store.cartCheckout);
    const [isConfirm, setIsConfirm] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const unsupportedMethods: PaymentMethods[] = ["BANK_TRANSFER", "PAYPAL"];

    const dispatch = useAppDispatch();
    const handleSelectPaymentMethod = (value: string) => {
        if (unsupportedMethods.includes(value as PaymentMethods)) {
            dispatch(setPaymentMethod(null));
            return;
        }
        dispatch(setPaymentMethod(value as PaymentMethods));
    };
    const handleSubmit = async () => {
        if (!paymentMethod || !shippingInformation || !shippingMethod) return;

        if (paymentMethod !== "COD") {
            setLoading(true);
            // fake payment
            const paymentDuration = 1500;
            await new Promise((resolve) =>
                setTimeout(resolve, paymentDuration)
            );
            setLoading(false);
        }

        // create order
        await toast.promise(
            createOrder({
                paymentMethod: paymentMethod,
                shippingInformation: shippingInformation,
                shippingMethod: shippingMethod,
            }),
            {
                pending: "Creating order...",
                error: "Error at creating order",
                success: "Order created successfully",
            }
        );

        // reset all checkout state
        dispatch(resetCheckoutState());

        // const newStingPaymentMethod = toCapitalize(
        //     paymentMethod.split("_").join(" ")
        // );
        // dispatch(
        //     addReview({
        //         href: `/cart/checkout/${CHECKOUT_PAYMENT_ROUTE}`,
        //         title: "Payment method",
        //         value: newStingPaymentMethod,
        //     })
        // );
    };
    useEffect(() => {
        // access the payment method
        if (shippingInformation && !shippingMethod) {
            redirect(`/cart/checkout/${CHECKOUT_SHIPPING_ROUTE}`);
        }
        if (!shippingInformation && !shippingMethod && !paymentMethod) {
            redirect("/shop");
        }
    }, [shippingMethod, shippingInformation]);
    return (
        <div className="flex flex-col gap-4">
            <Reviews />
            <div>
                <h3 className="font-semibold text-2xl">Payment</h3>
                <span className="text-medium text-default">
                    All transactions are secure and encrypted.
                </span>
            </div>

            <RadioGroup
                aria-label="radio-collapse"
                // defaultValue={"CREDIT_CARD"}
                onValueChange={handleSelectPaymentMethod}
            >
                <CollapseRadio title="Credit card" value={"CREDIT_CARD"}>
                    <div className="flex flex-col gap-4">
                        <div className="w-full ">
                            <Input
                                name="name"
                                label="Name on card"
                                variant="bordered"
                                placeholder="Type name on card"
                            />
                        </div>
                        <div className="w-full ">
                            <Input
                                name="cardNumber"
                                label="Card Number"
                                variant="bordered"
                                placeholder="XXXX XXXX XXXX XXXX"
                            />
                        </div>
                        <div className="flex flex-nowrap gap-4">
                            <div className="w-1/2 ">
                                <Input
                                    name="expirationDate"
                                    label="Expiration Date"
                                    variant="bordered"
                                    placeholder="mm/yy"
                                />
                            </div>
                            <div className="w-1/2 ">
                                <Input
                                    name="cvv"
                                    label="CVV"
                                    variant="bordered"
                                    placeholder="***"
                                />
                            </div>
                        </div>
                    </div>
                </CollapseRadio>
                <CollapseRadio title="Paypal" value={"PAYPAL"}>
                    <UnSupportedPaythodMethod />
                </CollapseRadio>
                <CollapseRadio title="Bank transfer" value={"BANK_TRANSFER"}>
                    <UnSupportedPaythodMethod />
                </CollapseRadio>
                <CollapseRadio
                    title="COD"
                    value={"COD"}
                    description="(cash on delivery)"
                >
                    <ExclamationCircleIcon className="w-5 h-5 float-start mr-2" />
                    <p>
                        We kindly remind you that choosing Cash on Delivery
                        means you'll pay in cash upon delivery of your order.
                        Please ensure to have the exact amount ready for the
                        delivery person. Thank you for your cooperation
                    </p>
                </CollapseRadio>
            </RadioGroup>
            <Checkbox isSelected={isConfirm} onValueChange={setIsConfirm}>
                I accept the terms and conditions of payment
            </Checkbox>
            <div className="flex items-center justify-between">
                <Link
                    href={`/cart/checkout/${CHECKOUT_SHIPPING_ROUTE}`}
                    className="hover:opacity-70 text-primary"
                >
                    <ChevronLeftIcon className="w-4 h-4 mr-2" /> Return to
                    shipping
                </Link>
                <Button
                    color="primary"
                    size="lg"
                    className="rounded-md"
                    onClick={handleSubmit}
                    isDisabled={!paymentMethod || !isConfirm}
                >
                    {paymentMethod === "COD" ? "Done" : "Pay now"}
                </Button>
            </div>
            <Modal isOpen={loading} hideCloseButton isDismissable={false}>
                <ModalContent className="w-[unset] overflow-hidden shadow-none border-none bg-transparent">
                    <div>
                        <CircularProgress aria-label="Loading..." />
                    </div>
                </ModalContent>
            </Modal>
        </div>
    );
};
function UnSupportedPaythodMethod() {
    return (
        <Card className="relative w-full flex-center ">
            <div className="flex-center flex-col ">
                <BanknotesIcon className="w-16 h-14  " />

                <p>This store can’t accept payments right now.</p>
            </div>
        </Card>
    );
}
export default ShippingPaymentForm;
