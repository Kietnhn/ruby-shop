"use client";
import { MENU_SORT_BY } from "@/lib/constants";
import { GenderData, SortByData } from "@/lib/definitions";
import {
    AdjustmentsHorizontalIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    Selection,
} from "@nextui-org/react";
import { Category } from "@prisma/client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { BreadcrumbCategories } from "../products/breadcrumb-categories";
import { generateGendersOwn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setIsShowFilter, setSortOptions } from "@/features/product-slice";
export default function ShopNavbar({
    breadcrumbs,
    genderData,
    title,
    mode = "shop",
}: {
    breadcrumbs: Category[];
    genderData: GenderData | null;
    mode?: "shop" | "search";
    title?: React.ReactNode;
}) {
    const { isShowFilter } = useAppSelector((store) => store.product);
    const dispatch = useAppDispatch();
    const [selectedKeySortBy, setSelectedKeySortBy] =
        useState<string>("name-asc");
    const navRef = useRef<HTMLElement | null>(null);
    const breadcrumbRef = useRef<HTMLDivElement | null>(null);
    const currentCategoryRef = useRef<HTMLHeadingElement | null>(null);
    const handleSelectSort = (keys: Selection) => {
        const key = Array.from(keys)[0];
        if (!key) return;
        const sortData = MENU_SORT_BY.find(
            (item) => item.key === key
        ) as SortByData;
        dispatch(
            setSortOptions({
                type: sortData.value,
                direction: sortData.direction,
            })
        );
        setSelectedKeySortBy(key as string);
    };
    useEffect(() => {
        const handleScroll = () => {
            if (
                !navRef.current ||
                !breadcrumbRef.current ||
                !currentCategoryRef.current
            )
                return;
            const top = navRef.current.getBoundingClientRect().top;

            if (top <= 44) {
                breadcrumbRef.current.style.display = "none";
                currentCategoryRef.current.classList.replace(
                    "text-2xl",
                    "text-xl"
                );
            } else {
                breadcrumbRef.current.style.display = "block";
                currentCategoryRef.current.classList.replace(
                    "text-xl",
                    "text-2xl"
                );
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <Navbar maxWidth="full" ref={navRef} classNames={{ wrapper: "p-0" }}>
            <div className="w-full flex justify-between items-center ">
                {mode === "shop" ? (
                    <div className="">
                        <div ref={breadcrumbRef} className="duration-200">
                            {breadcrumbs.length > 1 && (
                                <BreadcrumbCategories
                                    categories={breadcrumbs}
                                />
                            )}
                        </div>
                        <h2
                            className="text-2xl font-semibold capitalize duration-200"
                            ref={currentCategoryRef}
                        >
                            {genderData &&
                                generateGendersOwn(genderData.gender)}{" "}
                            {breadcrumbs[breadcrumbs.length - 1].name}
                        </h2>
                    </div>
                ) : (
                    <div className="">
                        <div ref={breadcrumbRef} className="duration-200"></div>
                        <h2
                            className="text-2xl font-semibold capitalize duration-200"
                            ref={currentCategoryRef}
                        >
                            {title}
                        </h2>
                    </div>
                )}
                <div className="flex gap-2">
                    <Button
                        className="capitalize"
                        variant="light"
                        radius="sm"
                        onClick={() => dispatch(setIsShowFilter(!isShowFilter))}
                    >
                        {isShowFilter ? "Hide" : "Show"} filter
                        <AdjustmentsHorizontalIcon className="w-5 h-5" />
                    </Button>

                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                className="capitalize"
                                variant="light"
                                radius="sm"
                            >
                                Sort by <ChevronDownIcon className="w-5 h-5" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="dropdown-sortby"
                            items={MENU_SORT_BY}
                            onSelectionChange={(key) => handleSelectSort(key)}
                            selectedKeys={[selectedKeySortBy]}
                            selectionMode="single"
                        >
                            {(item) => (
                                <DropdownItem key={item.key}>
                                    {item.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </Navbar>
    );
}
