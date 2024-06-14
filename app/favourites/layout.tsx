import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import { auth } from "../auth";
import { Suspense } from "react";
import Footer from "@/components/footer";
import { getUserByEmail } from "@/lib/actions/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ruby",
    description: "Ruby store",
};

export default async function FavouriteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const authData = await auth();
    console.log(authData);

    const isAuthenticated = !!authData?.user;
    const user = await getUserByEmail(authData?.user?.email || "undefined");

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar isAuthenticated={isAuthenticated} user={user} />

            <div className="p-12 flex-1">{children}</div>
            <Suspense>
                <Footer />
            </Suspense>
        </div>
    );
}
