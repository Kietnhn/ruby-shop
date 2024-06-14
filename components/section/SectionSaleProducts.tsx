import React from "react";
import { getSaleProducts } from "@/lib/actions/product";

import SectionCarouselProducts from "./section-carousel-products";
import { GenderData } from "@/lib/definitions";
export default async function SectionSaleProducts({
    genderData,
}: {
    genderData?: GenderData;
}) {
    const saleProducts = await getSaleProducts(genderData);

    if (!saleProducts || saleProducts.length === 0) return <></>;

    return (
        <SectionCarouselProducts
            title="Products on sale"
            products={saleProducts}
        />
    );
}
