import z from "zod";

export const shipingInformationShema = z.object({
    phoneNumber: z.string(),
    country: z.string(),
    state: z.string().nullish(),
    city: z.string().nullish(),
    addressLine: z.string(),
    postalCode: z.string(),
    firstName: z.string(),
    lastName: z.string().nullish(),
    email: z.string().email(),
});
export const shippingAddressSchema = z.object({
    country: z.string(),
    state: z.string().nullish(),
    city: z.string().nullish(),
    addressLine: z.string().min(3),
    postalCode: z.string().min(1),
});

export const newPasswordSchema = z.object({
    password: z.string().min(6),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
export const resetPasswordSchema = z.object({
    email: z.string().email(),
});
export const userSchema = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.string().email({ message: "Please enter your email" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});
