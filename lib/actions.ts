"use server";
import prisma from "@/lib/prisma";
import { Country, ICollection } from "./definitions";

export async function getCollections(): Promise<ICollection[]> {
    try {
        const collections = await prisma.collection.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                deleted: false,
                productIds: {
                    isEmpty: false,
                },
            },
            include: {
                products: true,
            },
        });
        return collections;
    } catch (error) {
        throw new Error("Erro at get Products" + error);
    }
}

// outside apis
export async function getCountries() {
    try {
        const countries: Country[] = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,flag,flags",
            { method: "get" }
        ).then((response) => response.json());
        return { countries, message: "Countries retrieved" };
    } catch (error) {
        return {
            countries: null,
            message: "Something wrong in get countries" + error,
        };
    }
}
