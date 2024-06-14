import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import { auth } from "../auth";
import { getUser, getUserByEmail } from "@/lib/actions";
import { Suspense } from "react";
import Footer from "@/components/footer";
import AuthNavbar from "@/components/navbar/auth-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ruby",
    description: "Ruby store",
};

export default async function OrderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const authData = await auth();

    const isAuthenticated = !!authData?.user;
    const user = await getUserByEmail(authData?.user?.email || "undefined");
    return (
        <div className="min-h-screen w-full ">
            <Navbar isAuthenticated={isAuthenticated} user={user} />
            <AuthNavbar />
            <div className="flex-1 p-12">{children}</div>
            <Suspense fallback={<p>Loading...</p>}>
                <Footer />
            </Suspense>
        </div>
    );
}
