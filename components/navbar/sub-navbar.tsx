import React from "react";
import {
    Navbar as NavbarUI,
    NavbarContent,
    NavbarItem,
    Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { getRootCategories } from "@/lib/actions/category";
import SubNavLinks from "./sub-navlinks";

export default async function SubNavbar({
    title,
    isNew = false,
}: {
    title: string;
    isNew?: boolean;
}) {
    const rootCategories = await getRootCategories();

    return (
        <NavbarUI maxWidth="full" isBordered classNames={{ wrapper: "px-12" }}>
            <NavbarContent justify="start" className="flex-grow">
                <NavbarItem className="">
                    <Link
                        className="text-xl font-semibold capitalize"
                        href={`#`}
                    >
                        <small className="mr-2">
                            {isNew ? "New release" : ""}
                        </small>
                        {title.toLowerCase()}
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <div className="absolute inset-0 left-12 right-12 sm:block hidden">
                <div className="mx-auto h-full max-w-[1255px] max-2xl:w-[calc(100%-690px)] w-[calc(100%-426px)] overflow-hidden">
                    <SubNavLinks navLinks={rootCategories} />
                </div>
            </div>
        </NavbarUI>
    );
}
