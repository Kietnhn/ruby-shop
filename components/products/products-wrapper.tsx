"use client";

import { Category } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";

import {
    AvailableFilters,
    FullProduct,
    GenderData,
    ProductBaseOptions,
} from "@/lib/definitions";
import FilterOptions from "./filter-options";
import { getProductsOfGenderAndCategory } from "@/lib/actions/product";
import {
    findMaxPrice,
    findMinPrice,
    getAllColors,
    getAllSizes,
    getUniqueBrandsFromProducts,
    getUniqueCollectionsFromProducts,
    getUniquePropertiesFromProducts,
    renderPrice,
} from "@/lib/utils";

import clsx from "clsx";
import ShopNavbar from "../navbar/shop-navbar";
import { useAppSelector } from "@/lib/store";
import {
    Card,
    CardBody,
    CardFooter,
    CircularProgress,
    Image,
    Link,
} from "@nextui-org/react";
import { filterAndSortProducts } from "@/lib/utils/product";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProductItem from "./product-item";

export default function ProductsWrapper({
    categories,
    initProducts,
    genderData,
    baseOptions,
}: {
    baseOptions: ProductBaseOptions;
    genderData: GenderData;
    categories: Category[];
    initProducts: FullProduct[];
}) {
    const { isShowFilter, filterOptions, sortOptions } = useAppSelector(
        (store) => store.product
    );

    const [products, setProducts] = useState<FullProduct[]>([]);
    const [interfaceProducts, setInterfaceProducts] = useState<FullProduct[]>(
        []
    );
    const [availableFilters, setAvailableFilters] =
        useState<AvailableFilters | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoadmore, setIsLoadmore] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView({
        threshold: 0, // Fire the callback as soon as even one pixel is visible
    });
    useEffect(() => {
        console.log({ filterOptions, sortOptions, baseOptions });
        setLoading(true);
        getProductsOfGenderAndCategory(
            baseOptions,
            filterOptions,
            sortOptions,
            0
        )
            .then((products) => {
                setProducts(products);
                setInterfaceProducts(products);
                setAvailableFilters({
                    brands: getUniqueBrandsFromProducts(products),
                    collections: getUniqueCollectionsFromProducts(products),
                    properties: getUniquePropertiesFromProducts(products),
                    minPrice: findMinPrice(products),
                    maxPrice: findMaxPrice(products),
                    colors: getAllColors(products),
                    sizes: getAllSizes(products),
                });
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [baseOptions]);
    useEffect(() => {
        if (inView && hasMore && !isLoadmore) {
            // When list is in view, has more images, and not already loading, fetch more images
            // fetchMoreImages();
            setIsLoadmore(true);
            getProductsOfGenderAndCategory(
                baseOptions,
                filterOptions,
                sortOptions,
                products.length
            )
                .then((products) => {
                    if (products.length === 0) {
                        setHasMore(false);
                    } else {
                        setProducts((prev) => [...prev, ...products]);
                        setInterfaceProducts((prev) => [...prev, ...products]);
                        setAvailableFilters({
                            brands: getUniqueBrandsFromProducts(products),
                            collections:
                                getUniqueCollectionsFromProducts(products),
                            properties:
                                getUniquePropertiesFromProducts(products),
                            minPrice: findMinPrice(products),
                            maxPrice: findMaxPrice(products),
                            colors: getAllColors(products),
                            sizes: getAllSizes(products),
                        });
                    }
                    setIsLoadmore(false);
                })
                .catch(() => {
                    setIsLoadmore(false);
                });
            console.log("is in view");
        }
    }, [inView, hasMore, isLoadmore]);

    useEffect(() => {
        console.log({ filterOptions, sortOptions });
        const newProducts = filterAndSortProducts({
            products,
            filterOptions,
            sortOptions,
        });
        setInterfaceProducts(newProducts);
    }, [filterOptions, sortOptions, products]);
    if (loading)
        return (
            <div className="h-screen w-screen relative">
                <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <CircularProgress aria-label="Loading..." size="lg" />
                </div>
            </div>
        );

    return (
        <div className="grid gap-4 grid-cols-12 py-4">
            <motion.div
                layout={true}
                className={clsx(
                    "h-screen sticky top-16 xl:col-span-2 col-span-3",
                    {
                        "!w-0 !h-0": !isShowFilter,
                    }
                )}
            >
                {availableFilters && (
                    <FilterOptions
                        categories={categories}
                        baseOptions={baseOptions}
                        availableFilters={availableFilters}
                    />
                )}
            </motion.div>
            <div
                className={clsx("xl:col-span-10 col-span-9", {
                    "!col-span-12": !isShowFilter,
                })}
            >
                {interfaceProducts.length > 0 ? (
                    <>
                        <div className="grid gap-4  xl:grid-cols-4  grid-cols-3">
                            {interfaceProducts.map((product, index) => {
                                if (index === interfaceProducts.length - 1) {
                                    return <div key={index} ref={ref}></div>;
                                }
                                return (
                                    <ProductItem
                                        product={product}
                                        key={product.id}
                                    />
                                );
                            })}
                        </div>
                        {isLoadmore && <li>Loading more products...</li>}
                        {!hasMore && (
                            <p className="text-center">
                                No product left in the store
                            </p>
                        )}
                    </>
                ) : (
                    <div>No products match</div>
                )}
            </div>
        </div>
    );
}
