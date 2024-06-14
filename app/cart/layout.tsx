import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
    title: "Ruby",
    description: "Ruby store",
};

export default async function CartLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1">{children}</div>
        </div>
    );
}
