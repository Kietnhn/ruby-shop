"use client";
import { IOrderDetails, IOrderProduct, ITimeline } from "@/lib/definitions";
import { generateAddress, getPublicIdFromUrl, renderPrice } from "@/lib/utils";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider,
    Image,
    Tooltip,
} from "@nextui-org/react";
import React from "react";
import TimeLine from "./timeline";

const OrderDetails = ({ order }: { order: IOrderDetails }) => {
    const { addressLine, city, country, state, postalCode } =
        order.shippingAddress;
    const timelineData: ITimeline[] = [
        {
            time: order.createdAt,
            title: "Order placed",
            description:
                "Your purchase has been successfully placed, and awaiting confirmation from the shop.",
        },
        {
            time: order.processedAt,
            title: "Order processding",
            description:
                "Great news! The shop has confirmed your order, and awaiting delivery.",
        },
        {
            time: order.shippingAt,
            title: "Shipping",
            description:
                "The package is currently being delivered to the recipient.",
        },
        {
            time: order.paidAt,
            title: "Payment paid",
            description:
                "Your payment has been successfully processed. Thank you for your purchase!",
        },
        {
            time: order.completedAt,
            title: "Order completed",
            description:
                " Congratulations! Your order has been successfully completed.",
        },
    ];
    return (
        <div className="">
            <div className="flex flex-nowrap gap-4">
                <div className="w-3/4 flex flex-col gap-4">
                    <Card className="">
                        <CardHeader className="text-xl font-semibold">
                            Order details
                        </CardHeader>
                        <Divider />

                        <CardBody className="flex flex-col gap-4">
                            <div className="">
                                {order.orderProducts.map((item) => (
                                    <ProductOrder
                                        key={item.id}
                                        orderProduct={item}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-end flex-wrap">
                                <div className="w-3/4 flex justify-end mb-2 items-center">
                                    <p>Subtotal:</p>
                                </div>
                                <div className="w-1/4 flex justify-end mb-2 items-end">
                                    <strong>
                                        {renderPrice(
                                            order.subToTal,
                                            order.priceCurrency
                                        )}
                                    </strong>
                                </div>
                                <div className="w-3/4 flex justify-end mb-2 items-center">
                                    <p>Taxes:</p>
                                </div>
                                <div className="w-1/4 flex justify-end mb-2 items-end">
                                    <strong>{renderPrice(0)}</strong>
                                </div>
                                <div className="w-3/4 flex justify-end mb-2 items-center">
                                    <p>Estimated Delivery & Handling:</p>
                                </div>
                                <div className="w-1/4 flex justify-end mb-2 items-end">
                                    <strong>
                                        {renderPrice(
                                            order.shippingAmount,
                                            order.shippingCurrency
                                        )}
                                    </strong>
                                </div>
                                <div className="w-3/4 flex justify-end mb-2 items-center">
                                    <p>Total:</p>
                                </div>
                                <div className="w-1/4 flex justify-end mb-2 items-end ">
                                    <strong>
                                        {renderPrice(
                                            order.totalPrice,
                                            order.priceCurrency
                                        )}
                                    </strong>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="">
                        <CardHeader className="text-xl font-semibold">
                            Shipping activity
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <TimeLine data={timelineData} />
                        </CardBody>
                    </Card>
                </div>
                <div className="w-1/4  flex flex-col gap-4">
                    <Card>
                        <CardHeader className="text-xl font-semibold">
                            Summary
                        </CardHeader>
                        <Divider />

                        <CardBody className="w-full flex flex-col gap-4">
                            <div className="w-full flex  items-center justify-between ">
                                <h4>Order ID</h4>
                                <strong className="">{order.id}</strong>
                            </div>

                            <div className="w-full flex  items-center justify-between">
                                <h4>Order status</h4>
                                <Chip
                                    className="pointer-events-none capitalize"
                                    color={
                                        order.status === "CREATED"
                                            ? "primary"
                                            : order.status === "COMPLETED"
                                            ? "success"
                                            : order.status === "PROCESSING"
                                            ? "warning"
                                            : "danger"
                                    }
                                >
                                    {order.status.toLowerCase()}
                                </Chip>
                            </div>
                            <div className="w-full flex  items-center justify-between">
                                <h4>Shipping status</h4>
                                <Chip
                                    className="pointer-events-none capitalize"
                                    color={
                                        order.shippingStatus === "PENDING"
                                            ? "default"
                                            : order.shippingStatus ===
                                              "DELIVERING"
                                            ? "warning"
                                            : order.shippingStatus ===
                                              "DELIVERED"
                                            ? "success"
                                            : order.shippingStatus ===
                                              "CANCELLED"
                                            ? "danger"
                                            : "secondary"
                                    }
                                >
                                    {order.shippingStatus.toLowerCase()}
                                </Chip>
                            </div>
                            <div className="w-full flex  items-center justify-between">
                                <h4>Payment status</h4>
                                <Chip
                                    className="pointer-events-none capitalize"
                                    color={
                                        order.paymentStatus === "PAID"
                                            ? "success"
                                            : order.paymentStatus === "PENDING"
                                            ? "warning"
                                            : "danger"
                                    }
                                >
                                    {order.paymentStatus.toLowerCase()}
                                </Chip>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="">
                        <CardHeader className="text-xl font-semibold">
                            Customer details
                        </CardHeader>
                        <Divider />

                        <CardBody className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <strong>Contact info</strong>
                                <p className="pl-2">
                                    <EnvelopeIcon className="w-5 h-5 float-start mr-2" />
                                    {order.user.email}
                                </p>
                                <p className="pl-2">
                                    <PhoneIcon className="w-5 h-5 float-start mr-2" />
                                    {order.user.phoneNumber}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <strong>Shipping address</strong>
                                <p className="pl-2">
                                    {generateAddress(
                                        addressLine,
                                        city,
                                        state,
                                        postalCode,
                                        country
                                    )}
                                </p>
                            </div>
                            {/* <div className="flex justify-between">
                                <strong>Payment method</strong>
                                <p className="capitalize">
                                    {order.paymentMethod.toLowerCase()}
                                </p>
                            </div> */}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

function ProductOrder({ orderProduct }: { orderProduct: IOrderProduct }) {
    const { images, name, color, size } = orderProduct.variation;
    const { gender } = orderProduct.variation.product;
    return (
        <div className="flex items-center gap-2">
            <Image
                src={images[0]}
                alt={getPublicIdFromUrl(images[0])}
                className="w-24 h-24 object-cover rounded-none"
            />
            <div className="flex-1 flex items-center justify-between">
                <div className="w-1/2 flex flex-col">
                    <strong className="font-semibold ">{name}</strong>
                    <div>
                        <small className="mr-2">Gender:</small>
                        <span className="text-foreground-400 capitalize">
                            {gender.toLowerCase()}
                        </span>
                    </div>
                    <div>
                        <small className="mr-2">Color:</small>
                        <span className="text-foreground-400 capitalize">
                            {color}
                        </span>
                    </div>
                    <div>
                        <small className="mr-2">Size:</small>
                        <span className="text-foreground-400 capitalize">
                            {size}
                        </span>
                    </div>
                </div>
                <div className="w-1/6">
                    <strong>
                        {renderPrice(
                            orderProduct.price,
                            orderProduct.priceCurrency
                        )}
                    </strong>
                </div>
                <div className="w-1/6">
                    <strong>{orderProduct.quantity}</strong>
                </div>
                <div className="w-1/6 justify-end">
                    <strong>
                        {renderPrice(
                            orderProduct.subTotal,
                            orderProduct.priceCurrency
                        )}
                    </strong>
                </div>
            </div>
        </div>
    );
}
export default OrderDetails;
