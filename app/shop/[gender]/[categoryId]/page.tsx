import ShopNavbar from "@/components/navbar/shop-navbar";
import NotFound from "@/components/not-found";
import ProductsWrapper from "@/components/products/products-wrapper";

import {
    getAllParentsCategories,
    getChildCategories,
} from "@/lib/actions/category";
import { genderRoutes } from "@/lib/constants";
import { ProductBaseOptions } from "@/lib/definitions";

import React from "react";

export default async function ProductCategoryPage({
    params,
}: {
    params: { gender: string; categoryId: string };
}) {
    const genderData = genderRoutes[params.gender];

    if (!genderData) {
        return <NotFound href="/" title={"Shop"} />;
    }

    const baseOptions: ProductBaseOptions = {
        genders: genderData.gender,
        categoryId: params.categoryId,
    };
    // const sortOptions: ProductSortOptions = {
    //     direction: "desc",
    //     type: "name",
    // };
    // const products = await getProductsOfGenderAndCategory(
    //     baseOptions,
    //     {},
    //     sortOptions
    // );

    // if (!products || products.length === 0) {
    //     <p>No products</p>;
    // }
    const parents = await getAllParentsCategories(params.categoryId);
    const childCategories = await getChildCategories(params.categoryId);

    return (
        <main className="relative flex-1 px-12">
            <ShopNavbar breadcrumbs={parents} genderData={genderData} />

            <ProductsWrapper
                genderData={genderData}
                initProducts={[]}
                categories={childCategories}
                baseOptions={baseOptions}
            />
        </main>
    );
}
