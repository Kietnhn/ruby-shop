"use server";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { CategoryParentChildren, ICategory } from "../definitions";
export async function getCategories(): Promise<ICategory[]> {
    try {
        const categories = await prisma.category.findMany({
            include: {
                parent: true,
            },
            where: {
                deleted: false,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return categories;
    } catch (error) {
        throw new Error("Couldn't find categories" + error);
    }
}
export async function getMenCategory() {
    try {
        const menCategory = await prisma.category.findMany({
            where: {
                products: {
                    every: {
                        gender: "MEN",
                        isAvailable: true,
                        deleted: false,
                    },
                },
            },
        });
        return menCategory;
    } catch (error) {
        throw new Error("Erro at getMenCategory " + error);
    }
}
export async function getRootCategories() {
    try {
        const rootCategories = await prisma.category.findMany({
            where: {
                parentId: null,
            },
        });
        return rootCategories;
    } catch (error) {
        throw new Error("Error getting root categories" + error);
    }
}
export async function getChildCategories(parentId: string) {
    if (!parentId) {
        throw new Error("Missing id to get child");
    }
    try {
        const childCategories = await prisma.category.findMany({
            where: {
                parentId: parentId,
            },
        });

        if (childCategories.length === 0) {
            const selfCategory = await prisma.category.findUnique({
                where: {
                    id: parentId,
                },
                include: {
                    parent: true,
                },
            });

            if (!selfCategory || !selfCategory.parent) {
                return [];
            }
            const parentCategories = await prisma.category.findMany({
                where: {
                    parentId: selfCategory.parent.id,
                },
            });
            return parentCategories as Category[];
        }
        return childCategories as Category[];
    } catch (error) {
        throw new Error("Error at get child categories" + error);
    }
}
export async function getAllParentsCategories(
    categoryId: string,
    parents: Category[] = []
) {
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    });

    // If category is not found, return the array of parents
    if (!category) {
        return parents;
    }

    // Add current category to the parents array
    parents.unshift(category);

    // If category has a parent, recursively call the function to get the parent of the current category
    if (category.parentId) {
        return getAllParentsCategories(category.parentId, parents);
    }

    // If category has no parent, return the array of parents
    return parents;
}
export async function getAllCategories(categoryId: string) {
    try {
        const categories = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
            include: {
                childCategories: {
                    include: {
                        products: {
                            include: {
                                category: {
                                    include: {
                                        childCategories: true,
                                    },
                                },
                            },
                        },
                    },
                },
                parent: true,
            },
        });
        return categories as CategoryParentChildren;
    } catch (error) {
        throw new Error("Error getting products" + error);
    }
}
