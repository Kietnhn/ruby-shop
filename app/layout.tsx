import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { UIProviders } from "./providers";

export const metadata: Metadata = {
    title: "Ruby",
    description: "Ruby store",
};
const ReduxProvider = dynamic(() => import("@/app/store-provider"), {
    ssr: false,
});
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} overflow-x-hidden`}
                suppressHydrationWarning={true}
            >
                <UIProviders>
                    <ReduxProvider>
                        {children}
                        <ToastContainer />
                    </ReduxProvider>
                </UIProviders>
            </body>
        </html>
    );
}
