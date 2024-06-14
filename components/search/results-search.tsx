"use client";
import { AvailableFilters, FullProduct } from "@/lib/definitions";
import React, { useEffect, useRef, useState } from "react";
import ProductItem from "../products/product-item";
import {
    findMaxPrice,
    findMinPrice,
    getAllColors,
    getAllSizes,
    getUniqueBrandsFromProducts,
    getUniqueCollectionsFromProducts,
    getUniquePropertiesFromProducts,
} from "@/lib/utils";
import clsx from "clsx";
import { useAppSelector } from "@/lib/store";
import FilterOptions from "../products/filter-options";
import ShopNavbar from "../navbar/shop-navbar";
import { findProducts, searchProducts } from "@/lib/actions/product";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { filterAndSortProducts } from "@/lib/utils/product";
import { useInView } from "react-intersection-observer";

const ResultsSearch = ({ results }: { results: FullProduct[] }) => {
    const { isShowFilter, sortOptions, filterOptions } = useAppSelector(
        (store) => store.product
    );
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const [products, setProducts] = useState<FullProduct[]>(results);
    const [interfaceProducts, setInterfaceProducts] = useState<FullProduct[]>(
        []
    );
    const [availableFilters, setAvailableFilters] = useState<AvailableFilters>({
        brands: getUniqueBrandsFromProducts(results),
        collections: getUniqueCollectionsFromProducts(results),
        properties: getUniquePropertiesFromProducts(results),
        minPrice: findMinPrice(results),
        maxPrice: findMaxPrice(results),
        colors: getAllColors(results),
        sizes: getAllSizes(results),
    });
    const [isLoadmore, setIsLoadmore] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView({
        threshold: 0, // Fire the callback as soon as even one pixel is visible
    });
    // const resultsLength = products.length;
    // useEffect(() => {
    //     if (!query) return;
    //     console.log(sortOptions, filterOptions);
    //     searchProducts(query, filterOptions, sortOptions).then((products) =>
    //         setProducts(products)
    //     );
    // }, [sortOptions, filterOptions, query]);
    useEffect(() => {
        if (inView && hasMore && !isLoadmore) {
            // When list is in view, has more images, and not already loading, fetch more images
            // fetchMoreImages();
            setIsLoadmore(true);
            findProducts(query as string, products.length)
                .then((newProducts) => {
                    if (newProducts.length === 0) {
                        setHasMore(false);
                    } else {
                        const combinedProducts = [...products, ...newProducts];
                        setProducts((prev) => [...prev, ...products]);
                        setInterfaceProducts((prev) => [...prev, ...products]);
                        setAvailableFilters({
                            brands: getUniqueBrandsFromProducts(
                                combinedProducts
                            ),
                            collections:
                                getUniqueCollectionsFromProducts(
                                    combinedProducts
                                ),
                            properties:
                                getUniquePropertiesFromProducts(
                                    combinedProducts
                                ),
                            minPrice: findMinPrice(combinedProducts),
                            maxPrice: findMaxPrice(combinedProducts),
                            colors: getAllColors(combinedProducts),
                            sizes: getAllSizes(combinedProducts),
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
                        categories={[]}
                        baseOptions={null}
                        availableFilters={availableFilters}
                        mode="search"
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
};

export default ResultsSearch;
