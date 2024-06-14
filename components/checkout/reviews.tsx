"use client";
import { useAppSelector } from "@/lib/store";
import { Divider, Link } from "@nextui-org/react";
import React from "react";

export default function Reviews({
    isChangeAble = true,
}: {
    isChangeAble?: boolean;
}) {
    const { reviews } = useAppSelector((store) => store.cartCheckout);
    return (
        <div className="p-4 flex flex-col gap-2 border rounded-medium">
            {reviews.map((item, index) => (
                <React.Fragment>
                    <Item
                        href={item.href}
                        title={item.title}
                        value={item.value}
                        isChangeAble={isChangeAble}
                    />

                    {index !== reviews.length - 1 && <Divider />}
                </React.Fragment>
            ))}
        </div>
    );
}
function Item({
    href,
    title,
    value,
    isChangeAble,
}: {
    title: string;
    value: string;
    href: string;
    isChangeAble: boolean;
}) {
    return (
        <div className="flex justify-between items-start">
            <div className="flex-1 flex justify-start items-start gap-4">
                <div className="w-1/6">{title}</div>
                <div className="flex-1">{value}</div>
            </div>
            {isChangeAble && (
                <div className="w-1/6">
                    <Link href={href} className="hover:underline">
                        Change
                    </Link>
                </div>
            )}
        </div>
    );
}
