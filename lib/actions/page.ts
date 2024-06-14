"use server";
import prisma from "@/lib/prisma";
export async function getPageByHandle(handle: string) {
    if (!handle) {
        throw new Error("Missing handle to get page");
    }
    try {
        const page = await prisma.page.findUnique({
            where: {
                handle: handle,
            },
        });
        return page;
    } catch (error) {
        throw new Error("Erro at get PageByHandle" + error);
    }
}

export async function getPageHandles() {
    try {
        const pages = await prisma.page.findMany({
            select: {
                title: true,
                handle: true,
                url: true,
            },
            where: {
                visibility: "PUBLIC",
                deleted: false,
            },
        });
        return pages;
    } catch (error) {
        throw new Error("Erro at get PageHandles" + error);
    }
}
