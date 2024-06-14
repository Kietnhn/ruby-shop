"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FooterPageMenu } from "@/lib/definitions";

const FooterMenuItem = ({ item }: { item: FooterPageMenu }) => {
    const pathname = usePathname();
    const [active, setActive] = useState(pathname === item.url);

    useEffect(() => {
        setActive(pathname === item.url);
    }, [pathname, item.url]);

    return (
        <li>
            <Link
                href={item.url}
                className={clsx(
                    "block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm",
                    {
                        "text-black dark:text-neutral-300": active,
                    }
                )}
            >
                {item.title}
            </Link>
        </li>
    );
};

export default function FooterMenu({ menu }: { menu: FooterPageMenu[] }) {
    if (!menu.length) return null;

    return (
        <nav>
            <ul>
                {menu.map((item) => {
                    return <FooterMenuItem key={item.title} item={item} />;
                })}
            </ul>
        </nav>
    );
}
