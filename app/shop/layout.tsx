import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import { auth } from "../auth";
import { getUserByEmail } from "@/lib/actions/user";
import { Suspense } from "react";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ruby",
    description: "Ruby store",
};

export default async function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const authData = await auth();
    console.log(authData);

    const isAuthenticated = !!authData?.user;
    const user = await getUserByEmail(authData?.user?.email || "undefined");
    return (
        <div className="min-h-screen  flex flex-col">
            <Navbar isAuthenticated={isAuthenticated} user={user} />
            {children}
            <Suspense>
                <Footer />
            </Suspense>
        </div>
    );
}
