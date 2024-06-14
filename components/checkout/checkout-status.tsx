"use client";
import { CheckCircleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button, Link } from "@nextui-org/react";
import React from "react";

const CheckoutStatus = ({ status }: { status: "success" | "failure" }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex-center flex-col">
                <CheckCircleIcon className="w-10 h-10 text-success" />
                <h2 className="text-2xl text-success-500">
                    Thank you for your purchase!
                </h2>
                <p className="text-foreground text-medium">
                    Your order has been successfully processed.
                </p>
                <p className="text-foreground text-medium">
                    We will send you a confirmation email shortly.
                </p>
                <p className="text-foreground text-medium">
                    Thank you for shopping with us!
                </p>
            </div>
            <div className="flex items-center justify-end mt-4">
                <Button
                    color="primary"
                    as={Link}
                    href="/shop"
                    className="w-full"
                >
                    Continue shipping
                    <ChevronRightIcon className="w-4 h-4 mr-2" />
                </Button>
            </div>
        </div>
    );
};

export default CheckoutStatus;
