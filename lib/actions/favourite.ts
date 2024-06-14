"use server";
import prisma from "@/lib/prisma";
import { ProductCategoryVariations } from "../definitions";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getUniqueCategories } from "../utils";
import { getTopProducts } from "./product";
import { protectedAction } from "./user";
// favourite products

export async function getOwnFavouriteProducts(): Promise<
    ProductCategoryVariations[]
> {
    const currentUser = await protectedAction();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: currentUser.email as string,
            },
            include: {
                favoriteProduct: {
                    include: {
                        variations: true,
                        category: true,
                    },
                },
            },
        });
        return user?.favoriteProduct || [];
    } catch (error) {
        throw new Error("Error getting user" + error);
    }
}
export async function getFavouriteProducts(
    email: string
): Promise<ProductCategoryVariations[]> {
    if (!email) {
        throw new Error("Missting user id for get user");
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                favoriteProduct: {
                    include: {
                        variations: true,
                        category: true,
                    },
                },
            },
        });
        return user?.favoriteProduct || [];
    } catch (error) {
        throw new Error("Error getting user" + error);
    }
}
export async function toggleFavouriteProduct({
    productId,
    isFavourited,
}: {
    productId: string;
    isFavourited: boolean;
}) {
    const authData = await auth();
    if (!authData || !authData.user) {
        // not authenticated
        redirect("/favourites");
    }

    const {
        user: { email },
    } = authData;
    if (!productId || !email) {
        throw new Error("Missing fields to favourite product");
    }
    try {
        if (isFavourited) {
            console.log("removing favourite");

            await removeFavoriteProduct(email, productId);
        } else {
            console.log("adding favourite");
            await addFavoriteProduct(email, productId);
        }
    } catch (error) {
        throw new Error("Error at toggle favourite product" + error);
    }
    // redirect(`/products/${productId}`);
}
export async function addFavoriteProduct(userEmail: string, productId: string) {
    const authData = await auth();
    if (!authData || !authData.user) {
        // not authenticated
        redirect("/favourites");
    }
    try {
        // Update the user's favorite products
        const userUpdated = await prisma.user.update({
            where: {
                email: userEmail,
            },
            data: {
                favoriteProductIds: {
                    // Add the new product ID to the existing array of favorite product IDs
                    push: productId,
                },
            },

            select: {
                id: true,
            },
        });

        // Update the product's list of users who have favorited it
        await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                favoriteOfIds: {
                    // Add the user's ID to the existing array of users who have favorited the product
                    push: userUpdated.id,
                },
            },
        });

        console.log(
            `User with email ${userEmail} favorited product with ID ${productId}`
        );
    } catch (error) {
        throw new Error("Error adding favorite product: " + error);
    }
}
export async function removeFavoriteProduct(
    userEmail: string,
    productId: string
) {
    const authData = await auth();
    if (!authData || !authData.user) {
        // not authenticated
        redirect("/favourites");
    }
    try {
        // Update the user's favorite products
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
            select: {
                id: true,
                favoriteProductIds: true,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const updatedFavoriteProductIds = user.favoriteProductIds.filter(
            (id) => id !== productId
        );

        await prisma.user.update({
            where: {
                email: userEmail,
            },
            data: {
                favoriteProductIds: updatedFavoriteProductIds,
            },
        });

        // Update the product's list of users who have favorited it
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
            select: {
                favoriteOfIds: true,
            },
        });

        if (!product) {
            throw new Error("Product not found");
        }

        const updatedFavoriteOfIds = product.favoriteOfIds.filter(
            (id) => id !== user.id
        );

        await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                favoriteOfIds: updatedFavoriteOfIds,
            },
        });

        console.log(
            `User with email ${userEmail} removed product with ID ${productId} from favorites`
        );
    } catch (error) {
        throw new Error("Error removing favorite product: " + error);
    }
}
