import { getCartCheckout } from "@/lib/actions/cart";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Checkout",
};

export default async function CheckoutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="max-w-[1200px] mx-auto h-full overflow-hidden ">
            {children}
        </main>
    );
}
