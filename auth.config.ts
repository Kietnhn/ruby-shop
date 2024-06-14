import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
export const authConfig = {
    pages: {
        signIn: "/auth/login-credentials",
        error: "auth/error",
    },

    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            console.log({ isLoggedIn });

            const protectedRoutes = ["/favourites", "/cart"]; // Add more protected routes as needed

            const currentRoute = nextUrl.pathname;

            // Check if the current route is a protected route
            const isProtectedRoute = protectedRoutes.some((route) =>
                currentRoute.startsWith(route)
            );
            console.log({ isProtectedRoute, currentRoute, nextUrl });

            // Redirect unauthenticated users to the login page for protected routes
            if (isProtectedRoute && !isLoggedIn) {
                return false;
            }

            // Redirect authenticated users from the login page to their respective pages
            if (!isProtectedRoute && isLoggedIn) {
                const redirectRoute = protectedRoutes.find((route) =>
                    currentRoute.startsWith(route)
                );
                console.log("redirectRoute", redirectRoute);

                if (redirectRoute) {
                    return Response.redirect(new URL(redirectRoute, nextUrl));
                }
            }

            return true;
        },

        async session({ token, session }) {
            console.log("Session Token", token);

            return session;
        },
        async jwt({ token }) {
            console.log("JWT Token", token);

            return token;
        },
    },

    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30,
    },
    adapter: PrismaAdapter(prisma),
    // events: {
    //     async signIn(message) {
    //         console.log("Signed in!", { message });
    //     },
    //     async signOut(message) {
    //         console.log("Signed out!", { message });
    //     },
    //     async createUser(message) {
    //         console.log("User created!", { message });
    //     },
    // },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
