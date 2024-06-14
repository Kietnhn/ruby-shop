import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import { auth } from "../auth";
import { Suspense } from "react";
import Footer from "@/components/footer";
import AuthNavbar from "@/components/navbar/auth-navbar";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/lib/actions/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ruby",
    description: "Ruby store",
};

export default async function MemberLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const authData = await auth();
    console.log(authData);

    const isAuthenticated = !!authData?.user;
    if (!isAuthenticated) {
        return redirect("/shop");
    }
    const user = await getUserByEmail(authData?.user?.email || "undefined");
    return (
        <div className="min-h-screen w-full">
            <Navbar isAuthenticated={isAuthenticated} user={user} />

            <AuthNavbar />
            <div className="flex-1 p-12 ">{children}</div>
            <Suspense fallback={<p>Loading...</p>}>
                <Footer />
            </Suspense>
        </div>
    );
}
