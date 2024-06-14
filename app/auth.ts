import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "../auth.config";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getUser } from "@/lib/actions/user";
// import EmailProvider from "next-auth/providers/nodemailer";
import EmailProvider from "next-auth/providers/email";
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        // EmailProvider({
        //     id: "email",
        //     name: "email",
        //     server: {
        //         host: process.env.EMAIL_SERVER_HOST,
        //         port: process.env.EMAIL_SERVER_PORT,
        //         auth: {
        //             user: process.env.EMAIL_SERVER_USER,
        //             pass: process.env.EMAIL_SERVER_PASSWORD,
        //         },
        //     },
        //     from: process.env.EMAIL_FROM,
        // }),
        Credentials({
            id: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text ",
                    placeholder: "Enter email",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);
                console.log(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    const user = await getUser(email);
                    console.log(user);

                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password as string
                    );

                    if (passwordsMatch) {
                        return user;
                    } else {
                        console.log("Password mismatch");
                    }
                }
                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
