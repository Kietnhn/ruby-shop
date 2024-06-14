"use server";

import { User } from "@prisma/client";
import { State, UserNoPassword } from "../definitions";
import {
    loginSchema,
    resetPasswordSchema,
    shippingAddressSchema,
    userSchema,
} from "../schema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/app/auth";
import { AuthError } from "next-auth";
import { generateResetPasswordToken } from "./reset-password";
import bcrypt from "bcrypt";
import { generateVerificationToken } from "./tokens";
import { sendResetPasswordEmail, sendVerificationEmail } from "../mail";

export async function authenticate(
    prevState: State | undefined,
    formData: FormData
) {
    const parsedCredentials = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });
    if (!parsedCredentials.success) {
        return {
            errors: parsedCredentials.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to log in.",
            success: false,
        };
    }
    const { email, password } = parsedCredentials.data;
    try {
        const user = await getUser(email);
        if (!user || !user.email || !user.password) {
            return {
                errors: {},
                message: "Email does not exist.",
                success: false,
            };
        }
        const passwordsMatch = await bcrypt.compare(
            password,
            user.password as string
        );
        if (!passwordsMatch) {
            return {
                errors: {},
                message: "Email or Password mismatch!",
                success: false,
            };
        }
        if (!user.emailVerified) {
            const verificationToken = await generateVerificationToken(
                user.email
            );
            await sendVerificationEmail(
                verificationToken.email,
                verificationToken.token
            );
            return {
                errors: {},
                message: "Confirm email sent!",
                success: true,
            };
        }

        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        message: "Invalid credentials.",
                        errors: {},
                        success: false,
                    };
                default:
                    return {
                        message: "Something went wrong.",
                        errors: {},
                        success: false,
                    };
            }
        }
        throw error;
    }
}
const RegisterUser = userSchema;

export async function register(prevState: FormData, formData: FormData) {
    const validatedFields = RegisterUser.safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to register User.",
        };
    }
    // Prepare data for insertion into the database
    const { firstName, lastName, email, password } = validatedFields.data;

    try {
        const userExisted = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (userExisted) {
            throw new Error("User with this email already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
                employee: {
                    create: {
                        salary: 500,
                        role: "EMPLOYEE",
                    },
                },
            },
        });
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: "Database Error: Failed to register User." + error,
        };
    }
    revalidatePath("/dashboard");
    redirect("/auth/login-credentials");
}

export async function resetPassword(
    prevState: State | undefined,
    formData: FormData
) {
    const parsedCredentials = resetPasswordSchema.safeParse({
        email: formData.get("email"),
    });
    if (!parsedCredentials.success) {
        return {
            errors: parsedCredentials.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to reset password.",
            success: false,
        };
    }
    const { email } = parsedCredentials.data;
    try {
        const user = await getUser(email);
        if (!user || !user.email || !user.password) {
            return {
                errors: {},
                message: "Email does not exist.",
                success: false,
            };
        }

        const resetPasswordToken = await generateResetPasswordToken(email);
        await sendResetPasswordEmail(
            resetPasswordToken.email,
            resetPasswordToken.token
        );
        return {
            errors: {},
            message: "Reset email sent!",
            success: true,
        };
    } catch (error) {
        return {
            errors: {},
            message: "Missing Fields. Failed to reset password.",
            success: false,
        };
    }
}
// export async function sendEmailForgetPassword(
//     form: string,
//     subject: string,
//     body: string
// ) {
//     const message = {
//         from: form,
//         to: process.env.GMAIL_EMAIL_ADDRESS,
//         subject: subject,
//         text: body,
//         // html: `<p>${req.body.message}</p>`,
//     };

//     let transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.GMAIL_EMAIL_ADDRESS,
//             pass: process.env.GMAIL_APP_PASSWORD,
//         },
//     });
// }
export async function logOut() {
    await signOut();
}

export async function editShippingAddress(
    shippingAddressId: string,
    state: State,
    formData: FormData
) {
    const user = await protectedAction();
    const validatedFields = shippingAddressSchema.safeParse({
        country: formData.get("country"),
        state: formData.get("state"),
        city: formData.get("city"),
        addressLine: formData.get("addressLine"),
        postalCode: formData.get("postalCode"),
    });
    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);

        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to edit shipping address.",
        };
    }
    try {
        const { addressLine, country, postalCode, city, state } =
            validatedFields.data;

        // this mean new shipping address
        if (!shippingAddressId) {
            await prisma.address.create({
                data: {
                    country,
                    state,
                    city,
                    addressLine,
                    postalCode,
                    shippingAddressId: user.id,
                },
            });
            console.log("New shipping address");
        } else {
            await prisma.address.update({
                where: {
                    shippingAddressId: user.id,
                },
                data: {
                    country,
                    state,
                    city,
                    addressLine,
                    postalCode,
                },
            });
            console.log("Edit shipping address");
        }
    } catch (error) {
        throw new Error("Error at edit shipping address" + error);
    }
    revalidatePath("/member/settings/shipping-address");
    redirect("/member/settings/shipping-address");
}
export async function getUser(email: string): Promise<User | null> {
    if (!email) {
        throw new Error("Missting user id for get user");
    }
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });
        return user;
    } catch (error) {
        throw new Error("Error getting user" + error);
    }
}
export async function getUserByEmail(email: string) {
    if (!email) {
        throw new Error("Missting user id for get user");
    }
    try {
        // get everything excepted password
        const user = await prisma.user.findUnique({
            where: { email: email },

            select: {
                address: true,
                billingAddress1: true,
                billingAddress2: true,
                shippingAddress: true,
                cart: true,
                createdAt: true,
                dateOfBirth: true,
                description: true,
                email: true,
                emailVerified: true,
                employee: true,
                favoriteProduct: true,
                favoriteProductIds: true,
                firstName: true,
                gender: true,
                id: true,
                image: true,
                kind: true,
                lastName: true,
                name: true,
                orders: true,
                phoneNumber: true,
                phoneVerified: true,
                score: true,
                updatedAt: true,
            },
        });
        return user as UserNoPassword;
    } catch (error) {
        throw new Error("Error getting user" + error);
    }
}
export async function protectedAction() {
    const authData = await auth();
    if (!authData || !authData.user) {
        // not authenticated
        redirect("/api/auth/sigin");
    }

    const {
        user: { email },
    } = authData;
    try {
        const user = await getUserByEmail(email as string);
        if (!user) {
            throw new Error("User not found !!!");
        }
        return user;
    } catch (error) {
        throw new Error("Interval server error" + error);
    }
}
