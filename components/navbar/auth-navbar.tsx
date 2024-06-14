"use client";
import React from "react";
import { Navbar as NavbarUI, NavbarItem, Link } from "@nextui-org/react";

import { AUTH_MENU_NAV } from "@/lib/constants";
import { usePathname } from "next/navigation";

export default function AuthNavbar() {
    const pathname = usePathname();
    return (
        <NavbarUI
            maxWidth="full"
            isBordered
            classNames={{
                item: [
                    "flex",
                    "relative",
                    "h-full",
                    "items-center",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                    "data-[active=true]:after:bg-primary",
                    "data-[active=true]:text-primary",
                ],
                wrapper: "px-12",
            }}
        >
            <div className="absolute inset-0 left-12 right-12 sm:block hidden">
                <div className="mx-auto h-full max-w-[1255px] max-2xl:w-[calc(100%-690px)] w-[calc(100%-426px)] overflow-hidden">
                    <div className="h-full flex flex-wrap justify-center items-center">
                        {AUTH_MENU_NAV.map((item) => (
                            <NavbarItem
                                key={item.key}
                                isActive={item.href === pathname}
                                className="h-full group  flex items-center justify-center hover:border-b-[2px] hover:border-[black] dark:hover:border-[white]"
                            >
                                <Link
                                    // color="foreground"
                                    className="font-semibold h-full px-3 text-inherit"
                                    href={item.href}
                                >
                                    {item.label}
                                </Link>
                            </NavbarItem>
                        ))}
                    </div>
                </div>
            </div>
        </NavbarUI>
    );
}
