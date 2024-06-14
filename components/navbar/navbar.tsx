"use client";
import React, { Suspense } from "react";
import {
    Navbar as NavbarUI,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Input,
    Tooltip,
    Badge,
} from "@nextui-org/react";
import Logo from "../logo";
import {
    HeartIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { MEN_CODE, NEW_ALL_GENDER_CODE, WOMEN_CODE } from "@/lib/constants";
import { ButtonAvatar, ButtonCart } from "../buttons";
import { UserNoPassword } from "@/lib/definitions";
import InputSearch from "../input-search";
import { User } from "@prisma/client";
const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
];
export default function Navbar({
    isAuthenticated,
    user,
}: {
    isAuthenticated: boolean;
    user: UserNoPassword | null;
}) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <>
            <NavbarUI
                maxWidth="full"
                shouldHideOnScroll={true}
                isBordered
                classNames={{ wrapper: "px-12" }}
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
            >
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    />
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="start">
                    <NavbarBrand>
                        <Link href="/" className="text-black  dark:text-white">
                            <div>
                                <Logo />
                            </div>
                            <p className="font-bold text-inherit ml-2">Ruby</p>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent
                    className="hidden sm:flex gap-4 z-[51]"
                    justify="center"
                >
                    <NavbarBrand>
                        <Link href="/" className="text-black dark:text-white">
                            <div>
                                <Logo />
                            </div>
                            <p className="font-bold text-inherit ml-2">Ruby</p>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent
                    justify="center"
                    className="flex-grow"
                ></NavbarContent>

                <div className="absolute inset-0 left-12 right-12 sm:block hidden">
                    <div className="mx-auto h-full max-w-[1255px] max-2xl:w-[calc(100%-690px)] w-[calc(100%-426px)] overflow-hidden">
                        <div className="h-full flex flex-wrap justify-center items-center">
                            <NavbarItem className="h-full group flex items-center justify-center hover:border-b-[2px] hover:border-[black] dark:hover:border-[white]">
                                <Link
                                    color="foreground"
                                    className="font-semibold h-full px-3"
                                    href={`/shop/${NEW_ALL_GENDER_CODE}`}
                                >
                                    New
                                </Link>
                            </NavbarItem>
                            <NavbarItem className="h-full group flex items-center justify-center hover:border-b-[2px] hover:border-[black] dark:hover:border-[white]">
                                <Link
                                    color="foreground"
                                    className="font-semibold h-full px-3"
                                    href={`/shop/${MEN_CODE}`}
                                >
                                    Men
                                </Link>
                            </NavbarItem>
                            <NavbarItem className="h-full group flex items-center justify-center hover:border-b-[2px] hover:border-[black] dark:hover:border-[white]">
                                <Link
                                    color="foreground"
                                    className="font-semibold h-full px-3"
                                    href={`/shop/${WOMEN_CODE}`}
                                >
                                    Women
                                </Link>
                            </NavbarItem>
                            <NavbarItem className="h-full group flex items-center justify-center hover:border-b-[2px] hover:border-[black] dark:hover:border-[white] ">
                                <Link
                                    color="foreground"
                                    className="font-semibold h-full px-3"
                                    href="/sale"
                                    isDisabled
                                >
                                    Sale
                                </Link>
                            </NavbarItem>
                            <NavbarItem className="h-full group flex items-center justify-center hover:border-b-[2px] hover:border-[black] dark:hover:border-[white] ">
                                <Link
                                    color="foreground"
                                    className="font-semibold h-full px-3"
                                    href="/customise"
                                    isDisabled
                                >
                                    Customise
                                </Link>
                            </NavbarItem>
                        </div>
                    </div>
                </div>

                <NavbarContent className="items-center pr-2" justify="end">
                    <InputSearch />

                    {!isAuthenticated && (
                        <Tooltip content="Favourites">
                            <Link href="/favourites">
                                <Button isIconOnly variant="light">
                                    <HeartIcon className="w-5 h-5" />
                                </Button>
                            </Link>
                        </Tooltip>
                    )}

                    {isAuthenticated ? (
                        <ButtonCart />
                    ) : (
                        <Tooltip content="Cart">
                            <Link href="/cart">
                                <Button isIconOnly variant="light">
                                    <ShoppingCartIcon className="w-5 h-5" />
                                </Button>
                            </Link>
                        </Tooltip>
                    )}
                    {!!user && <ButtonAvatar user={user} />}
                </NavbarContent>

                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className="w-full"
                                color={
                                    index === 2
                                        ? "warning"
                                        : index === menuItems.length - 1
                                        ? "danger"
                                        : "foreground"
                                }
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </NavbarUI>
        </>
    );
}
