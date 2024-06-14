"use client";

import { INavbar } from "@/lib/definitions";
import {
    Cog6ToothIcon,
    CreditCardIcon,
    InboxArrowDownIcon,
    ShareIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { Card, CardBody, Link } from "@nextui-org/react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const settingsMenu: INavbar[] = [
    {
        href: "/member/settings",
        icon: Cog6ToothIcon,
        isActive: true,
        key: "general",
        label: "General",
    },
    {
        href: "/member/settings/account",
        icon: UserIcon,
        isActive: true,
        key: "account_details",
        label: "Account Details",
    },
    {
        href: "/member/settings/payment-methods",
        icon: CreditCardIcon,
        isActive: true,
        key: "payment_methods",
        label: "Payment Methods",
    },
    {
        href: "/member/settings/shipping-address",
        icon: InboxArrowDownIcon,
        isActive: true,
        key: "shipping_address",
        label: "Shipping Address",
    },
    {
        href: "/member/settings/profile-visibility",
        icon: ShareIcon,
        isActive: true,
        key: "profile_visibility",
        label: "Profile Visibility",
    },
];
export default function SettingsMenu() {
    const pathname = usePathname();
    return (
        <div className="flex flex-col gap-2">
            {settingsMenu.map((item) => {
                const Icon = item.icon;
                return (
                    <Link
                        key={item.key}
                        as={Link}
                        href={item.href}
                        className={clsx(
                            "flex gap-2 w-full px-3 py-2 text-foreground",
                            {
                                "!text-primary": pathname === item.href,
                            }
                        )}
                    >
                        <Icon className="w-5 h-5 text-inherit" />
                        <p className="capitalize text-inherit">{item.label}</p>
                    </Link>
                );
            })}
        </div>
    );
}
