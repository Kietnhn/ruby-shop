"use server";
import prisma from "@/lib/prisma";
import { v4 as uuid } from "uuid";
import { getUserByEmail } from "../actions/user";

export async function newVerification(token: string) {
    try {
        const existedToken = await getVerificationTokenByToken(token);
        console.log(existedToken);

        if (!existedToken) {
            return {
                error: "Token does not exist",
            };
        }
        const isExpired = new Date(existedToken.expires) < new Date();
        if (isExpired) {
            return {
                error: "Token has expired",
            };
        }
        const existedUser = await getUserByEmail(existedToken.email);
        if (!existedUser) {
            return {
                error: "Email does not exist",
            };
        }
        await prisma.user.update({
            where: {
                id: existedUser.id,
            },
            data: {
                emailVerified: new Date(),
                email: existedUser.email,
            },
        });
        await prisma.verificationToken.delete({
            where: {
                id: existedToken.id,
            },
        });
        return {
            success: "Email verified",
        };
    } catch (error) {
        return {
            error: "Internal server error",
        };
    }
}
export async function generateVerificationToken(email: string) {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existedToken = await getVerificationTokenByEmail(email);
    if (existedToken) {
        await prisma.verificationToken.delete({
            where: { id: existedToken.id },
        });
    }
    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });
    return verificationToken;
}

export async function getVerificationTokenByEmail(email: string) {
    try {
        const token = await prisma.verificationToken.findFirst({
            where: { email },
        });
        return token;
    } catch (error) {
        return null;
    }
}
export async function getVerificationTokenByToken(token: string) {
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where: {
                token: token,
            },
        });
        return verificationToken;
    } catch (error) {
        return null;
    }
}
