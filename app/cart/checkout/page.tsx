"use client";
import { CircularProgress, Modal, ModalContent } from "@nextui-org/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const CheckoutPage = () => {
    useEffect(() => {
        redirect("/cart/checkout/information");
    });
    return (
        <Modal isOpen={true} hideCloseButton isDismissable={false}>
            <ModalContent className="w-[unset] overflow-hidden shadow-none border-none bg-transparent">
                <div>
                    <CircularProgress aria-label="Loading..." size="lg" />
                </div>
            </ModalContent>
        </Modal>
    );
};

export default CheckoutPage;
