"use server";
import prisma from "@/lib/prisma";
import {
    IAvailableShippingMethod,
    IOrderDetails,
    IShippingInformation,
} from "../definitions";
import { Order, PaymentMethods, PaymentStatus } from "@prisma/client";
import { protectedAction } from "./user";

// orders
export async function getOrders(): Promise<Order[]> {
    const user = await protectedAction();
    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return orders;
    } catch (error) {
        throw new Error("Error getting orders" + error);
    }
}
export async function getOrderById(
    orderId: string
): Promise<IOrderDetails | null> {
    await protectedAction();
    if (!orderId) throw new Error("Missing order id in get order details");
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
            include: {
                user: true,
                orderProducts: {
                    include: {
                        variation: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
                shippingAddress: true,
            },
        });
        return order as IOrderDetails;
    } catch (error) {
        throw new Error("Error getting orders" + error);
    }
}
export async function createOrder({
    paymentMethod,
    shippingInformation,
    shippingMethod,
}: {
    shippingInformation: IShippingInformation;
    shippingMethod: IAvailableShippingMethod;
    paymentMethod: PaymentMethods;
}) {
    const user = await protectedAction();
    if (!paymentMethod || !shippingInformation || !shippingMethod) {
        throw new Error("Missing arguments to create new order");
    }
    try {
        const {
            addressLine,
            country,
            firstName,
            phoneNumber,
            postalCode,
            city,
            lastname,
            state,
        } = shippingInformation;
        let { shippingAddressId } = shippingInformation;
        const carts = await prisma.cart.findMany();
        const paymentStatus: PaymentStatus =
            paymentMethod === "COD" ? "PENDING" : "PAID";
        const totalProductsInCart = carts.reduce(
            (total, current) => total + current.quantity,
            0
        );
        const paidAt = paymentStatus === "PAID" ? new Date() : null;
        const totalPrice = carts.reduce(
            (total, current) => total + current.quantity * current.price,
            0
        );
        if (!shippingAddressId) {
            // user is a new user
            const shippingAddress = await prisma.address.create({
                data: {
                    addressLine: addressLine,
                    country: country,
                    postalCode: postalCode,
                    city: city,
                    state: state,
                    shippingAddressId: user.id,
                },
            });
            console.log("add new shipping address");

            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    firstName: firstName,
                    lastName: lastname,
                    phoneNumber: phoneNumber,
                },
            });
            console.log("update user success");

            shippingAddressId = shippingAddress.id;
        }

        await prisma.order.create({
            data: {
                userId: user.id,
                paymentMethod: paymentMethod,
                paymentStatus: paymentStatus,
                quantity: totalProductsInCart,
                paidAt: paidAt,
                priceCurrency: "USD",
                shippingAmount: shippingMethod.value,
                totalPrice: totalPrice + shippingMethod.value,
                shippingCurrency: "USD",
                shippingMethod: shippingMethod.method,
                status: "CREATED",
                subToTal: totalPrice,
                shippingAddressId: shippingAddressId,
                orderProducts: {
                    createMany: {
                        data: carts.map((cart) => ({
                            productId: cart.productId,
                            price: cart.price,
                            quantity: cart.quantity,
                            subTotal: cart.price * cart.quantity,
                            priceCurrency: cart.priceCurrency,
                            variationId: cart.variationId,
                        })),
                    },
                },
            },
        });
        console.log("created order successfully");

        await prisma.cart.deleteMany({
            where: {
                userId: user.id,
            },
        });
        console.log("clear carts  successfully");
    } catch (error) {
        throw new Error("Error creating order" + error);
    }
}
