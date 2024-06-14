"use client";

import { CartData, UserNoPassword } from "@/lib/definitions";
import {
    PowerIcon,
    ShoppingCartIcon,
    TrashIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import {
    Avatar,
    Badge,
    Button,
    ButtonProps,
    Link,
    Tooltip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    DropdownSection,
} from "@nextui-org/react";

import { Key, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AUTH_MENU_NAV } from "@/lib/constants";
import { addToCart, getLengthCart } from "@/lib/actions/cart";
import { toggleFavouriteProduct } from "@/lib/actions/favourite";
import { logOut } from "@/lib/actions/user";
export function AddToCartButton({ product, color, size }: CartData) {
    const [isError, setIsError] = useState<boolean>(false);
    const addToCartWithCartData = addToCart.bind(null, {
        color: color,
        product: product,
        size: size,
    });
    const handleSubmit = async () => {
        if (!size) {
            setIsError(true);
            return;
        }

        await toast.promise(
            addToCartWithCartData,
            {
                pending: `Adding ${product.name} to cart...`,
                success: {
                    render: (
                        <div className="flex flex-col">
                            <p>Added successfully</p>
                            <Link
                                href="/cart"
                                className="text-foreground hover:underline"
                            >
                                View cart
                            </Link>
                        </div>
                    ),
                },
                error: "Server rejected ",
            },
            {}
        );
    };
    return (
        <div>
            {isError && (
                <p className="text-red-500 font-semibold text-medium mb-2 ">
                    Please select a size.
                </p>
            )}
            <Button
                className="w-full font-semibold"
                color="primary"
                onClick={handleSubmit}
            >
                Add to cart
                <ShoppingCartIcon className="w-5 h-5" />
            </Button>
        </div>
    );
}
export function ButtonCart() {
    const [cartLength, setCartlength] = useState<number>(0);
    useEffect(() => {
        getLengthCart().then((length) => {
            setCartlength(length);
        });
    }, []);
    return (
        <Badge content={cartLength}>
            <Tooltip content="Cart">
                <Link href="/cart">
                    <Button isIconOnly variant="light">
                        <ShoppingCartIcon className="w-5 h-5" />
                    </Button>
                </Link>
            </Tooltip>
        </Badge>
    );
}

export function DeleteButton({
    action,
    isShowTitles = false,
    className,
}: {
    action: () => Promise<void>;
    isShowTitles?: boolean;
    className?: string;
}) {
    const { pending } = useFormStatus();

    return (
        <form action={action}>
            {isShowTitles ? (
                <Button
                    color="danger"
                    type="submit"
                    className={className}
                    isDisabled={pending}
                    variant="light"
                    // isIconOnly={!isShowTitles}
                >
                    <TrashIcon className="w-5 h-5" />
                    Delete
                    {/* {isShowTitles ? "Delete" : ""} */}
                </Button>
            ) : (
                <Tooltip content="Delete" showArrow>
                    <Button
                        color="danger"
                        type="submit"
                        className={className}
                        isDisabled={pending}
                        variant="light"
                        isIconOnly
                    >
                        <TrashIcon className="w-5 h-5" />
                        {/* {isShowTitles ? "Delete" : ""} */}
                    </Button>
                </Tooltip>
            )}
        </form>
    );
}
interface FavouriteProductButtonProps extends ButtonProps {
    productId: string;
    isFavourited: boolean;
    isShowTitles?: boolean;
}
export function FavouriteProductButton(props: FavouriteProductButtonProps) {
    const { isFavourited, productId, isShowTitles = false, ...rest } = props;
    const router = useRouter();
    const toggleFavouriteProductWithProductId = toggleFavouriteProduct.bind(
        null,
        { productId, isFavourited }
    );
    const submit = async () => {
        await toast.promise(toggleFavouriteProductWithProductId, {
            pending: `Loading...`,
            success: `${isFavourited ? "Removed" : "Added"} favourite product`,
            error: "Server rejected ",
        });
        router.refresh();
    };

    return (
        <Button
            variant="bordered"
            type="submit"
            isIconOnly={!isShowTitles}
            onClick={submit}
            {...rest}
        >
            {isShowTitles ? "Favourite" : ""}
            {isFavourited ? (
                <HeartSolidIcon className="w-5 h-5" />
            ) : (
                <HeartIcon className="w-5 h-5" />
            )}
        </Button>
    );
}
export function ButtonAvatar({ user }: { user: UserNoPassword }) {
    const handleAction = async (key: Key) => {
        if (key === "logout") {
            await logOut();
        }
    };
    return (
        <Dropdown placement="bottom-end" showArrow>
            <DropdownTrigger>
                <Avatar
                    as="button"
                    fallback={<UserIcon className="w-5 h-5" />}
                    className="transition-transform"
                    name={user.email as string}
                    src={user.image as string}
                />
            </DropdownTrigger>

            <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                onAction={handleAction}
            >
                <DropdownSection showDivider>
                    {AUTH_MENU_NAV.map((item) => {
                        const Icon = item.icon;
                        return (
                            <DropdownItem
                                key={item.key}
                                startContent={<Icon className="w-5 h-5" />}
                                href={item.href}
                                isReadOnly={!item.isActive}
                            >
                                {item.label}
                            </DropdownItem>
                        );
                    })}
                </DropdownSection>
                <DropdownSection>
                    <DropdownItem
                        key="logout"
                        color="danger"
                        startContent={<PowerIcon className="w-5 h-5" />}
                    >
                        Log Out
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}
