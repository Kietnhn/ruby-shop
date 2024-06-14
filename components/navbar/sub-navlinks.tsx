"use client";
import React from "react";
import {
    Navbar as NavbarUI,
    NavbarContent,
    NavbarItem,
    Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { Category } from "@prisma/client";

export default function SubNavLinks({ navLinks }: { navLinks: Category[] }) {
    const pathName = usePathname();
    return (
        <div className="h-full flex flex-wrap justify-center items-center">
            {navLinks.length > 0 &&
                navLinks.map((navLink) => (
                    <NavbarItem
                        className="h-full group flex items-center justify-center hover:border-b-[2px] hover:border-[black] dark:hover:border-[white]"
                        key={navLink.id}
                    >
                        <Link
                            color="foreground"
                            className="font-semibold h-full px-3"
                            href={`${pathName}/${navLink.id}`}
                        >
                            {navLink.name}
                        </Link>
                    </NavbarItem>
                ))}
        </div>
    );
}
