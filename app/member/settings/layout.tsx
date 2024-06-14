import type { Metadata } from "next";
import { Inter } from "next/font/google";

import SettingsMenu from "@/components/navbar/setting-menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ruby",
    description: "Ruby store",
};

export default async function SettingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="mx-auto max-w-[1200px] ">
            <h2 className="text-2xl font-semibold">Settings</h2>
            <div className="w-full flex gap-4 mt-8">
                <div className="w-1/3 ">
                    <SettingsMenu />
                </div>
                <div className="flex-1 ">{children}</div>
                <div className="flex-1 "></div>
            </div>
        </div>
    );
}
