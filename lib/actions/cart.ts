"use server";
import prisma from "@/lib/prisma";
import { protectedAction } from "./user";
import { CartCheckout, CartData, CartVariationProduct } from "../definitions";
import { redirect } from "next/navigation";

export async function getCart() {
    const user = await protectedAction();

    try {
        const cart = await prisma.cart.findMany({
            where: {
                userId: user.id,
            },
            orderBy: [
                {
                    createdAt: "desc",
                },
            ],
            include: {
                variation: {
                    include: {
                        product: {
                            include: {
                                variations: true,
                                category: true,
                            },
                        },
                    },
                },
            },
        });
        return cart as CartVariationProduct[];
    } catch (error) {
        throw new Error("Error getting cart" + error);
    }
}
export async function getCartCheckout() {
    const user = await protectedAction();

    try {
        const cart = await prisma.cart.findMany({
            where: {
                userId: user.id,
            },
            orderBy: [
                {
                    createdAt: "desc",
                },
            ],
            include: {
                variation: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        return cart as CartCheckout[];
    } catch (error) {
        throw new Error("Error getting cart" + error);
    }
}

export async function addToCart(cartData: CartData) {
    const user = await protectedAction();

    const { color, product, size } = cartData;
    if (!color || !product || !size) {
        throw new Error("Missing fields, failed to add to cart");
    }
    const selectedVariation = product.variations.find(
        (variation) => variation.color === color && variation.size === size
    );
    if (!selectedVariation) {
        throw new Error("Product not found");
    }
    try {
        const productAlreadyExisted = await prisma.cart.findFirst({
            where: {
                userId: user.id,
                variationId: selectedVariation.id,
            },
        });
        if (productAlreadyExisted) {
            await prisma.cart.update({
                where: {
                    userId: user.id,
                    id: productAlreadyExisted.id,
                },
                data: {
                    quantity: productAlreadyExisted.quantity + 1,
                },
            });
            return;
        }

        await prisma.cart.create({
            data: {
                userId: user.id,
                price: product.price,
                priceCurrency: product.priceCurrency,
                quantity: 1,
                variationId: selectedVariation.id,
                productId: product.id,
            },
        });
    } catch (error) {
        throw new Error("Error adding to cart" + error);
    }
}
export async function getLengthCart() {
    const user = await protectedAction();
    try {
        const variationCounts = await prisma.cart.groupBy({
            by: ["userId"],
            _count: {
                variationId: true,
            },
            where: {
                userId: user.id,
            },
        });
        if (!variationCounts[0]) {
            return 0;
        }
        return variationCounts[0]._count.variationId;
    } catch (error) {
        throw new Error("Error getting length cart" + error);
    }
}
export async function updateCart({
    cartId,
    newCart,
}: {
    cartId: string;
    newCart: CartData;
}) {
    await protectedAction();
    if (!cartId) {
        throw new Error("Missing cart id at update cart");
    }
    const { color, product, size } = newCart;
    if (!color || !product || !size) {
        throw new Error("Missing fields, failed to add to cart");
    }
    const selectedVariation = product.variations.find(
        (variation) => variation.color === color && variation.size === size
    );
    if (!selectedVariation) {
        throw new Error("Product not found");
    }
    try {
        await prisma.cart.update({
            where: {
                id: cartId,
            },
            data: {
                variationId: selectedVariation.id,
            },
        });
    } catch (error) {
        throw new Error("Error updating cart" + error);
    }
    redirect("/cart");
}
export async function updateQuantityCart({
    cartId,
    quantity,
}: {
    cartId: string;
    quantity: number;
}) {
    await protectedAction();
    if (!cartId) {
        throw new Error("Missing cart id at update cart");
    }

    try {
        await prisma.cart.update({
            where: {
                id: cartId,
            },
            data: {
                quantity: quantity,
            },
        });
    } catch (error) {
        throw new Error("Error updating cart" + error);
    }
    redirect("/cart");
}
export async function deleteCart(cartId: string) {
    await protectedAction();
    if (!cartId) {
        throw new Error("Missing cart id at delete cart");
    }
    try {
        await prisma.cart.delete({
            where: {
                id: cartId,
            },
        });
    } catch (error) {
        throw new Error("Error removing product from cart " + error);
    }
    redirect("/cart");
}
