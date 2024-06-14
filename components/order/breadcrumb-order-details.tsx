"use client";
import React from "react";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

const BreadcrumbOrderDetails = ({ orderId }: { orderId: string }) => {
    return (
        <Breadcrumbs>
            <BreadcrumbItem href="/orders">Orders</BreadcrumbItem>
            <BreadcrumbItem href={`/orders/${orderId}`}>
                Order details
            </BreadcrumbItem>
        </Breadcrumbs>
    );
};

export default BreadcrumbOrderDetails;
